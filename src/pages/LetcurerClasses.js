import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LecturerClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const { id } = JSON.parse(atob(token.split('.')[1]));

    axios.get(`http://localhost:5000/api/classes/lecturer/${id}`)
      .then(res => {
        setClasses(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Classes fetch failed:', err);
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
            <div className="card-header bg-info text-white">
              <h4 className="card-title mb-0">
                <i className="fas fa-chalkboard-teacher me-2"></i>
                👥 My Classes
              </h4>
            </div>
            <div className="card-body">
              {classes.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th><i className="fas fa-tag me-1"></i>Class Name</th>
                        <th><i className="fas fa-book me-1"></i>Course</th>
                        <th><i className="fas fa-stream me-1"></i>Stream</th>
                        <th><i className="fas fa-users me-1"></i>Students</th>
                        <th><i className="fas fa-calendar me-1"></i>Schedule</th>
                        <th><i className="fas fa-graduation-cap me-1"></i>Module</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classes.map(cls => (
                        <tr key={cls.id}>
                          <td className="fw-semibold">{cls.name}</td>
                          <td>{cls.course_name}</td>
                          <td>
                            <span className="badge bg-primary">{cls.stream}</span>
                          </td>
                          <td>
                            <span className="badge bg-secondary">{cls.student_count}</span>
                          </td>
                          <td>{cls.schedule}</td>
                          <td>{cls.module || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-muted py-5">
                  <i className="fas fa-chalkboard-teacher fa-3x mb-3"></i>
                  <h5>No classes assigned</h5>
                  <p>You haven't been assigned to any classes yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturerClasses;
