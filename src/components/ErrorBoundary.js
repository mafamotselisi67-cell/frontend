// import React from 'react';

// class ErrorBoundary extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { hasError: false };
//     }

//     static getDerivedStateFromError(error) {
//         return { hasError: true };
//     }

//     componentDidCatch(error, errorInfo) {
//         console.error('Error caught by boundary:', error, errorInfo);
//     }

//     render() {
//         if (this.state.hasError) {
//             return (
//                 <div className="container mt-5">
//                     <div className="alert alert-danger">
//                         <h2>Something went wrong.</h2>
//                         <p>Please refresh the page or try again later.</p>
//                     </div>
//                 </div>
//             );
//         }

//         return this.props.children;
//     }
// }

// export default ErrorBoundary;