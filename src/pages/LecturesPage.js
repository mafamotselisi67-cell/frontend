import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LecturesPage() {
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/lecturers')
      .then(res => setLecturers(res.data))
      .catch(err => console.error('Failed to fetch lecturers:', err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">
                <i className="fas fa-chalkboard-teacher me-2"></i>
                Lecturers & Assigned Modules
              </h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th><i className="fas fa-user me-1"></i>Name</th>
                      <th><i className="fas fa-envelope me-1"></i>Email</th>
                      <th><i className="fas fa-book me-1"></i>Assigned Modules</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lecturers.map(l => (
                      <tr key={l.id}>
                        <td className="fw-semibold">{l.name}</td>
                        <td>{l.email}</td>
                        <td>
                          {Array.isArray(l.modules) && l.modules.length > 0 ? (
                            <div className="d-flex flex-wrap gap-1">
                              {l.modules.map((module, index) => (
                                <span key={index} className="badge bg-success">
                                  {module}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted">No modules assigned</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {lecturers.length === 0 && (
                <div className="text-center text-muted mt-3">
                  <i className="fas fa-info-circle fa-2x mb-2"></i>
                  <p>No lecturers found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturesPage;
