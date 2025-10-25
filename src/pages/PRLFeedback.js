import React, { useState } from 'react';
import axios from 'axios';

function PRLFeedback() {
  const [form, setForm] = useState({
    recipient_id: '',
    role: '',
    message: '',
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    const sender_id = payload.id;

    try {
      await axios.post('http://localhost:5000/api/feedback', {
        ...form,
        sender_id,
      });
      alert('Feedback sent!');
      setForm({ recipient_id: '', role: '', message: '' });
    } catch (err) {
      console.error('Failed to send feedback:', err);
      alert('Error sending feedback.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light rounded">
      <h4>🗣️ Send Feedback</h4>
      <input
        name="recipient_id"
        className="form-control mb-3"
        placeholder="Recipient ID"
        value={form.recipient_id}
        onChange={handleChange}
        required
      />
      <select
        name="role"
        className="form-select mb-3"
        value={form.role}
        onChange={handleChange}
        required
      >
        <option value="">Select Role</option>
        <option value="lecturer">Lecturer</option>
        <option value="pl">Program Leader</option>
      </select>
      <textarea
        name="message"
        className="form-control mb-3"
        placeholder="Your feedback message"
        value={form.message}
        onChange={handleChange}
        required
      />
      <button className="btn btn-primary w-100">Send Feedback</button>
    </form>
  );
}

export default PRLFeedback;