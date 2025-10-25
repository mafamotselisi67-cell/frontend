import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditCourseForm from './EditCourseForm';

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    stream: '',
    created_by: '',
  });
  const [editingCourse, setEditingCourse] = useState(null);

  // Extract PL ID from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setForm(prev => ({ ...prev, created_by: payload.id }));
    }
  }, []);

  // Fetch courses created by this PL
  useEffect(() => {
    if (form.created_by) {
      axios.get(`http://localhost:5000/api/courses/pl/${form.created_by}`)
        .then(res => setCourses(res.data))
        .catch(err => console.error('Failed to fetch courses:', err));
    }
  }, [form.created_by]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/courses', form);
      const res = await axios.get(`http://localhost:5000/api/courses/pl/${form.created_by}`);
      setCourses(res.data);
      setForm({ ...form, title: '', description: '', stream: '' });
    } catch (err) {
      console.error('Failed to create course:', err);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/${courseId}`);
        const res = await axios.get(`http://localhost:5000/api/courses/pl/${form.created_by}`);
        setCourses(res.data);
      } catch (err) {
        console.error('Failed to delete course:', err);
      }
    }
  };

  const handleUpdated = async () => {
    setEditingCourse(null);
    const res = await axios.get(`http://localhost:5000/api/courses/pl/${form.created_by}`);
    setCourses(res.data);
  };

  return (
    <div className="p-4">
      <h3>📚 Add New Course</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="title"
          className="form-control mb-2"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="description"
          className="form-control mb-2"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          name="stream"
          className="form-control mb-2"
          placeholder="Stream"
          value={form.stream}
          onChange={handleChange}
        />
        <button className="btn btn-primary">Add Course</button>
      </form>

      <h4>📋 Your Courses</h4>
      <table className="table table-bordered">
        <thead>
          <tr><th>Title</th><th>Description</th><th>Stream</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.description}</td>
              <td>{c.stream}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(c)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingCourse && (
        <div className="mt-4">
          <h5>Edit Course</h5>
          <EditCourseForm course={editingCourse} onUpdated={handleUpdated} />
        </div>
      )}
    </div>
  );
}

export default CoursesPage;