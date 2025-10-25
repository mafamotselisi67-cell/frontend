import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function PLRatingsPage() {
  const [summary, setSummary] = useState({
    average: '--',
    topLecturer: '--',
    total: 0,
    scoreDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [lecturerRatings, setLecturerRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [summaryRes, lecturerRes] = await Promise.all([
          axios.get('http://localhost:5000/api/ratings/summary', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/ratings/by-lecturer', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setSummary(summaryRes.data);
        setLecturerRatings(lecturerRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch ratings data:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading ratings data...</div>;
  }

  // Prepare chart data
  const barChartData = {
    labels: lecturerRatings.map(l => l.lecturer_name.length > 15 ? l.lecturer_name.substring(0, 15) + '...' : l.lecturer_name),
    datasets: [{
      label: 'Average Rating',
      data: lecturerRatings.map(l => parseFloat(l.average_score)),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  };

  const pieChartData = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [{
      data: Object.values(summary.scoreDistribution),
      backgroundColor: [
        '#FF6384',
        '#FF9F40',
        '#FFCD56',
        '#4BC0C0',
        '#36A2EB'
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#FF9F40',
        '#FFCD56',
        '#4BC0C0',
        '#36A2EB'
      ],
    }],
  };

  const lineChartData = {
    labels: lecturerRatings.slice(0, 10).map(l => l.lecturer_name.length > 10 ? l.lecturer_name.substring(0, 10) + '...' : l.lecturer_name),
    datasets: [{
      label: 'Average Rating Trend',
      data: lecturerRatings.slice(0, 10).map(l => parseFloat(l.average_score)),
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Lecturer Performance Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
      },
    },
  };

  return (
    <div className="p-4">
      <h3 className="mb-4">📊 Ratings Analytics Dashboard</h3>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5 className="text-primary">📈 Average Rating</h5>
            <h2 className="text-success">{summary.average}</h2>
            <small className="text-muted">Out of 5 stars</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5 className="text-primary">🏆 Top Lecturer</h5>
            <h4 className="text-info">{summary.topLecturer}</h4>
            <small className="text-muted">Highest rated</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5 className="text-primary">📝 Total Feedback</h5>
            <h2 className="text-warning">{summary.total}</h2>
            <small className="text-muted">Student reviews</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 shadow-sm">
            <h5 className="text-primary">👨‍🏫 Active Lecturers</h5>
            <h2 className="text-secondary">{lecturerRatings.length}</h2>
            <small className="text-muted">With ratings</small>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5 className="card-title">📊 Lecturer Performance Comparison</h5>
            <div style={{ height: '300px' }}>
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h5 className="card-title">🥧 Rating Distribution</h5>
            <div style={{ height: '300px' }}>
              <Pie data={pieChartData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card p-3 shadow-sm">
            <h5 className="card-title">📈 Top 10 Lecturers Rating Trend</h5>
            <div style={{ height: '300px' }}>
              <Line data={lineChartData} options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 5,
                  },
                },
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="card shadow-sm">
        <div className="card-header">
          <h5>📋 Detailed Lecturer Ratings</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Rank</th>
                  <th>Lecturer Name</th>
                  <th>Average Rating</th>
                  <th>Feedback Count</th>
                  <th>Performance</th>
                </tr>
              </thead>
              <tbody>
                {lecturerRatings.map((lecturer, index) => (
                  <tr key={lecturer.lecturer_name}>
                    <td>
                      <span className={`badge ${index === 0 ? 'bg-warning text-dark' : index === 1 ? 'bg-secondary' : index === 2 ? 'bg-info' : 'bg-light text-dark'}`}>
                        #{index + 1}
                      </span>
                    </td>
                    <td className="fw-bold">{lecturer.lecturer_name}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="me-2">{lecturer.average_score}</span>
                        <div className="progress" style={{ width: '100px', height: '8px' }}>
                          <div
                            className="progress-bar bg-success"
                            style={{ width: `${(parseFloat(lecturer.average_score) / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-primary">{lecturer.feedback_count}</span>
                    </td>
                    <td>
                      {parseFloat(lecturer.average_score) >= 4.5 ? (
                        <span className="badge bg-success">Excellent</span>
                      ) : parseFloat(lecturer.average_score) >= 4.0 ? (
                        <span className="badge bg-info">Very Good</span>
                      ) : parseFloat(lecturer.average_score) >= 3.5 ? (
                        <span className="badge bg-warning text-dark">Good</span>
                      ) : parseFloat(lecturer.average_score) >= 3.0 ? (
                        <span className="badge bg-secondary">Average</span>
                      ) : (
                        <span className="badge bg-danger">Needs Improvement</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PLRatingsPage;
