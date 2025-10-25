import React, { useState } from 'react';
import axios from 'axios';

function AddCourseForm({ onCourseAdded }) {
  const [form, setForm] = useState({ title: '', description: '', stream: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    const created_by = payload.id;

    await axios.post('http://localhost:5000/api/courses', { ...form, created_by });
    onCourseAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Course Title" onChange={handleChange} required />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="stream" placeholder="Stream" onChange={handleChange} />
      <button type="submit">Add Course</button>
    </form>
  );
}

export default AddCourseForm;