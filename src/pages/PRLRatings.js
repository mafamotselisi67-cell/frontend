import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PRLRatings() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/ratings');
        setRatings(res.data);
      } catch (err) {
        console.error('Failed to fetch ratings:', err);
      }
    };
    fetchRatings();
  }, []);

  return (
    <div className="p-4">
      <h4>⭐ Lecturer Ratings</h4>
      {ratings.length === 0 ? (
        <p>No ratings available.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Lecturer</th>
              <th>Student</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((r, i) => (
              <tr key={i}>
                <td>{r.lecturer_name}</td>
                <td>{r.student?.name || 'Unknown'}</td>
                <td>{r.score}</td>
                <td>{r.comments}</td>
                <td>{new Date(r.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PRLRatings;