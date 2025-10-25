import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './PRLDashboardLayout.css'; // Import custom CSS for professional styling

function PRLDashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="prl-dashboard">
      {/* Sidebar */}
      <aside className="prl-sidebar">
        <div className="sidebar-header">
          <h4 className="sidebar-title">Principal Lecturer</h4>
          <p className="sidebar-subtitle">Oversee academic operations</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink
            to="/prl"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Dashboard</span>
          </NavLink>
          <NavLink
            to="/prl/reports"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">📄</span>
            <span className="nav-text">View Reports</span>
          </NavLink>
          <NavLink
            to="/prl/monitoring"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Monitoring</span>
          </NavLink>
          <NavLink
            to="/prl/ratings"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">⭐</span>
            <span className="nav-text">Ratings</span>
          </NavLink>
          <NavLink
            to="/prl/feedback"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">🗣️</span>
            <span className="nav-text">Feedback</span>
          </NavLink>
          <NavLink
            to="/prl/courses"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">📚</span>
            <span className="nav-text">Courses</span>
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
      <main className="prl-main">
        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default PRLDashboardLayout;
