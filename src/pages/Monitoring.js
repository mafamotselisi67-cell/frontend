import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Monitoring() {
  const [monitoring, setMonitoring] = useState([]);

  useEffect(() => {
    const fetchMonitoring = async () => {
      try {
        const token = localStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        const plId = payload.id;

        const res = await axios.get(`http://localhost:5000/api/pl/dashboard/${plId}`);
        setMonitoring(res.data.monitoring || []);
      } catch (err) {
        console.error('Failed to load monitoring data:', err);
      }
    };

    fetchMonitoring();
  }, []);

  return (
    <div>
      <h3>📈 Monitoring</h3>
      <ul>
        {monitoring.length > 0 ? (
          monitoring.map(m => (
            <li key={m.id}>
              <strong>Attendance Rate:</strong> {m.attendance_rate}% <br />
              <strong>Feedback Count:</strong> {m.feedback_count}
            </li>
          ))
        ) : (
          <li>No monitoring data</li>
        )}
      </ul>
    </div>
  );
}

export default Monitoring;