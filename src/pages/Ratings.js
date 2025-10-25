import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Ratings() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const payload = JSON.parse(atob(token.split('.')[1]));
        const plId = payload.id;

        const res = await axios.get(`http://localhost:5000/api/pl/dashboard/${plId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRatings(res.data.ratings || []);
      } catch (err) {
        console.error('Failed to load ratings:', err);
      }
    };

    fetchRatings();
  }, []);

  return (
    <div>
      <h3>⭐ Ratings</h3>
      <ul>
        {ratings.length > 0 ? (
          ratings.map(r => (
            <li key={r.id}>
              <strong>Score:</strong> {r.score} <br />
              <strong>Comments:</strong> {r.comments || 'No comments'}
            </li>
          ))
        ) : (
          <li>No ratings yet</li>
        )}
      </ul>
    </div>
  );
}

export default Ratings;