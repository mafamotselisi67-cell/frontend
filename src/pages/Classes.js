import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Classes() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem('token');
        const payload = JSON.parse(atob(token.split('.')[1]));
        const plId = payload.id;

        const res = await axios.get(`http://localhost:5000/api/pl/dashboard/${plId}`);
        setClasses(res.data.classes || []);
      } catch (err) {
        console.error('Failed to load classes:', err);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <h3>👥 Classes</h3>
      <ul>
        {classes.length > 0 ? (
          classes.map(cls => (
            <li key={cls.id}>
              <strong>Class ID:</strong> {cls.id} <br />
              <strong>Schedule:</strong> {cls.schedule || 'No schedule'}
            </li>
          ))
        ) : (
          <li>No classes found</li>
        )}
      </ul>
    </div>
  );
}

export default Classes;