import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function MonitoringPage() {
  const [overview, setOverview] = useState({ classes: 0, courses: 0, reports: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/monitoring/overview')
      .then(res => setOverview(res.data))
      .catch(err => console.error('Failed to fetch monitoring data:', err));
  }, []);

  const data = {
    labels: ['Classes', 'Courses', 'Reports'],
    datasets: [
      {
        label: 'Count',
        data: [overview.classes, overview.courses, overview.reports],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monitoring Overview',
      },
    },
  };

  return (
    <div className="p-4">
      <h3>📈 Monitoring Overview</h3>
      <div className="row">
        <div className="col-md-6">
          <Bar data={data} options={options} />
        </div>
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Statistics</h5>
            <p>Classes: {overview.classes}</p>
            <p>Courses: {overview.courses}</p>
            <p>Reports: {overview.reports}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonitoringPage;
