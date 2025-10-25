import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './StudentDashboardLayout.css'; // Import custom CSS for professional styling

function StudentDashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="student-dashboard">
      {/* Sidebar */}
      <aside className="student-sidebar">
        <div className="sidebar-header">
          <h4 className="sidebar-title">Student Dashboard</h4>
          <p className="sidebar-subtitle">Track your academic progress</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink
            to="/student"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Dashboard</span>
          </NavLink>
          <NavLink
            to="/student/classes"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">📚</span>
            <span className="nav-text">Class Selection</span>
          </NavLink>
          <NavLink
            to="/student/monitoring"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Monitoring</span>
          </NavLink>
          <NavLink
            to="/student/rating"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">⭐</span>
            <span className="nav-text">Rate Lecturer</span>
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <button className="btn-logout" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="student-main">
        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default StudentDashboardLayout;
