// import React from 'react';
// import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
// import { useAuth } from '../../context/AuthContext';

// const PrincipalLecturerDashboard = () => {
//     const { user, logout } = useAuth();

//     return (
//         <Container fluid>
//             <Row>
//                 <Col md={3} className="bg-light vh-100">
//                     <div className="p-3">
//                         <h4>Principal Lecturer Portal</h4>
//                         <p>Welcome, {user?.firstName} {user?.lastName}</p>
//                         <Nav className="flex-column">
//                             <Nav.Link href="#courses">📖 Courses</Nav.Link>
//                             <Nav.Link href="#reports">📋 Reports</Nav.Link>
//                             <Nav.Link href="#monitoring">📊 Monitoring</Nav.Link>
//                             <Nav.Link href="#rating">⭐ Rating</Nav.Link>
//                             <Nav.Link href="#classes">📚 Classes</Nav.Link>
//                             <Nav.Link onClick={logout}>🚪 Logout</Nav.Link>
//                         </Nav>
//                     </div>
//                 </Col>
                
//                 <Col md={9}>
//                     <div className="p-4">
//                         <h2>Principal Lecturer Dashboard</h2>
//                         <Row>
//                             <Col md={4}>
//                                 <Card className="mb-4">
//                                     <Card.Body>
//                                         <Card.Title>Courses</Card.Title>
//                                         <Card.Text>View all courses & lectures under your stream</Card.Text>
//                                         <Button variant="primary">Manage Courses</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col md={4}>
//                                 <Card className="mb-4">
//                                     <Card.Body>
//                                         <Card.Title>Reports</Card.Title>
//                                         <Card.Text>View lecturer reports & add feedback</Card.Text>
//                                         <Button variant="primary">Review Reports</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col md={4}>
//                                 <Card className="mb-4">
//                                     <Card.Body>
//                                         <Card.Title>Monitoring</Card.Title>
//                                         <Card.Text>Monitor academic activities</Card.Text>
//                                         <Button variant="primary">View Monitoring</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                         </Row>
//                     </div>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default PrincipalLecturerDashboard;