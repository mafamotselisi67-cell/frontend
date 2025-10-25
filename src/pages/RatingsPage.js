import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RatingsPage() {
  const [summary, setSummary] = useState({ average: '--', topLecturer: '--', total: 0 });
  const [lecturerRatings, setLecturerRatings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/ratings/summary')
      .then(res => setSummary(res.data))
      .catch(err => console.error('Failed to fetch summary:', err));

    axios.get('http://localhost:5000/api/ratings/by-lecturer')
      .then(res => setLecturerRatings(res.data))
      .catch(err => console.error('Failed to fetch ratings:', err));
  }, []);

  return (
    <div className="p-4">
      <h3>⭐ Ratings Overview</h3>
      <div className="row mb-4">
        <div className="col-md-4"><div className="card p-3">Average Rating: {summary.average}</div></div>
        <div className="col-md-4"><div className="card p-3">Top Lecturer: {summary.topLecturer}</div></div>
        <div className="col-md-4"><div className="card p-3">Total Feedback: {summary.total}</div></div>
      </div>

      <h5>📈 Ratings by Lecturer</h5>
      <table className="table table-bordered">
        <thead>
          <tr><th>Lecturer</th><th>Average Score</th><th>Feedback Count</th></tr>
        </thead>
        <tbody>
          {lecturerRatings.map(l => (
            <tr key={l.lecturer_name}>
              <td>{l.lecturer_name}</td>
              <td>{l.average_score}</td>
              <td>{l.feedback_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RatingsPage;