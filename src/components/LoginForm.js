import React, { useState } from 'react';
import axios from 'axios';
import AuthCard from './AuthCard';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onToggle }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token } = res.data;

      // Store token
      localStorage.setItem('token', token);

      // Decode JWT to extract role and user info
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;

      // Store user object and role separately
      const user = { id: payload.id, role: payload.role, stream: payload.stream };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', role);

      // Redirect based on role
      switch (role) {
        case 'prl':
        navigate('/prl');
        break;
        case 'pl':
          navigate('/pldashboard');
          break;
        case 'lecturer':
          navigate('/lecturer');
          break;
        case 'student':
          navigate('/student');
          break;
        default:
          alert(`Login successful! Role: ${role} — but no dashboard is configured.`);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <AuthCard title="LUCT Reporting">
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="your.email@luct.edu"
          className="form-control mb-3"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-success w-100">Login</button>
      </form>
      <div className="text-center mt-3">
        <button className="btn btn-link" onClick={onToggle}>
          Don't have an account? Sign Up
        </button>
      </div>
    </AuthCard>
  );
}

export default LoginForm;