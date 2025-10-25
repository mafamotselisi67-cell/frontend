import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentMonitoring() {
  const [monitoringData, setMonitoringData] = useState([]);

  useEffect(() => {
    const fetchMonitoring = async () => {
      try {
        const token = localStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        const student_id = payload.id;

        const res = await axios.get(`http://localhost:5000/api/monitoring/student/${student_id}`);
        setMonitoringData(res.data);
      } catch (err) {
        console.error('Failed to fetch monitoring data:', err);
      }
    };

    fetchMonitoring();
  }, []);

  return (
    <div className="p-4">
      <h4>📊 Your Monitoring Overview</h4>
      {monitoringData.length === 0 ? (
        <p className="mt-3">No monitoring records found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Course</th>
              <th>Lecturer</th>
              <th>Attendance</th>
              <th>Performance</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {monitoringData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.course_name}</td>
                <td>{entry.lecturer_name}</td>
                <td>{entry.attendance}</td>
                <td>{entry.performance}</td>
                <td>{entry.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentMonitoring;