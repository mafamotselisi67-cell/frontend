import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditClassForm({ classData, onUpdated }) {
  const [form, setForm] = useState({
    name: '',
    course_id: '',
    lecturer_id: '',
    total_students: '',
    schedule: '',
    module: '',
  });
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, lecturersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/courses'),
          axios.get('http://localhost:5000/api/lecturers')
        ]);
        setCourses(coursesRes.data);
        setLecturers(lecturersRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (classData) {
      setForm({
        name: classData.name || '',
        course_id: classData.course_id || '',
        lecturer_id: classData.lecturer_id || '',
        total_students: classData.total_students || '',
        schedule: classData.schedule || '',
        module: classData.module || '',
      });
    }
  }, [classData]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/classes/${classData.id}`, {
        name: form.name,
        course_id: parseInt(form.course_id),
        lecturer_id: parseInt(form.lecturer_id),
        total_students: parseInt(form.total_students),
        schedule: form.schedule,
        module: form.module,
      });
      alert('Class updated successfully!');
      if (onUpdated) onUpdated();
    } catch (err) {
      console.error('Failed to update class:', err);
      alert('Error updating class.');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="card p-4 mb-4">
      <h4>📚 Edit Class</h4>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Class Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Calculus 101 - Section A"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Course</label>
            <select
              name="course_id"
              className="form-select"
              value={form.course_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Lecturer</label>
            <select
              name="lecturer_id"
              className="form-select"
              value={form.lecturer_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Lecturer</option>
              {lecturers.map(lecturer => (
                <option key={lecturer.id} value={lecturer.id}>
                  {lecturer.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Total Students</label>
            <input
              name="total_students"
              type="number"
              className="form-control"
              value={form.total_students}
              onChange={handleChange}
              placeholder="e.g., 30"
              min="1"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Module</label>
            <input
              name="module"
              type="text"
              className="form-control"
              value={form.module}
              onChange={handleChange}
              placeholder="e.g., Module 1: Introduction"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Schedule</label>
            <input
              name="schedule"
              type="text"
              className="form-control"
              value={form.schedule}
              onChange={handleChange}
              placeholder="e.g., Monday 10:00-12:00, Wednesday 14:00-16:00"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Update Class
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => onUpdated()}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditClassForm;
