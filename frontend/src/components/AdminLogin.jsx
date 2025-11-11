import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockFill, BoxArrowInRight } from 'react-bootstrap-icons'; // Assuming you install react-bootstrap-icons

export default function AdminLogin(){
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!pw) return setErr('Please enter the admin password.');
    
    // NOTE: For a real application, you would use fetch() here to authenticate against your API.
    // Since this is a simple front-end example using localStorage:
    localStorage.setItem('adminPassword', pw);
    navigate('/admin/dashboard');
  };

  return (
    // Centering the form card horizontally and vertically on the screen
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      
      {/* Login Card */}
      <div className="card shadow-lg p-4" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="card-body">
            <div className="text-center mb-4">
                <LockFill className="text-primary mb-2" size={32} />
                <h3 className="card-title fw-bold">Admin Portal Login</h3>
            </div>
            
            <form onSubmit={submit}>
                {/* Password Input */}
                <div className="mb-3">
                    <label htmlFor="admin-password" className="form-label visually-hidden">Admin Password</label>
                    <input 
                        id="admin-password"
                        className="form-control form-control-lg" 
                        type="password" 
                        value={pw} 
                        onChange={e => { setPw(e.target.value); setErr(''); }} 
                        placeholder="Enter secure password"
                        // Added validation feedback class for error state
                        aria-describedby="passwordHelp"
                    />
                </div>
                
                {/* Error Message */}
                {err && (
                    <div className="alert alert-danger p-2 small" role="alert">
                        {err}
                    </div>
                )}

                {/* Login Button */}
                <div className="d-grid mb-3">
                    <button className="btn btn-primary btn-lg d-flex align-items-center justify-content-center" type="submit">
                        <BoxArrowInRight className="me-2" /> Login
                    </button>
                </div>
                
                {/* Default Password Hint (Using text-muted for subtle hint) */}
                <p className="text-center small text-muted mt-3">
                    Hint: Use <code>admin123</code> to access the dashboard.
                </p>
            </form>
        </div>
      </div>
    </div>
  );
}