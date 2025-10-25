// import React from 'react';
// import { Card, Row, Col, Button } from 'react-bootstrap';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const StudentDashboard = () => {
//     const { user } = useAuth();
//     const navigate = useNavigate();

//     return (
//         <div>
//             <h2 className="mb-4">Student Dashboard</h2>
//             <p className="text-muted mb-4">Welcome back, {user?.firstName}! Here's your academic overview.</p>
            
//             <Row>
//                 <Col md={4}>
//                     <Card className="mb-4 shadow-sm border-0">
//                         <Card.Body className="text-center">
//                             <Card.Title>📚 My Classes</Card.Title>
//                             <Card.Text className="text-muted">
//                                 View your enrolled classes, schedules, and course materials
//                             </Card.Text>
//                             <Button variant="primary" onClick={() => navigate('/student/monitoring')}>
//                                 View Classes
//                             </Button>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={4}>
//                     <Card className="mb-4 shadow-sm border-0">
//                         <Card.Body className="text-center">
//                             <Card.Title>📊 Academic Progress</Card.Title>
//                             <Card.Text className="text-muted">
//                                 Monitor your grades, attendance, and academic performance
//                             </Card.Text>
//                             <Button variant="success" onClick={() => navigate('/student/monitoring')}>
//                                 View Progress
//                             </Button>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={4}>
//                     <Card className="mb-4 shadow-sm border-0">
//                         <Card.Body className="text-center">
//                             <Card.Title>⭐ Rate Lecturers</Card.Title>
//                             <Card.Text className="text-muted">
//                                 Provide feedback and ratings for your lecturers and courses
//                             </Card.Text>
//                             <Button variant="warning" onClick={() => navigate('/student/rating')}>
//                                 Give Rating
//                             </Button>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>

//             <Row className="mt-4">
//                 <Col>
//                     <Card className="shadow-sm border-0">
//                         <Card.Body>
//                             <Card.Title>Quick Stats</Card.Title>
//                             <Row>
//                                 <Col md={3} className="text-center">
//                                     <h4 className="text-primary">5</h4>
//                                     <p className="text-muted">Enrolled Courses</p>
//                                 </Col>
//                                 <Col md={3} className="text-center">
//                                     <h4 className="text-success">85%</h4>
//                                     <p className="text-muted">Attendance</p>
//                                 </Col>
//                                 <Col md={3} className="text-center">
//                                     <h4 className="text-info">3.8</h4>
//                                     <p className="text-muted">GPA</p>
//                                 </Col>
//                                 <Col md={3} className="text-center">
//                                     <h4 className="text-warning">12</h4>
//                                     <p className="text-muted">Pending Assignments</p>
//                                 </Col>
//                             </Row>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default StudentDashboard;