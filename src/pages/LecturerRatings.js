import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LecturerRatings() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const { id } = JSON.parse(atob(token.split('.')[1]));

    axios.get(`http://localhost:5000/api/ratings/lecturer/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setRatings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch ratings:', err);
        setLoading(false);
      });
  }, []);

  const renderStars = (score) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="d-flex align-items-center">
        {[...Array(fullStars)].map((_, i) => (
          <i key={i} className="fas fa-star text-warning"></i>
        ))}
        {hasHalfStar && <i className="fas fa-star-half-alt text-warning"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={i} className="far fa-star text-warning"></i>
        ))}
        <span className="ms-2 fw-semibold">{score}/5.0</span>
      </div>
    );
  };

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
            <div className="card-header bg-success text-white">
              <h4 className="card-title mb-0">
                <i className="fas fa-star me-2"></i>
                ⭐ Student Feedback & Ratings
              </h4>
            </div>
            <div className="card-body">
              {ratings.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th><i className="fas fa-user me-1"></i>Student</th>
                        <th><i className="fas fa-book me-1"></i>Course</th>
                        <th><i className="fas fa-chart-line me-1"></i>Rating</th>
                        <th><i className="fas fa-comments me-1"></i>Comments</th>
                        <th><i className="fas fa-calendar me-1"></i>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ratings.map(r => (
                        <tr key={r.id}>
                          <td className="fw-semibold">{r.student_name}</td>
                          <td>{r.course_name}</td>
                          <td>{renderStars(r.score)}</td>
                          <td>
                            {r.comments ? (
                              <span className="badge bg-light text-dark border">
                                "{r.comments.length > 50 ? r.comments.substring(0, 50) + '...' : r.comments}"
                              </span>
                            ) : (
                              <span className="text-muted">No comment</span>
                            )}
                          </td>
                          <td>{new Date(r.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-muted py-5">
                  <i className="fas fa-star fa-3x mb-3"></i>
                  <h5>No ratings available</h5>
                  <p>Student ratings and feedback will appear here once submitted.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturerRatings;
