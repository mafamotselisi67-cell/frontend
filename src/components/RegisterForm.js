import React, { useState } from 'react';
import axios from 'axios';
import AuthCard from './AuthCard';

function RegisterForm({ onToggle }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('Account created successfully!');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <AuthCard title="LUCT Reporting">
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          onChange={handleChange}
          required
        />
        <select
  name="role"
  className="form-control mb-3"
  value={formData.role}
  onChange={handleChange}
  required
>
  <option value="">Select Role</option>
  <option value="student">Student</option>
  <option value="lecturer">Lecturer</option>
  <option value="prl">Principal Lecturer</option>
  <option value="pl">Program Leader</option>
</select>

        {/* <select
          name="role"
          className="form-control mb-3"
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="lecturer">Lecturer</option>
          <option value="prl">Principal Lecturer</option>
          <option value="pl">Program Leader</option>
        </select> */}
        <button className="btn btn-primary w-100">Create Account</button>
      </form>
      <div className="text-center mt-3">
        <button className="btn btn-link" onClick={onToggle}>
          Already have an account? Login
        </button>
      </div>
    </AuthCard>
  );
}

export default RegisterForm;