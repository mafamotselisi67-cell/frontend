import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentDashboardHome.css';

function StudentDashboardHome() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const payload = token ? JSON.parse(atob(token.split('.')[1])) : {};
  const name = payload.name || 'Student';
  const studentId = payload.id;

  const [stats, setStats] = useState({
    enrolledCourses: 0,
    feedbackSubmitted: 0,
    averageRating: 0,
    attendance: 0,
    recentFeedback: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      fetchDashboardStats();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    fetchDashboardStats();
  };

  const fetchDashboardStats = async () => {
    try {
      // Fetch ratings by student (feedback submitted)
      const ratingsRes = await axios.get('http://localhost:5000/api/ratings/student/' + studentId, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Fetch enrolled courses (assuming classes represent enrollment)
      const classesRes = await axios.get('http://localhost:5000/api/classes/student/' + studentId, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Fetch monitoring for attendance
      const monitoringRes = await axios.get('http://localhost:5000/api/monitoring/student/' + studentId, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const ratings = ratingsRes.data || [];
      const classes = classesRes.data || [];
      const monitoring = monitoringRes.data || [];

      const averageRating = ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length
        : 0;

      const attendance = monitoring.length > 0
        ? (monitoring.filter(m => m.attendance === 'present').length / monitoring.length * 100)
        : 0;

      setStats({
        enrolledCourses: classes.length,
        feedbackSubmitted: ratings.length,
        averageRating: averageRating.toFixed(1),
        attendance: attendance.toFixed(1),
        recentFeedback: ratings.slice(0, 3)
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Set default values if API calls fail
      setStats({
        enrolledCourses: 0,
        feedbackSubmitted: 0,
        averageRating: '0.0',
        attendance: '0.0',
        recentFeedback: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="student-dashboard-home">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1 className="welcome-title">👋 Welcome back, {name}!</h1>
        <p className="welcome-subtitle">Here's an overview of your academic activities</p>
       
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card courses-card" onClick={() => navigate('/student/classes')}>
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.enrolledCourses}</h3>
            <p className="stat-label">Enrolled Courses</p>
          </div>
        </div>

        <div className="stat-card feedback-card" onClick={() => navigate('/student/rating')}>
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.feedbackSubmitted}</h3>
            <p className="stat-label">Feedback Submitted</p>
          </div>
        </div>

        <div className="stat-card average-card" onClick={() => navigate('/student/rating')}>
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.averageRating}</h3>
            <p className="stat-label">Average Rating</p>
          </div>
        </div>

        <div className="stat-card attendance-card" onClick={() => navigate('/student/monitoring')}>
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.attendance}%</h3>
            <p className="stat-label">Attendance</p>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="performance-overview">
        <h2 className="section-title">Performance Overview</h2>
        <div className="overview-grid">
          <div className="overview-card">
            <div className="overview-header">
              <span className="overview-icon">📊</span>
              <h3>Activity Summary</h3>
            </div>
            <div className="overview-content">
              <div className="metric">
                <span className="metric-label">Courses Enrolled:</span>
                <span className="metric-value">{stats.enrolledCourses}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Feedback Given:</span>
                <span className="metric-value">{stats.feedbackSubmitted}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Average Rating:</span>
                <span className="metric-value">{stats.averageRating}/5.0</span>
              </div>
              <div className="metric">
                <span className="metric-label">Attendance Rate:</span>
                <span className="metric-value">{stats.attendance}%</span>
              </div>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-header">
              <span className="overview-icon">📈</span>
              <h3>Rating Distribution</h3>
            </div>
            <div className="overview-content">
              <div className="rating-bars">
                <div className="rating-bar">
                  <span className="rating-label">Excellent (4-5):</span>
                  <div className="bar-container">
                    <div
                      className="bar excellent"
                      style={{ width: `${stats.feedbackSubmitted > 0 ? (Math.floor(stats.feedbackSubmitted * 0.6) / stats.feedbackSubmitted * 100) : 0}%` }}
                    ></div>
                  </div>
                  <span className="rating-count">{Math.floor(stats.feedbackSubmitted * 0.6)}</span>
                </div>
                <div className="rating-bar">
                  <span className="rating-label">Good (3-4):</span>
                  <div className="bar-container">
                    <div
                      className="bar good"
                      style={{ width: `${stats.feedbackSubmitted > 0 ? (Math.floor(stats.feedbackSubmitted * 0.3) / stats.feedbackSubmitted * 100) : 0}%` }}
                    ></div>
                  </div>
                  <span className="rating-count">{Math.floor(stats.feedbackSubmitted * 0.3)}</span>
                </div>
                <div className="rating-bar">
                  <span className="rating-label">Needs Improvement (1-3):</span>
                  <div className="bar-container">
                    <div
                      className="bar needs-improvement"
                      style={{ width: `${stats.feedbackSubmitted > 0 ? (Math.floor(stats.feedbackSubmitted * 0.1) / stats.feedbackSubmitted * 100) : 0}%` }}
                    ></div>
                  </div>
                  <span className="rating-count">{Math.floor(stats.feedbackSubmitted * 0.1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2 className="section-title">Recent Feedback</h2>
        {stats.recentFeedback.length > 0 ? (
          <div className="activity-list">
            {stats.recentFeedback.map((feedback, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">⭐</div>
                <div className="activity-content">
                  <h4 className="activity-title">Rating: {feedback.score}/5</h4>
                  <p className="activity-meta">
                    {new Date(feedback.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p>No feedback submitted yet</p>
            <small>Start by rating your lecturers</small>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          <div className="action-card" onClick={() => navigate('/student/classes')}>
            <div className="action-icon">📚</div>
            <h4>Enroll in Classes</h4>
            <p>Select and enroll in available classes</p>
          </div>
          <div className="action-card" onClick={() => navigate('/student/monitoring')}>
            <div className="action-icon">🔍</div>
            <h4>View Monitoring</h4>
            <p>Check your class attendance and performance</p>
          </div>
          <div className="action-card" onClick={() => navigate('/student/rating')}>
            <div className="action-icon">📝</div>
            <h4>Submit Feedback</h4>
            <p>Rate your lecturers and provide comments</p>
          </div>
          <div className="action-card" onClick={() => navigate('/student/monitoring')}>
            <div className="action-icon">📅</div>
            <h4>Check Attendance</h4>
            <p>View your attendance records</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboardHome;
