import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PLStudentAssignment() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const [studentsRes, classesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/pl/students', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/classes', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setStudents(studentsRes.data);
      setClasses(classesRes.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedStudent || !selectedClass) {
      alert('Please select both a student and a class');
      return;
    }

    setAssigning(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/pl/assign-student', {
        student_id: selectedStudent,
        class_id: selectedClass
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Student assigned to class successfully!');
      setSelectedStudent('');
      setSelectedClass('');
    } catch (err) {
      console.error('Failed to assign student:', err);
      alert('Failed to assign student. They may already be enrolled.');
    } finally {
      setAssigning(false);
    }
  };

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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👥 Assign Students to Classes</h2>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/pl')}
        >
          Back to Dashboard
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Student-Class Assignment</h5>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Select Student</label>
              <select
                className="form-select"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Choose a student...</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Select Class</label>
              <select
                className="form-select"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Choose a class...</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name} - {cls.course_name} (Lecturer: {cls.lecturer_name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleAssign}
            disabled={assigning || !selectedStudent || !selectedClass}
          >
            {assigning ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Assigning...
              </>
            ) : (
              'Assign Student to Class'
            )}
          </button>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5>Available Students ({students.length})</h5>
        </div>
        <div className="card-body">
          {students.length === 0 ? (
            <p className="text-muted">No students available</p>
          ) : (
            <div className="row">
              {students.map(student => (
                <div key={student.id} className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="card-title">{student.name}</h6>
                      <p className="card-text text-muted">{student.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h5>Available Classes ({classes.length})</h5>
        </div>
        <div className="card-body">
          {classes.length === 0 ? (
            <p className="text-muted">No classes available</p>
          ) : (
            <div className="row">
              {classes.map(cls => (
                <div key={cls.id} className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="card-title">{cls.name}</h6>
                      <p className="card-text">
                        <strong>Course:</strong> {cls.course_name}<br />
                        <strong>Lecturer:</strong> {cls.lecturer_name}<br />
                        <strong>Students:</strong> {cls.total_students}<br />
                        <strong>Schedule:</strong> {cls.schedule || 'Not set'}<br />
                        <strong>Module:</strong> {cls.module || 'Not set'}
                      </p>
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

export default PLStudentAssignment;
