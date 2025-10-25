// import React, { useState } from 'react';
// import { Form, Button, Alert, Card } from 'react-bootstrap';
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext';

// function LecturerReports() {
//   const { user } = useAuth();
//   const [form, setForm] = useState({
//     report: '',
//   });
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');
//     try {
//       // Replace with your backend endpoint for saving reports
//       await axios.post('http://localhost:5000/api/lecturer/reports', {
//         lecturer_id: user.id,
//         report: form.report,
//       });
//       setMessage('Report submitted successfully!');
//       setForm({ report: '' });
//     } catch (err) {
//       setError('Failed to submit report');
//     }
//   };

//   return (
//     <div>
//       <h2>Submit Report</h2>
//       <Card className="mb-4">
//         <Card.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Report</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={4}
//                 name="report"
//                 value={form.report}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter your report here..."
//               />
//             </Form.Group>
//             <Button type="submit" variant="primary">Submit Report</Button>
//           </Form>
//           {message && <Alert variant="success" className="mt-3">{message}</Alert>}
//           {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// export default LecturerReports;
