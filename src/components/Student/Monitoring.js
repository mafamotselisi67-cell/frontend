// import React from 'react';
// import { Card, Table, Badge } from 'react-bootstrap';

// const Monitoring = () => {
//     const courses = [
//         { id: 1, name: 'Software Engineering', code: 'SE101', attendance: '92%', grade: 'A', status: 'Active' },
//         { id: 2, name: 'Database Systems', code: 'DB201', attendance: '88%', grade: 'B+', status: 'Active' },
//         { id: 3, name: 'Web Development', code: 'WD301', attendance: '95%', grade: 'A-', status: 'Active' },
//     ];

//     return (
//         <div>
//             <h2 className="mb-4">Academic Monitoring</h2>
            
//             <Card className="shadow-sm border-0 mb-4">
//                 <Card.Body>
//                     <Card.Title>Enrolled Courses</Card.Title>
//                     <Table responsive>
//                         <thead>
//                             <tr>
//                                 <th>Course Code</th>
//                                 <th>Course Name</th>
//                                 <th>Attendance</th>
//                                 <th>Current Grade</th>
//                                 <th>Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {courses.map(course => (
//                                 <tr key={course.id}>
//                                     <td>{course.code}</td>
//                                     <td>{course.name}</td>
//                                     <td>
//                                         <Badge bg={
//                                             parseInt(course.attendance) > 90 ? 'success' :
//                                             parseInt(course.attendance) > 80 ? 'warning' : 'danger'
//                                         }>
//                                             {course.attendance}
//                                         </Badge>
//                                     </td>
//                                     <td>
//                                         <Badge bg={
//                                             course.grade.includes('A') ? 'success' :
//                                             course.grade.includes('B') ? 'info' : 'warning'
//                                         }>
//                                             {course.grade}
//                                         </Badge>
//                                     </td>
//                                     <td>
//                                         <Badge bg="success">{course.status}</Badge>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </Card.Body>
//             </Card>
//         </div>
//     );
// };

// export default Monitoring;