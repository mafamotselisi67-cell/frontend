import React, { useState } from 'react';
import axios from 'axios';

function AssignLecturerForm({ courseId, onAssigned }) {
  const [lecturerId, setLecturerId] = useState('');
  const [module, setModule] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/courses/${courseId}/assign`, {
      lecturer_id: lecturerId,
      module,
    });
    onAssigned();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Lecturer ID" value={lecturerId} onChange={e => setLecturerId(e.target.value)} />
      <input placeholder="Module Name" value={module} onChange={e => setModule(e.target.value)} />
      <button type="submit">Assign</button>
    </form>
  );
}

export default AssignLecturerForm;