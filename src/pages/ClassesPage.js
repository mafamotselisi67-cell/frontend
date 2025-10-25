import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateClassForm from './CreateClassForm';
import EditClassForm from './EditClassForm';

function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  const fetchClasses = () => {
    axios.get('http://localhost:5000/api/classes')
      .then(res => setClasses(res.data))
      .catch(err => console.error('Failed to fetch classes:', err));
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleClassCreated = () => {
    setShowCreateForm(false);
    fetchClasses();
  };

  const handleEdit = (classData) => {
    setEditingClass(classData);
  };

  const handleDelete = async (classId) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await axios.delete(`http://localhost:5000/api/classes/${classId}`);
        fetchClasses();
      } catch (err) {
        console.error('Failed to delete class:', err);
        alert('Error deleting class.');
      }
    }
  };

  const handleUpdated = () => {
    setEditingClass(null);
    fetchClasses();
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>👥 Classes Management</h3>
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? 'Cancel' : '+ Create Class'}
        </button>
      </div>

      {showCreateForm && (
        <CreateClassForm onClassCreated={handleClassCreated} />
      )}

      {editingClass && (
        <EditClassForm classData={editingClass} onUpdated={handleUpdated} />
      )}

      <div className="card">
        <div className="card-header">
          <h5>All Classes</h5>
        </div>
        <div className="card-body">
          {classes.length === 0 ? (
            <p className="text-muted">No classes found. Create your first class above.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Class Name</th>
                    <th>Course</th>
                    <th>Lecturer</th>
                    <th>Students</th>
                    <th>Module</th>
                    <th>Schedule</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map(c => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>{c.course_name}</td>
                      <td>{c.lecturer_name}</td>
                      <td>{c.total_students}</td>
                      <td>{c.module || 'Not set'}</td>
                      <td>{c.schedule || 'Not set'}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(c)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClassesPage;
