import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LecturerMonitoring() {
  const [overview, setOverview] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const { id } = JSON.parse(atob(token.split('.')[1]));

    axios.get(`http://localhost:5000/api/monitoring/lecturer/${id}`)
      .then(res => {
        setOverview(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Monitoring fetch failed:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h4 className="card-title mb-0">
                <i className="fas fa-chart-line me-2"></i>
                📈 Monitoring Overview
              </h4>
            </div>
            <div className="card-body">
              {overview.classes && overview.classes.length > 0 ? (
                <>
                  {/* Overall Summary Cards */}
                  <div className="row mb-4">
                    <div className="col-md-3">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <h5 className="card-title text-primary">{overview.totalClasses}</h5>
                          <p className="card-text">Total Classes</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <h5 className="card-title text-success">{overview.totalStudents}</h5>
                          <p className="card-text">Total Students</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <h5 className="card-title text-warning">{overview.avgAttendance}%</h5>
                          <p className="card-text">Avg Attendance</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="card bg-light">
                        <div className="card-body text-center">
                          <h5 className="card-title text-info">{overview.totalFeedback}</h5>
                          <p className="card-text">Total Feedback</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Table */}
                  <div className="table-responsive">
                    <table className="table table-striped table-hover">
                      <thead className="table-dark">
                        <tr>
                          <th><i className="fas fa-chalkboard me-1"></i>Class</th>
                          <th><i className="fas fa-book me-1"></i>Course</th>
                          <th><i className="fas fa-users me-1"></i>Students</th>
                          <th><i className="fas fa-percentage me-1"></i>Attendance %</th>
                          <th><i className="fas fa-comments me-1"></i>Feedback Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {overview.classes.map(row => (
                          <tr key={row.class_id}>
                            <td className="fw-semibold">{row.class_name}</td>
                            <td>{row.course_name}</td>
                            <td>{row.total_students}</td>
                            <td>
                              <span className={`badge ${row.attendance_rate >= 80 ? 'bg-success' : row.attendance_rate >= 60 ? 'bg-warning' : 'bg-danger'}`}>
                                {row.attendance_rate}%
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-info">{row.feedback_count}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="text-center text-muted py-5">
                  <i className="fas fa-chart-line fa-3x mb-3"></i>
                  <h5>No monitoring data available</h5>
                  <p>Monitoring data will appear here once classes are tracked.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturerMonitoring;
