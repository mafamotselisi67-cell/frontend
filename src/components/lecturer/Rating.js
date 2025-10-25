// import React, { useEffect, useState } from 'react';
// import { Table, Spinner, Alert } from 'react-bootstrap';
// import { useAuth } from '../../context/AuthContext';
// import axios from 'axios';

// function LecturerRating() {
//   const { user } = useAuth();
//   const [ratings, setRatings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchRatings() {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/lecturer/ratings/${user.id}`);
//         setRatings(res.data.ratings);
//       } catch (err) {
//         setError('Failed to fetch ratings');
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (user?.id) fetchRatings();
//   }, [user]);

//   return (
//     <div>
//       <h2>Student Ratings</h2>
//       {loading && <Spinner animation="border" />}
//       {error && <Alert variant="danger">{error}</Alert>}
//       {!loading && !error && (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Student</th>
//               <th>Rating</th>
//               <th>Feedback</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {ratings.map((r, idx) => (
//               <tr key={r.id}>
//                 <td>{idx + 1}</td>
//                 <td>{r.student_first_name} {r.student_last_name}</td>
//                 <td>{r.rating}</td>
//                 <td>{r.feedback}</td>
//                 <td>{new Date(r.created_at).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </div>
//   );
// }

// export default LecturerRating;
