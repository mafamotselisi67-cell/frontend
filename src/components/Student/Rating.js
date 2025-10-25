// import React, { useState } from 'react';
// import { Card, Form, Button, Row, Col } from 'react-bootstrap';

// const Rating = () => {
//     const [ratings, setRatings] = useState({});

//     const lecturers = [
//         { id: 1, name: 'Dr. Sarah Smith', course: 'Software Engineering' },
//         { id: 2, name: 'Prof. John Davis', course: 'Database Systems' },
//         { id: 3, name: 'Dr. Lisa Wong', course: 'Web Development' },
//     ];

//     const handleRatingChange = (lecturerId, rating) => {
//         setRatings(prev => ({
//             ...prev,
//             [lecturerId]: { ...prev[lecturerId], rating }
//         }));
//     };

//     const handleCommentChange = (lecturerId, comment) => {
//         setRatings(prev => ({
//             ...prev,
//             [lecturerId]: { ...prev[lecturerId], comment }
//         }));
//     };

//     const submitRating = (lecturerId) => {
//         alert(`Rating submitted for lecturer ${lecturerId}`);
//         // Here you would make API call to submit rating
//     };

//     return (
//         <div>
//             <h2 className="mb-4">Rate Your Lecturers</h2>
            
//             {lecturers.map(lecturer => (
//                 <Card key={lecturer.id} className="mb-4 shadow-sm border-0">
//                     <Card.Body>
//                         <Card.Title>{lecturer.name}</Card.Title>
//                         <Card.Subtitle className="mb-3 text-muted">{lecturer.course}</Card.Subtitle>
                        
//                         <Form>
//                             <Row>
//                                 <Col md={6}>
//                                     <Form.Group className="mb-3">
//                                         <Form.Label>Rating (1-5 stars)</Form.Label>
//                                         <Form.Select 
//                                             value={ratings[lecturer.id]?.rating || ''}
//                                             onChange={(e) => handleRatingChange(lecturer.id, e.target.value)}
//                                         >
//                                             <option value="">Select rating</option>
//                                             <option value="1">⭐ - Poor</option>
//                                             <option value="2">⭐⭐ - Fair</option>
//                                             <option value="3">⭐⭐⭐ - Good</option>
//                                             <option value="4">⭐⭐⭐⭐ - Very Good</option>
//                                             <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
//                                         </Form.Select>
//                                     </Form.Group>
//                                 </Col>
//                             </Row>
                            
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Comments</Form.Label>
//                                 <Form.Control 
//                                     as="textarea" 
//                                     rows={3}
//                                     value={ratings[lecturer.id]?.comment || ''}
//                                     onChange={(e) => handleCommentChange(lecturer.id, e.target.value)}
//                                     placeholder="Enter your feedback about this lecturer..."
//                                 />
//                             </Form.Group>
                            
//                             <Button 
//                                 variant="primary"
//                                 onClick={() => submitRating(lecturer.id)}
//                                 disabled={!ratings[lecturer.id]?.rating}
//                             >
//                                 Submit Rating
//                             </Button>
//                         </Form>
//                     </Card.Body>
//                 </Card>
//             ))}
//         </div>
//     );
// };

// export default Rating;