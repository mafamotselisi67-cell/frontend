import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './LecturerDashboardLayout.css'; // Import custom CSS for professional styling

function LecturerDashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="lecturer-dashboard">
      {/* Sidebar */}
      <aside className="lecturer-sidebar">
        <div className="sidebar-header">
          <h4 className="sidebar-title">Lecturer Dashboard</h4>
          <p className="sidebar-subtitle">Manage your academic activities</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink
            to="/lecturer"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Dashboard</span>
          </NavLink>
          <NavLink
            to="/lecturer/reports"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">📝</span>
            <span className="nav-text">Submit Report</span>
          </NavLink>
          <NavLink
            to="/lecturer/monitoring"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">📈</span>
            <span className="nav-text">Monitoring</span>
          </NavLink>
          <NavLink
            to="/lecturer/ratings"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">⭐</span>
            <span className="nav-text">Ratings</span>
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
      <main className="lecturer-main">
        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default LecturerDashboardLayout;
