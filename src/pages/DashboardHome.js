import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function DashboardHome() {
  const data = {
    labels: ['Courses', 'Classes', 'Reports', 'Ratings'],
    datasets: [
      {
        label: 'Activity Overview',
        data: [12, 8, 15, 10], // Dummy data
        backgroundColor: '#0d6efd',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  const modules = [
    {
      label: 'Courses',
      icon: '📚',
      description: 'Manage curriculum and streams',
      link: '/pldashboard/courses',
    },
    {
      label: 'Classes',
      icon: '👥',
      description: 'Assign lecturers and students',
      link: '/pldashboard/classes',
    },
    {
      label: 'Reports',
      icon: '📝',
      description: 'Review lecturer feedback',
      link: '/pldashboard/reports',
    },
    {
      label: 'Ratings',
      icon: '⭐',
      description: 'Track performance trends',
      link: '/pldashboard/ratings',
    },
  ];

  return (
    <div className="p-4">
      {/* Welcome Section */}
      <h2 className="mb-3">Welcome, Program Leader 👋</h2>
      <p className="text-muted mb-4">
        Use the sidebar to manage courses, assign lecturers, view reports, monitor attendance, and review ratings.
      </p>

      {/* Graph Section */}
      <div className="bg-white p-4 rounded shadow-sm mb-5">
        <h5 className="mb-3">📊 System Activity Snapshot</h5>
        <Bar data={data} options={options} />
      </div>

      {/* Summary Cards */}
      <div className="row g-4">
        {modules.map((mod) => (
          <div className="col-md-3" key={mod.label}>
            <div className="card shadow-sm h-100 text-center">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{mod.icon} {mod.label}</h5>
                  <p className="text-muted">{mod.description}</p>
                </div>
                <a href={mod.link} className="btn btn-sm btn-primary mt-3">Go to {mod.label}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardHome;