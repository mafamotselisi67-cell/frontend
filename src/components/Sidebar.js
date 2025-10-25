import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure this is imported

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="bg-primary text-white p-3 vh-100 d-flex flex-column" style={{ width: '250px' }}>
      <h4 className="mb-4 text-center">🎓 Program Leader</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-3">
          <NavLink to="/pldashboard" className="nav-link text-white" activeclassname="active">
            <i className="bi bi-house-door me-2"></i> Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink to="/pldashboard/courses" className="nav-link text-white" activeclassname="active">
            <i className="bi bi-journal-text me-2"></i> Courses
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink to="/pldashboard/reports" className="nav-link text-white" activeclassname="active">
            <i className="bi bi-file-earmark-bar-graph me-2"></i> Reports
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink to="/pldashboard/monitoring" className="nav-link text-white" activeclassname="active">
            <i className="bi bi-graph-up-arrow me-2"></i> Monitoring
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink to="/pldashboard/classes" className="nav-link text-white" activeclassname="active">
            <i className="bi bi-people-fill me-2"></i> Classes
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink to="/pldashboard/lectures" className="nav-link text-white" activeclassname="active">
            <i className="bi bi-person-badge me-2"></i> Lecturers
          </NavLink>
        </li>
        <li className="nav-item mb-3">
          <NavLink to="/pldashboard/ratings" className="nav-link text-white" activeclassname="active">
            <i className="bi bi-star-fill me-2"></i> Ratings
          </NavLink>
        </li>
      </ul>
      <button className="btn btn-outline-light mt-auto" onClick={handleLogout}>
        <i className="bi bi-box-arrow-right me-2"></i> Logout
      </button>
    </div>
  );
}

export default Sidebar;