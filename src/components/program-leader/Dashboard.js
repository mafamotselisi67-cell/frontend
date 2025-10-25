// import React from 'react';
// import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
// import { useAuth } from '../../context/AuthContext';

// const ProgramLeaderDashboard = () => {
//     const { user, logout } = useAuth();

//     return (
//         <Container fluid>
//             <Row>
//                 <Col md={3} className="bg-light vh-100">
//                     <div className="p-3">
//                         <h4>Program Leader Portal</h4>
//                         <p>Welcome, {user?.firstName} {user?.lastName}</p>
//                         <Nav className="flex-column">
//                             <Nav.Link href="#courses">📖 Courses</Nav.Link>
//                             <Nav.Link href="#reports">📋 Reports</Nav.Link>
//                             <Nav.Link href="#monitoring">📊 Monitoring</Nav.Link>
//                             <Nav.Link href="#classes">📚 Classes</Nav.Link>
//                             <Nav.Link href="#lectures">👨‍🏫 Lectures</Nav.Link>
//                             <Nav.Link href="#rating">⭐ Rating</Nav.Link>
//                             <Nav.Link onClick={logout}>🚪 Logout</Nav.Link>
//                         </Nav>
//                     </div>
//                 </Col>
                
//                 <Col md={9}>
//                     <div className="p-4">
//                         <h2>Program Leader Dashboard</h2>
//                         <Row>
//                             <Col md={4}>
//                                 <Card className="mb-4">
//                                     <Card.Body>
//                                         <Card.Title>Courses</Card.Title>
//                                         <Card.Text>Add & assign lecturer modules</Card.Text>
//                                         <Button variant="primary">Manage Courses</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col md={4}>
//                                 <Card className="mb-4">
//                                     <Card.Body>
//                                         <Card.Title>Reports</Card.Title>
//                                         <Card.Text>View reports from Principal Lecturers</Card.Text>
//                                         <Button variant="primary">View Reports</Button>
//                                     </Card.Body>
//                                 </Card>
//                             </Col>
//                             <Col md={4}>
//                                 <Card className="mb-4">
//                                     <Card.Body>
//                                         <Card.Title>Lecturers</Card.Title>
//                                         <Card.Text>Manage lecturer assignments</Card.Text>
//                                         <Button variant="primary">Manage Lecturers</Button>
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

// export default ProgramLeaderDashboard;