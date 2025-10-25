import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function PRLMonitoring() {
  const [reports, setReports] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reportsRes, ratingsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/reports'),
          axios.get('http://localhost:5000/api/ratings')
        ]);
        setReports(reportsRes.data);
        setRatings(ratingsRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch monitoring data:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate reports statistics
  const reportsByLecturer = reports.reduce((acc, report) => {
    acc[report.lecturer_name] = (acc[report.lecturer_name] || 0) + 1;
    return acc;
  }, {});

  const attendanceData = reports.map(report => ({
    date: report.date_of_lecture,
    attendance: report.actual_students / report.total_students * 100
  }));

  // Calculate ratings statistics
  const ratingsByLecturer = ratings.reduce((acc, rating) => {
    if (!acc[rating.lecturer_name]) {
      acc[rating.lecturer_name] = { total: 0, count: 0 };
    }
    acc[rating.lecturer_name].total += rating.score;
    acc[rating.lecturer_name].count += 1;
    return acc;
  }, {});

  const lecturerNames = Object.keys(ratingsByLecturer);
  const averageRatings = lecturerNames.map(name =>
    (ratingsByLecturer[name].total / ratingsByLecturer[name].count).toFixed(1)
  );

  // Rating distribution
  const ratingDistribution = [1, 2, 3, 4, 5].map(score =>
    ratings.filter(r => r.score === score).length
  );

  // Reports by course
  const reportsByCourse = reports.reduce((acc, report) => {
    acc[report.course_name] = (acc[report.course_name] || 0) + 1;
    return acc;
  }, {});

  // Average attendance by lecturer
  const attendanceByLecturer = reports.reduce((acc, report) => {
    if (!acc[report.lecturer_name]) {
      acc[report.lecturer_name] = { totalAttendance: 0, count: 0 };
    }
    acc[report.lecturer_name].totalAttendance += (report.actual_students / report.total_students * 100);
    acc[report.lecturer_name].count += 1;
    return acc;
  }, {});

  const lecturerAttendanceNames = Object.keys(attendanceByLecturer);
  const averageAttendance = lecturerAttendanceNames.map(name =>
    (attendanceByLecturer[name].totalAttendance / attendanceByLecturer[name].count).toFixed(1)
  );

  // Top performing lecturers (by average rating)
  const topLecturers = lecturerNames
    .map(name => ({
      name,
      averageRating: parseFloat(averageRatings[lecturerNames.indexOf(name)]),
      reportCount: reportsByLecturer[name] || 0
    }))
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 5);

  // Chart data
  const reportsChartData = {
    labels: Object.keys(reportsByLecturer),
    datasets: [{
      label: 'Reports Submitted',
      data: Object.values(reportsByLecturer),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  };

  const ratingsChartData = {
    labels: lecturerNames,
    datasets: [{
      label: 'Average Rating',
      data: averageRatings,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const ratingDistData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [{
      data: ratingDistribution,
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 205, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    }],
  };

  const attendanceTrendData = {
    labels: attendanceData.map(d => d.date),
    datasets: [{
      label: 'Attendance Rate (%)',
      data: attendanceData.map(d => d.attendance),
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      tension: 0.1,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading monitoring data...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="mb-4">📊 PRL Monitoring Dashboard</h3>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Total Reports</h5>
              <h3>{reports.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <h5 className="card-title">Total Ratings</h5>
              <h3>{ratings.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <h5 className="card-title">Active Lecturers</h5>
              <h3>{Object.keys(reportsByLecturer).length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Avg Rating</h5>
              <h3>
                {ratings.length > 0
                  ? (ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length).toFixed(1)
                  : '0.0'
                }
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Reports by Lecturer</h5>
            </div>
            <div className="card-body">
              <Bar data={reportsChartData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Average Ratings by Lecturer</h5>
            </div>
            <div className="card-body">
              <Bar data={ratingsChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Rating Distribution</h5>
            </div>
            <div className="card-body">
              <Pie data={ratingDistData} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Attendance Trends</h5>
            </div>
            <div className="card-body">
              <Line data={attendanceTrendData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 3 */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Reports by Course</h5>
            </div>
            <div className="card-body">
              <Bar data={{
                labels: Object.keys(reportsByCourse),
                datasets: [{
                  label: 'Reports Submitted',
                  data: Object.values(reportsByCourse),
                  backgroundColor: 'rgba(255, 159, 64, 0.6)',
                  borderColor: 'rgba(255, 159, 64, 1)',
                  borderWidth: 1,
                }],
              }} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Average Attendance by Lecturer</h5>
            </div>
            <div className="card-body">
              <Bar data={{
                labels: lecturerAttendanceNames,
                datasets: [{
                  label: 'Average Attendance (%)',
                  data: averageAttendance,
                  backgroundColor: 'rgba(153, 102, 255, 0.6)',
                  borderColor: 'rgba(153, 102, 255, 1)',
                  borderWidth: 1,
                }],
              }} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers and Recent Activity */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>🏆 Top Performing Lecturers</h5>
            </div>
            <div className="card-body">
              {topLecturers.map((lecturer, index) => (
                <div key={index} className="mb-2 p-2 border rounded">
                  <div className="d-flex justify-content-between">
                    <strong>{lecturer.name}</strong>
                    <span className="badge bg-success">{lecturer.averageRating} ⭐</span>
                  </div>
                  <div className="text-muted">Reports: {lecturer.reportCount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>📈 Key Insights</h5>
            </div>
            <div className="card-body">
              <div className="mb-2">
                <strong>Total Courses:</strong> {Object.keys(reportsByCourse).length}
              </div>
              <div className="mb-2">
                <strong>Highest Rated Lecturer:</strong> {topLecturers[0]?.name || 'N/A'} ({topLecturers[0]?.averageRating || '0.0'} ⭐)
              </div>
              <div className="mb-2">
                <strong>Most Active Lecturer:</strong> {Object.keys(reportsByLecturer).reduce((a, b) => reportsByLecturer[a] > reportsByLecturer[b] ? a : b, '')} ({Math.max(...Object.values(reportsByLecturer))} reports)
              </div>
              <div className="mb-2">
                <strong>Average Attendance:</strong> {lecturerAttendanceNames.length > 0 ? (averageAttendance.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / averageAttendance.length).toFixed(1) : '0.0'}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Recent Reports</h5>
            </div>
            <div className="card-body">
              {reports.slice(0, 5).map((report, index) => (
                <div key={index} className="mb-2 p-2 border rounded">
                  <small className="text-muted">{report.date_of_lecture}</small>
                  <div><strong>{report.lecturer_name}</strong> - {report.topic}</div>
                  <div className="text-muted">Attendance: {report.actual_students}/{report.total_students}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Recent Ratings</h5>
            </div>
            <div className="card-body">
              {ratings.slice(0, 5).map((rating, index) => (
                <div key={index} className="mb-2 p-2 border rounded">
                  <small className="text-muted">{new Date(rating.created_at).toLocaleDateString()}</small>
                  <div><strong>{rating.lecturer_name}</strong> - {rating.score} ⭐</div>
                  <div className="text-muted">{rating.comments || 'No comments'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PRLMonitoring;
