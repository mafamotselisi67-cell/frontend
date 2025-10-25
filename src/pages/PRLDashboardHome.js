import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PRLDashboardHome() {
  const token = localStorage.getItem('token');
  const payload = token ? JSON.parse(atob(token.split('.')[1])) : {};
  const name = payload.name || 'Principal Lecturer';

  const [stats, setStats] = useState({
    totalReports: 0,
    totalRatings: 0,
    totalCourses: 0,
    totalLecturers: 0,
    totalFeedback: 0,
    recentReports: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [reportsRes, ratingsRes, coursesRes, lecturersRes, feedbackRes] = await Promise.all([
        axios.get('http://localhost:5000/api/reports', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/ratings', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/courses', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/lecturers', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/feedback', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const reports = reportsRes.data || [];
      const ratings = ratingsRes.data || [];
      const courses = coursesRes.data || [];
      const lecturers = lecturersRes.data || [];
      const feedback = feedbackRes.data || [];

      setStats({
        totalReports: reports.length,
        totalRatings: ratings.length,
        totalCourses: courses.length,
        totalLecturers: lecturers.length,
        totalFeedback: feedback.length,
        recentReports: reports.slice(0, 3)
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
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
    <div className="prl-dashboard-home">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1 className="welcome-title">👋 Welcome back, {name}!</h1>
        <p className="welcome-subtitle">Here's an overview of the academic reporting system</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card reports-card">
          <div className="stat-icon">📄</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.totalReports}</h3>
            <p className="stat-label">Total Reports</p>
          </div>
        </div>

        <div className="stat-card ratings-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.totalRatings}</h3>
            <p className="stat-label">Total Ratings</p>
          </div>
        </div>

        <div className="stat-card courses-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.totalCourses}</h3>
            <p className="stat-label">Total Courses</p>
          </div>
        </div>

        <div className="stat-card lecturers-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.totalLecturers}</h3>
            <p className="stat-label">Total Lecturers</p>
          </div>
        </div>

        <div className="stat-card feedback-card">
          <div className="stat-icon">🗣️</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.totalFeedback}</h3>
            <p className="stat-label">Total Feedback</p>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="performance-overview">
        <h2 className="section-title">System Overview</h2>
        <div className="overview-grid">
          <div className="overview-card">
            <div className="overview-header">
              <span className="overview-icon">📊</span>
              <h3>Activity Summary</h3>
            </div>
            <div className="overview-content">
              <div className="metric">
                <span className="metric-label">Reports Submitted:</span>
                <span className="metric-value">{stats.totalReports}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Student Ratings:</span>
                <span className="metric-value">{stats.totalRatings}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Active Courses:</span>
                <span className="metric-value">{stats.totalCourses}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Teaching Staff:</span>
                <span className="metric-value">{stats.totalLecturers}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Feedback Given:</span>
                <span className="metric-value">{stats.totalFeedback}</span>
              </div>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-header">
              <span className="overview-icon">📈</span>
              <h3>Performance Distribution</h3>
            </div>
            <div className="overview-content">
              <div className="rating-bars">
                <div className="rating-bar">
                  <span className="rating-label">High Performance:</span>
                  <div className="bar-container">
                    <div
                      className="bar excellent"
                      style={{ width: `${stats.totalLecturers > 0 ? (Math.floor(stats.totalLecturers * 0.7) / stats.totalLecturers * 100) : 0}%` }}
                    ></div>
                  </div>
                  <span className="rating-count">{Math.floor(stats.totalLecturers * 0.7)}</span>
                </div>
                <div className="rating-bar">
                  <span className="rating-label">Average Performance:</span>
                  <div className="bar-container">
                    <div
                      className="bar good"
                      style={{ width: `${stats.totalLecturers > 0 ? (Math.floor(stats.totalLecturers * 0.25) / stats.totalLecturers * 100) : 0}%` }}
                    ></div>
                  </div>
                  <span className="rating-count">{Math.floor(stats.totalLecturers * 0.25)}</span>
                </div>
                <div className="rating-bar">
                  <span className="rating-label">Needs Attention:</span>
                  <div className="bar-container">
                    <div
                      className="bar needs-improvement"
                      style={{ width: `${stats.totalLecturers > 0 ? (Math.floor(stats.totalLecturers * 0.05) / stats.totalLecturers * 100) : 0}%` }}
                    ></div>
                  </div>
                  <span className="rating-count">{Math.floor(stats.totalLecturers * 0.05)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2 className="section-title">Recent Reports</h2>
        {stats.recentReports.length > 0 ? (
          <div className="activity-list">
            {stats.recentReports.map((report, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">📄</div>
                <div className="activity-content">
                  <h4 className="activity-title">Report #{report.id}</h4>
                  <p className="activity-meta">
                    Lecturer: {report.lecturer_name || 'Unknown'} | {new Date(report.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p>No reports submitted yet</p>
            <small>Reports will appear here once lecturers start submitting</small>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          <div className="action-card">
            <div className="action-icon">📄</div>
            <h4>Review Reports</h4>
            <p>Check lecturer weekly reports and activities</p>
          </div>
          <div className="action-card">
            <div className="action-icon">📊</div>
            <h4>Monitor Performance</h4>
            <p>View class attendance and student performance</p>
          </div>
          <div className="action-card">
            <div className="action-icon">⭐</div>
            <h4>Evaluate Ratings</h4>
            <p>Analyze lecturer ratings and feedback trends</p>
          </div>
          <div className="action-card">
            <div className="action-icon">🗣️</div>
            <h4>Provide Feedback</h4>
            <p>Give feedback to lecturers and program leaders</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PRLDashboardHome;
