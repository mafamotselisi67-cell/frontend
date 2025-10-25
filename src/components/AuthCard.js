import React from 'react';

function AuthCard({ title, children }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
         style={{
           backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDX7KXfvYvdJeiPqqSo13m0_ycpMQkzIdI0z8Lf7OXfDGlCZTtJkGL_s0Nv8r9NnIRk2A&usqp=CAU)',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
           minHeight: '100vh',
           position: 'relative'
         }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1
      }}></div>
      <div
        className="card shadow-lg"
        style={{
          width: '1000px',
          height: '650px',
          maxWidth: '95%',
          borderRadius: '20px',
          border: 'none',
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          padding: '3rem',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src="https://studybest.com/upload/images/DB4/230px-LUCT_worldwide_2009.jpg"
            alt="LUCT Logo"
            style={{
              width: '200px',
              height: 'auto',
              borderRadius: '15px',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
              transition: 'transform 0.3s ease'
            }}
          />
        </div>

        <h2 className="text-center mb-3 fw-bold"
            style={{
              color: '#2c3e50',
              fontSize: '2.2rem',
              letterSpacing: '1px'
            }}>
          {title}
        </h2>
        <h6 className="text-center mb-5"
            style={{
              color: '#7f8c8d',
              fontSize: '1.1rem',
              fontWeight: '500',
              letterSpacing: '0.5px'
            }}>
          Faculty of Information Communication Technology
        </h6>

        {children}
      </div>
    </div>
  );
}

export default AuthCard;
