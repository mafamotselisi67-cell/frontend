import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PRLReports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reports');
        setReports(res.data);
      } catch (err) {
        console.error('Failed to fetch reports:', err);
      }
    };
    fetchReports();
  }, []);

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const handleCloseModal = () => {
    setSelectedReport(null);
  };

  return (
    <div className="p-4">
      <h4>📄 Submitted Lecturer Reports</h4>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Lecturer</th>
                <th>Course</th>
                <th>Class</th>
                <th>Topic</th>
                <th>Attendance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, i) => (
                <tr key={i}>
                  <td>{r.date_of_lecture}</td>
                  <td>{r.lecturer_name}</td>
                  <td>{r.course_name}</td>
                  <td>{r.class_name}</td>
                  <td>{r.topic}</td>
                  <td>{r.actual_students}/{r.total_students}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleViewReport(r)}
                    >
                      View Full Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for full report view */}
      {selectedReport && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Full Report Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Basic Information</h6>
                    <p><strong>Faculty:</strong> {selectedReport.faculty_name}</p>
                    <p><strong>Class:</strong> {selectedReport.class_name}</p>
                    <p><strong>Week:</strong> {selectedReport.week}</p>
                    <p><strong>Date of Lecture:</strong> {selectedReport.date_of_lecture}</p>
                    <p><strong>Course:</strong> {selectedReport.course_name}</p>
                    <p><strong>Course Code:</strong> {selectedReport.course_code}</p>
                    <p><strong>Lecturer:</strong> {selectedReport.lecturer_name}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Attendance & Venue</h6>
                    <p><strong>Actual Students:</strong> {selectedReport.actual_students}</p>
                    <p><strong>Total Students:</strong> {selectedReport.total_students}</p>
                    <p><strong>Venue:</strong> {selectedReport.venue}</p>
                    <p><strong>Scheduled Time:</strong> {selectedReport.scheduled_time}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-12">
                    <h6>Lecture Details</h6>
                    <p><strong>Topic:</strong> {selectedReport.topic}</p>
                    <p><strong>Outcomes:</strong> {selectedReport.outcomes}</p>
                    <p><strong>Recommendations:</strong> {selectedReport.recommendations}</p>
                    {selectedReport.content && (
                      <p><strong>Content:</strong> {selectedReport.content}</p>
                    )}
                    {selectedReport.feedback && (
                      <p><strong>Feedback:</strong> {selectedReport.feedback}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {selectedReport && (
        <div className="modal-backdrop show" onClick={handleCloseModal}></div>
      )}
    </div>
  );
}

export default PRLReports;
