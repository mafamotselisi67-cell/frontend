import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports')
      .then(res => setReports(res.data))
      .catch(err => console.error('Failed to fetch reports:', err));
  }, []);

  return (
    <div className="p-4">
      <h3>📝 Principal Lecturer Reports</h3>
      <table className="table table-bordered">
        <thead>
          <tr><th>Course</th><th>Lecturer</th><th>Summary</th><th>Date</th></tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td>{r.course_name}</td>
              <td>{r.lecturer_name}</td>
              <td>{r.outcomes}</td>
              <td>{new Date(r.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportsPage;
