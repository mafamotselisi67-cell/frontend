import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ClassSelection() {
  const [availableClasses, setAvailableClasses] = useState([]);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/');
      return;
    }

    fetchClasses();
  }, [user, navigate]);

  const fetchClasses = () => {
    Promise.all([
      axios.get(`http://localhost:5000/api/classes/available/${user.id}`),
      axios.get(`http://localhost:5000/api/classes/student/${user.id}`)
    ])
      .then(([availableRes, assignedRes]) => {
        setAvailableClasses(availableRes.data);
        setAssignedClasses(assignedRes.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch classes:', err);
        setLoading(false);
      });
  };

  const handleEnroll = async (classId) => {
    setEnrolling(classId);
    try {
      await axios.post(`http://localhost:5000/api/classes/enroll/${classId}`, {
        student_id: user.id,
        class_id: classId
      });
      fetchClasses(); // Refresh both lists
    } catch (err) {
      console.error('Failed to enroll in class:', err);
      const errorMessage = err.response?.data?.error || 'Failed to enroll in class.';
      alert(errorMessage);
      fetchClasses(); // Refresh lists even on error to ensure consistency
    } finally {
      setEnrolling(null);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>📚 Class Selection</h3>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/student')}
        >
          Back to Dashboard
        </button>
      </div>

      {/* Available Classes Section */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Available Classes</h5>
        </div>
        <div className="card-body">
          {availableClasses.length === 0 ? (
            <p className="text-muted">No available classes to enroll in.</p>
          ) : (
            <div className="row">
              {availableClasses.map(cls => (
                <div key={cls.id} className="col-md-6 col-lg-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="card-title">{cls.name}</h6>
                      <p className="card-text">
                        <strong>Course:</strong> {cls.course_name}<br />
                        <strong>Stream:</strong> {cls.stream}<br />
                        <strong>Lecturer:</strong> {cls.lecturer_name}<br />
                        <strong>Schedule:</strong> {cls.schedule || 'Not set'}<br />
                        <strong>Module:</strong> {cls.module || 'Not set'}<br />
                        <strong>Students:</strong> {cls.total_students}
                      </p>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEnroll(cls.id)}
                        disabled={enrolling === cls.id}
                      >
                        {enrolling === cls.id ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                            Enrolling...
                          </>
                        ) : (
                          'Enroll'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Assigned Classes Section */}
      <div className="card">
        <div className="card-header">
          <h5>My Enrolled Classes</h5>
        </div>
        <div className="card-body">
          {assignedClasses.length === 0 ? (
            <p className="text-muted">You haven't enrolled in any classes yet.</p>
          ) : (
            <div className="row">
              {assignedClasses.map(cls => (
                <div key={cls.id} className="col-md-6 col-lg-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="card-title">{cls.name}</h6>
                      <p className="card-text">
                        <strong>Course:</strong> {cls.course_name}<br />
                        <strong>Stream:</strong> {cls.stream}<br />
                        <strong>Lecturer:</strong> {cls.lecturer_name}<br />
                        <strong>Schedule:</strong> {cls.schedule || 'Not set'}<br />
                        <strong>Module:</strong> {cls.module || 'Not set'}<br />
                        <strong>Students:</strong> {cls.total_students}
                      </p>
                      <div className="alert alert-success">
                        <small>✅ You are enrolled in this class</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClassSelection;
