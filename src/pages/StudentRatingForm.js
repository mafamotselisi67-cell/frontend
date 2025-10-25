import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentRatingForm.css';

const criteria = [
  "Lecturer was punctual for class.",
  "Lecturer was well-prepared for class.",
  "Lecturer explained concepts clearly.",
  "Lecturer encouraged student participation.",
  "Lecturer provided useful feedback.",
  "Lecturer was approachable and helpful.",
  "Lecturer used effective teaching methods.",
  "Lecturer covered the syllabus adequately.",
  "Lecturer maintained a positive classroom environment.",
  "Overall, I would recommend this lecturer."
];

function StudentRatingForm() {
  const [form, setForm] = useState({
    lecturer_id: '',
    course_id: '',
    ratings: {},
    comment: '',
  });
  const [lecturers, setLecturers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lecturersRes, coursesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/lecturers'),
          axios.get('http://localhost:5000/api/courses')
        ]);
        setLecturers(lecturersRes.data);
        setCourses(coursesRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRatingChange = (criterionIndex, rating) => {
    setForm({
      ...form,
      ratings: {
        ...form.ratings,
        [criterionIndex]: rating
      }
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    const student_id = payload.id;

    // Check if all criteria are rated
    const ratedCriteria = Object.keys(form.ratings);
    if (ratedCriteria.length !== criteria.length) {
      alert('Please rate all criteria before submitting.');
      return;
    }

    // Calculate average score
    const totalScore = ratedCriteria.reduce((sum, key) => sum + parseInt(form.ratings[key]), 0);
    const averageScore = Math.round(totalScore / criteria.length);

    try {
      await axios.post('http://localhost:5000/api/ratings', {
        rater_id: student_id,
        lecturer_id: parseInt(form.lecturer_id),
        course_id: parseInt(form.course_id),
        score: averageScore,
        comments: form.comment,
      });
      setSuccess('✅ Rating submitted successfully!');
      setForm({ lecturer_id: '', course_id: '', ratings: {}, comment: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to submit rating:', err);
      alert('Error submitting rating.');
    }
  };

  if (loading) {
    return (
      <div className="rating-form-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rating-form-container">
      <h2 className="rating-form-title">Rate Your Lecturer</h2>

      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Select Lecturer</label>
          <select
            name="lecturer_id"
            className="form-select"
            value={form.lecturer_id}
            onChange={handleChange}
            required
          >
            <option value="">Choose a lecturer...</option>
            {lecturers.map(lecturer => (
              <option key={lecturer.id} value={lecturer.id}>
                {lecturer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Select Course</label>
          <select
            name="course_id"
            className="form-select"
            value={form.course_id}
            onChange={handleChange}
            required
          >
            <option value="">Choose a course...</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Rate the following criteria (1-5, where 5 is excellent)</label>
          <table className="rating-table">
            <thead>
              <tr>
                <th className="criteria-header">Criteria</th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion, index) => (
                <tr key={index}>
                  <td className="criteria-cell">{criterion}</td>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <td key={rating}>
                      <input
                        type="radio"
                        name={`rating-${index}`}
                        value={rating}
                        checked={form.ratings[index] === rating.toString()}
                        onChange={() => handleRatingChange(index, rating.toString())}
                        required
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-group">
          <label className="form-label">Comments (Optional)</label>
          <textarea
            name="comment"
            className="form-textarea"
            placeholder="Share your thoughts about this lecturer..."
            value={form.comment}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Rating
        </button>
      </form>
    </div>
  );
}

export default StudentRatingForm;
