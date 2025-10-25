// import React from 'react';
// import { Container, Row, Col, Nav } from 'react-bootstrap';
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const PrincipalLecturerLayout = () => {
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     const isActive = (path) => {
//         return location.pathname.includes(path) ? 'active' : '';
//     };

//     return (
//         <Container fluid>
//             <Row>
//                 <Col md={3} className="bg-dark text-white min-vh-100 p-0">
//                     <div className="p-3">
//                         <h4 className="text-warning">Principal Lecturer Portal</h4>
//                         <p className="text-light">Welcome, {user?.firstName} {user?.lastName}</p>
//                     </div>
//                     <Nav className="flex-column">
//                         <Nav.Link 
//                             className={`text-white p-3 ${isActive('dashboard') ? 'bg-primary' : ''}`}
//                             onClick={() => navigate('/principal-lecturer/dashboard')}
//                         >
//                             📊 Dashboard
//                         </Nav.Link>
//                         <Nav.Link 
//                             className={`text-white p-3 ${isActive('courses') ? 'bg-primary' : ''}`}
//                             onClick={() => navigate('/principal-lecturer/courses')}
//                         >
//                             📖 Courses
//                         </Nav.Link>
//                         <Nav.Link 
//                             className={`text-white p-3 ${isActive('reports') ? 'bg-primary' : ''}`}
//                             onClick={() => navigate('/principal-lecturer/reports')}
//                         >
//                             📋 Reports
//                         </Nav.Link>
//                         <Nav.Link 
//                             className={`text-white p-3 ${isActive('monitoring') ? 'bg-primary' : ''}`}
//                             onClick={() => navigate('/principal-lecturer/monitoring')}
//                         >
//                             📈 Monitoring
//                         </Nav.Link>
//                         <Nav.Link 
//                             className={`text-white p-3 ${isActive('rating') ? 'bg-primary' : ''}`}
//                             onClick={() => navigate('/principal-lecturer/rating')}
//                         >
//                             ⭐ Rating
//                         </Nav.Link>
//                         <Nav.Link 
//                             className={`text-white p-3 ${isActive('classes') ? 'bg-primary' : ''}`}
//                             onClick={() => navigate('/principal-lecturer/classes')}
//                         >
//                             📚 Classes
//                         </Nav.Link>
//                         <Nav.Link 
//                             className="text-white p-3"
//                             onClick={handleLogout}
//                         >
//                             🚪 Logout
//                         </Nav.Link>
//                     </Nav>
//                 </Col>
                
//                 <Col md={9} className="p-4">
//                     <Outlet />
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default PrincipalLecturerLayout;