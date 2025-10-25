import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        const plId = payload.id;

        const res = await axios.get(`http://localhost:5000/api/pl/dashboard/${plId}`);
        setReports(res.data.reports || []);
      } catch (err) {
        console.error('Failed to load reports:', err);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h3>📝 Reports</h3>
      <ul>
        {reports.length > 0 ? (
          reports.map(r => (
            <li key={r.id}>
              <strong>Class ID:</strong> {r.class_id} <br />
              <strong>Content:</strong> {r.content || 'No content'} <br />
              <strong>Feedback:</strong> {r.feedback || 'No feedback'}
            </li>
          ))
        ) : (
          <li>No reports available</li>
        )}
      </ul>
    </div>
  );
}

export default Reports;