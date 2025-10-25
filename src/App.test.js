import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PLDashboardLayout from './pages/PLDashboardLayout';
import LecturerDashboardLayout from './pages/LecturerDashboardLayout';
import DashboardHome from './pages/DashboardHome';
import Courses from './pages/Courses';
import Reports from './pages/Reports';
import Monitoring from './pages/Monitoring';
import Classes from './pages/Classes';
import Lectures from './pages/Lectures';
import Ratings from './pages/Ratings';
import SubmitReportForm from './pages/SubmitReportForm'; // ✅
import React, { useState } from 'react';

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            showRegister ? (
              <RegisterForm onToggle={() => setShowRegister(false)} />
            ) : (
              <LoginForm onToggle={() => setShowRegister(true)} />
            )
          }
        />

        {/* Program Leader Dashboard */}
        <Route path="/pldashboard" element={<PLDashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="courses" element={<Courses />} />
          <Route path="reports" element={<Reports />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="classes" element={<Classes />} />
          <Route path="lectures" element={<Lectures />} />
          <Route path="ratings" element={<Ratings />} />
        </Route>

        {/* Lecturer Dashboard */}
        <Route path="/lecturer" element={<LecturerDashboardLayout />}>
          <Route path="reports" element={<SubmitReportForm />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="ratings" element={<Ratings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;