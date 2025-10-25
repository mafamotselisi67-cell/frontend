import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './PLDashboardLayout.css'; // Import custom CSS for professional styling

function PLDashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="pl-dashboard">
      {/* Sidebar */}
      <aside className="pl-sidebar">
        <div className="sidebar-header">
          <h4 className="sidebar-title">Program Leader</h4>
          <p className="sidebar-subtitle">Manage program curriculum</p>
        </div>
        <nav className="sidebar-nav">
          <NavLink
            to="/pldashboard"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Dashboard</span>
          </NavLink>
          <NavLink
            to="/pldashboard/courses"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">📚</span>
            <span className="nav-text">Courses</span>
          </NavLink>
          <NavLink
            to="/pldashboard/reports"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">📝</span>
            <span className="nav-text">Reports</span>
          </NavLink>
          <NavLink
            to="/pldashboard/monitoring"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">📈</span>
            <span className="nav-text">Monitoring</span>
          </NavLink>
          <NavLink
            to="/pldashboard/classes"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">👥</span>
            <span className="nav-text">Classes</span>
          </NavLink>
          <NavLink
            to="/pldashboard/lectures"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">🎓</span>
            <span className="nav-text">Lecturers</span>
          </NavLink>
          <NavLink
            to="/pldashboard/ratings"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">⭐</span>
            <span className="nav-text">Ratings</span>
          </NavLink>
          <NavLink
            to="/pldashboard/assign-students"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">👨‍🎓</span>
            <span className="nav-text">Assign Students</span>
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
      <main className="pl-main">
        <div className="main-header">
          <h2 className="main-title">Dashboard Panel</h2>
          <span className="main-subtitle">Academic Reporting System</span>
        </div>
        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default PLDashboardLayout;
