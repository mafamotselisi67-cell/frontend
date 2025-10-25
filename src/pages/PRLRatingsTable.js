import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PRLRatingsTable() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ratings');
        setRatings(res.data);
      } catch (err) {
        console.error('Failed to fetch ratings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRatings();
  }, []);

  return (
    <div className="p-4">
      <h4>📊 Submitted Ratings</h4>
      {loading ? (
        <p>Loading ratings...</p>
      ) : ratings.length === 0 ? (
        <p>No ratings found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Lecturer Name</th>
              <th>Score</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map(r => (
              <tr key={r.id}>
                <td>{r.student?.name || 'Unknown'}</td>
                <td>{r.lecturer_name}</td>
                <td>{r.score}</td>
                <td>{r.comments}</td>
                <td>{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PRLRatingsTable;