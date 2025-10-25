import React, { useState } from 'react';
import axios from 'axios';

function EditCourseForm({ course, onUpdated }) {
  const [form, setForm] = useState(course);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/courses/${course.id}`, form);
    onUpdated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} />
      <input name="description" value={form.description} onChange={handleChange} />
      <input name="stream" value={form.stream} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
}

export default EditCourseForm;