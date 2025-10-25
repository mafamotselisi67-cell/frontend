import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

// Auth
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import PLDashboardLayout from './pages/PLDashboardLayout';
import LecturerDashboardLayout from './pages/LecturerDashboardLayout';
import StudentDashboardLayout from './pages/StudentDashboardLayout';
import PRLDashboardLayout from './pages/PRLDashboardLayout';

// Home Screens
import DashboardHome from './pages/DashboardHome';
import LecturerDashboardHome from './pages/LecturerDashboardHome';
import StudentDashboardHome from './pages/StudentDashboardHome';
import PRLDashboardHome from './pages/PRLDashboardHome';

// PL Pages
import CoursesPage from './pages/CoursesPage';
import ReportsPage from './pages/ReportsPage';
import MonitoringPage from './pages/MonitoringPage';
import ClassesPage from './pages/ClassesPage';
import LecturesPage from './pages/LecturesPage';
import PLRatingsPage from './pages/PLRatingsPage';
import PLStudentAssignment from './pages/PLStudentAssignment';

// Lecturer Pages
import SubmitReportForm from './pages/SubmitReportForm';
import Monitoring from './pages/Monitoring';
import Ratings from './pages/Ratings';

// Student Pages
import StudentMonitoring from './pages/StudentMonitoring';
import StudentRatingForm from './pages/StudentRatingForm';
import ClassSelection from './pages/ClassSelection';

// PRL Pages
import PRLReports from './pages/PRLReports';
import PRLMonitoring from './pages/PRLMonitoring';
import PRLRatings from './pages/PRLRatings';
import PRLFeedback from './pages/PRLFeedback';
import PRLCourses from './pages/PRLCourses';

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
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
        <Route
          path="/pldashboard"
          element={
            <ProtectedRoute allowedRole="pl">
              <PLDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="monitoring" element={<MonitoringPage />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="lectures" element={<LecturesPage />} />
          <Route path="ratings" element={<PLRatingsPage />} />
          <Route path="assign-students" element={<PLStudentAssignment />} />
        </Route>

        {/* Lecturer Dashboard */}
        <Route
          path="/lecturer"
          element={
            <ProtectedRoute allowedRole="lecturer">
              <LecturerDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<LecturerDashboardHome />} />
          <Route path="reports" element={<SubmitReportForm />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="ratings" element={<Ratings />} />
        </Route>

        {/* Student Dashboard */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboardHome />} />
          <Route path="monitoring" element={<StudentMonitoring />} />
          <Route path="rating" element={<StudentRatingForm />} />
          <Route path="classes" element={<ClassSelection />} />
        </Route>

        {/* Principal Lecturer Dashboard */}
        <Route
          path="/prl"
          element={
            <ProtectedRoute allowedRole="prl">
              <PRLDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<PRLDashboardHome />} />
          <Route path="reports" element={<PRLReports />} />
          <Route path="monitoring" element={<PRLMonitoring />} />
          <Route path="ratings" element={<PRLRatings />} />
          <Route path="feedback" element={<PRLFeedback />} />
          <Route path="courses" element={<PRLCourses />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
