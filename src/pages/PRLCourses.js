import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PRLCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));
        const userStream = payload.stream;

        if (!userStream) {
          setError('No stream assigned to your account');
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/courses/stream/${userStream}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setError('Failed to load courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📚 Courses & Lectures in Your Stream</h2>

      {courses.length === 0 ? (
        <div className="alert alert-info">
          No courses found in your stream.
        </div>
      ) : (
        <div className="row">
          {courses.map((course) => (
            <div key={course.id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">{course.title}</h5>
                  <small className="text-muted">Stream: {course.stream}</small>
                </div>
                <div className="card-body">
                  <p className="card-text">{course.description}</p>

                  <h6>Lectures:</h6>
                  {course.lectures.length === 0 ? (
                    <p className="text-muted">No lectures assigned yet.</p>
                  ) : (
                    <div className="list-group list-group-flush">
                      {course.lectures.map((lecture) => (
                        <div key={lecture.id} className="list-group-item px-0">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <strong>{lecture.name}</strong>
                              <br />
                              <small className="text-muted">
                                Lecturer: {lecture.lecturer_name}
                                {lecture.lecturer_email && ` (${lecture.lecturer_email})`}
                              </small>
                              <br />
                              <small className="text-muted">
                                Students: {lecture.total_students} | Schedule: {lecture.schedule}
                              </small>
                              {lecture.module && (
                                <>
                                  <br />
                                  <small className="text-muted">Module: {lecture.module}</small>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="card-footer text-muted">
                  <small>Created: {new Date(course.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PRLCourses;
