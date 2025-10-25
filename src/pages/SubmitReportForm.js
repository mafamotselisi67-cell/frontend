import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubmitReportForm() {
  const [form, setForm] = useState({
    class_id: '',
    faculty_name: '',
    class_name: '',
    week: '',
    date_of_lecture: '',
    course_name: '',
    course_code: '',
    lecturer_name: '',
    actual_students: '',
    total_students: '',
    venue: '',
    scheduled_time: '',
    topic: '',
    outcomes: '',
    recommendations: '',
  });

  const [classes, setClasses] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchClasses = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/classes/lecturer/${userId}`);
          setClasses(res.data);
        } catch (err) {
          console.error('Failed to fetch classes:', err);
        }
      };
      fetchClasses();
    }
  }, [userId]);

  const handleClassSelect = e => {
    const selectedId = e.target.value;
    const selectedClass = classes.find(c => c.id === parseInt(selectedId));
    setForm({
      ...form,
      class_id: selectedId,
      total_students: selectedClass ? selectedClass.student_count : '',
      class_name: selectedClass ? selectedClass.name : '',
      course_name: selectedClass ? selectedClass.course_name : '',
    });
  };

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    const submitted_by = payload.id;

    const reportData = {
      ...form,
      submitted_by,
      actual_students: parseInt(form.actual_students),
      total_students: parseInt(form.total_students),
      class_id: parseInt(form.class_id),
    };

    try {
      await axios.post('http://localhost:5000/api/reports', reportData);
      alert('Report submitted!');
      setForm({
        class_id: '',
        faculty_name: '',
        class_name: '',
        week: '',
        date_of_lecture: '',
        course_name: '',
        course_code: '',
        lecturer_name: '',
        actual_students: '',
        total_students: '',
        venue: '',
        scheduled_time: '',
        topic: '',
        outcomes: '',
        recommendations: '',
      });
    } catch (err) {
      console.error('Report submission failed:', err);
      alert('Error submitting report. Please check your inputs and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light rounded">
      <h4 className="mb-4">📝 Lecturer Report Form</h4>

      <div className="row">
        <div className="col-md-6 mb-3">
          <select
            name="class_id"
            className="form-select"
            value={form.class_id}
            onChange={handleClassSelect}
            required
          >
            <option value="">Select Class</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} - {c.course_name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <input
            name="faculty_name"
            className="form-control"
            placeholder="Faculty Name"
            value={form.faculty_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            name="class_name"
            className="form-control"
            placeholder="Class Name"
            value={form.class_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            name="week"
            className="form-control"
            placeholder="Week of Reporting"
            value={form.week}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            type="date"
            name="date_of_lecture"
            className="form-control"
            value={form.date_of_lecture}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            name="course_name"
            className="form-control"
            placeholder="Course Name"
            value={form.course_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            name="course_code"
            className="form-control"
            placeholder="Course Code"
            value={form.course_code}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            name="lecturer_name"
            className="form-control"
            placeholder="Lecturer’s Name"
            value={form.lecturer_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            type="number"
            name="actual_students"
            className="form-control"
            placeholder="Actual Number of Students Present"
            value={form.actual_students}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            type="number"
            name="total_students"
            className="form-control"
            placeholder="Total Number of Registered Students"
            value={form.total_students}
            readOnly
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            name="venue"
            className="form-control"
            placeholder="Venue of the Class"
            value={form.venue}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <input
            name="scheduled_time"
            className="form-control"
            placeholder="Scheduled Lecture Time"
            value={form.scheduled_time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 mb-3">
          <textarea
            name="topic"
            className="form-control"
            placeholder="Topic Taught"
            value={form.topic}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 mb-3">
          <textarea
            name="outcomes"
            className="form-control"
            placeholder="Learning Outcomes of the Topic"
            value={form.outcomes}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 mb-3">
          <textarea
            name="recommendations"
            className="form-control"
            placeholder="Lecturer’s Recommendations"
            value={form.recommendations}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100">Submit Report</button>
    </form>
  );
}

export default SubmitReportForm;