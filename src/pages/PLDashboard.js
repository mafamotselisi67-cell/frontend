import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PLDashboard.css'; // optional for custom styling

function PLDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError(true);
          return;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));
        const plId = payload.id;

        const res = await axios.get(`http://localhost:5000/api/pl/dashboard/${plId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error('Dashboard error:', err);
        setError(true);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (error) return <div className="container mt-5 text-danger">❌ Failed to load dashboard.</div>;
  if (!data) return <div className="container mt-5">⏳ Loading dashboard...</div>;

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3 vh-100" style={{ width: '250px' }}>
        <h4 className="mb-4">Program Leader</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><strong>📚</strong> Courses</li>
          <li className="nav-item mb-2"><strong>📝</strong> Reports</li>
          <li className="nav-item mb-2"><strong>📈</strong> Monitoring</li>
          <li className="nav-item mb-2"><strong>👥</strong> Classes</li>
          <li className="nav-item mb-2"><strong>🎓</strong> Lectures</li>
          <li className="nav-item mb-2"><strong>⭐</strong> Ratings</li>
        </ul>
        <button className="btn btn-outline-light mt-4" onClick={handleLogout}>Logout</button>
      </div>

      {/* Main Content */}
      <div className="container-fluid p-4">
        <h2 className="mb-4">Dashboard Overview</h2>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header">📚 Courses</div>
              <div className="card-body">
                {Array.isArray(data.courses) && data.courses.length > 0 ? (
                  <ul>{data.courses.map(c => <li key={c.id}>{c.title}</li>)}</ul>
                ) : (
                  <p>No courses found</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header">📝 Reports</div>
              <div className="card-body">
                {Array.isArray(data.reports) && data.reports.length > 0 ? (
                  <ul>{data.reports.map(r => <li key={r.id}>{r.content}</li>)}</ul>
                ) : (
                  <p>No reports available</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header">📈 Monitoring</div>
              <div className="card-body">
                {Array.isArray(data.monitoring) && data.monitoring.length > 0 ? (
                  <ul>{data.monitoring.map(m => <li key={m.id}>Attendance: {m.attendance}</li>)}</ul>
                ) : (
                  <p>No monitoring data</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header">👥 Classes</div>
              <div className="card-body">
                {Array.isArray(data.classes) && data.classes.length > 0 ? (
                  <ul>{data.classes.map(cls => <li key={cls.id}>Class ID: {cls.id}</li>)}</ul>
                ) : (
                  <p>No classes found</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header">🎓 Lectures</div>
              <div className="card-body">
                <p>Lecturer data not available yet.</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-header">⭐ Ratings</div>
              <div className="card-body">
                {Array.isArray(data.ratings) && data.ratings.length > 0 ? (
                  <ul>{data.ratings.map(r => <li key={r.id}>Score: {r.score}</li>)}</ul>
                ) : (
                  <p>No ratings yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PLDashboard;
