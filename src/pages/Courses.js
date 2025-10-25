import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddCourseForm from './AddCourseForm';

function Courses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    const plId = payload.id;

    const res = await axios.get(`http://localhost:5000/api/courses/pl/${plId}`);
    setCourses(res.data);
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:5000/api/courses/${id}`);
    fetchCourses();
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <h3>📚 Courses</h3>
      <AddCourseForm onCourseAdded={fetchCourses} />
      <ul>
        {courses.map(c => (
          <li key={c.id}>
            <strong>{c.title}</strong> — {c.stream}
            <button onClick={() => handleDelete(c.id)}>Delete</button>
            {/* Add Edit and Assign buttons here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;