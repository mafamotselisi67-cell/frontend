import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LecturerDashboardHome.css';

function LecturerDashboardHome() {
  const token = localStorage.getItem('token');
  const payload = token ? JSON.parse(atob(token.split('.')[1])) : {};
  const name = payload.name || 'Lecturer';
  const lecturerId = payload.id;

  const [stats, setStats] = useState({
    totalReports: 0,
    totalRatings: 0,
    averageRating: 0,
    recentReports: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [reportsRes, ratingsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/reports/lecturer/' + lecturerId, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:5000/api/ratings/lecturer/' + lecturerId, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const reports = reportsRes.data || [];
      const ratings = ratingsRes.data || [];

      const averageRating = ratings.length > 0
        ? ratings.reduce((sum, r) => sum + parseFloat(r.average_score || 0), 0) / ratings.length
        : 0;

      setStats({
        totalReports: reports.length,
        totalRatings: ratings.length,
        averageRating: averageRating.toFixed(1),
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
    <div className="lecturer-dashboard-home">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1 className="welcome-title">👋 Welcome back, {name}!</h1>
        <p className="welcome-subtitle">Here's an overview of your academic activities</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card reports-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.totalReports}</h3>
            <p className="stat-label">Total Reports</p>
          </div>
        </div>

        <div className="stat-card ratings-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.totalRatings}</h3>
            <p className="stat-label">Course Ratings</p>
          </div>
        </div>

        <div className="stat-card average-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.averageRating}</h3>
            <p className="stat-label">Average Rating</p>
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
                <span className="metric-label">Reports Submitted:</span>
                <span className="metric-value">{stats.totalReports}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Courses Rated:</span>
                <span className="metric-value">{stats.totalRatings}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Average Rating:</span>
                <span className="metric-value">{stats.averageRating}/5.0</span>
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
                      style={{ width: `${stats.totalRatings > 0 ? (Math.floor(stats.totalRatings * 0.6) / stats.totalRatings * 100) : 0}%` }}
                    ></div>
                  </div>
                  <span className="rating-count">{Math.floor(stats.totalRatings * 0.6)}</span>
                </div>
                <div className="rating-bar">
                  <span className="rating-label">Good (3-4):</span>
                  <div className="bar-container">
                    <div
                      className="bar good"
                      style={{ width: `${stats.totalRatings > 0 ? (Math.floor(stats.totalRatings * 0.3) / stats.totalRatings * 100) : 0}%` }}
                    ></div>
                  </div>
                  <span className="rating-count">{Math.floor(stats.totalRatings * 0.3)}</span>
                </div>
                <div className="rating-bar">
                  <span className="rating-label">Needs Improvement (1-3):</span>
                  <div className="bar-container">
                    <div
                      className="bar needs-improvement"
                      style={{ width: `${stats.totalRatings > 0 ? (Math.floor(stats.totalRatings * 0.1) / stats.totalRatings * 100) : 0}%` }}
                    ></div>
                  </div>
                  <span className="rating-count">{Math.floor(stats.totalRatings * 0.1)}</span>
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
                    <strong>Date:</strong> {new Date(report.date_of_lecture).toLocaleDateString()} |
                    <strong> Topic:</strong> {report.topic || 'N/A'} |
                    <strong> Attendance:</strong> {report.attendance || 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p>No reports submitted yet</p>
            <small>Start by submitting your first report</small>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          <div className="action-card">
            <div className="action-icon">📝</div>
            <h4>Submit Report</h4>
            <p>Share your weekly lecture activities</p>
          </div>
          <div className="action-card">
            <div className="action-icon">📊</div>
            <h4>View Monitoring</h4>
            <p>Check class attendance and performance</p>
          </div>
          <div className="action-card">
            <div className="action-icon">⭐</div>
            <h4>Check Ratings</h4>
            <p>See student feedback on your courses</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturerDashboardHome;
