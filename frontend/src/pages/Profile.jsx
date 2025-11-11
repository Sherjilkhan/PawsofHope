import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../api';
import { CheckCircleFill, ClockFill, XCircleFill, PersonCircle, BoxArrowRight } from 'react-bootstrap-icons'; // Assuming you install react-bootstrap-icons

export default function Profile(){
  const { user, token, logout } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    
    setLoading(true);
    fetch(`${API_BASE}/api/adoptions/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        setHistory(data);
        setLoading(false);
      })
      .catch(()=>{
        setLoading(false);
      });
  }, [token]);

  const getStatusIndicator = (status) => {
    switch (status) {
      case 'approved':
        return <span className="text-success"><CheckCircleFill className="me-1" /> Approved</span>;
      case 'pending':
        return <span className="text-warning text-dark"><ClockFill className="me-1" /> Pending Review</span>;
      case 'rejected':
        return <span className="text-danger"><XCircleFill className="me-1" /> Rejected</span>;
      default:
        return <span className="text-secondary">{status}</span>;
    }
  };

  return (
    <div className="container my-5">
      
      {/* 1. User Profile Header */}
      <div className="p-4 mb-5 bg-white rounded-3 border shadow-sm">
        <div className="d-flex align-items-center justify-content-between">
            <div className='d-flex align-items-center'>
                <PersonCircle className="text-primary me-3" style={{width: '60px', height: '60px'}}/>
                <div>
                    <h2 className="mb-0 fw-bold">{user?.name || 'User Profile'}</h2>
                    <p className="text-muted mb-0">{user?.email}</p>
                </div>
            </div>
            
            <button className="btn btn-outline-danger d-flex align-items-center" onClick={logout}>
                <BoxArrowRight className="me-2"/> Logout
            </button>
        </div>
      </div>
      
      {/* 2. Adoption History Section */}
      <h3 className="mb-4 pb-2 border-bottom text-dark">Adoption Request History</h3>
      
      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading your requests...</p>
        </div>
      ) : (
        // Using List Group for a cleaner list feel
        <div className="list-group shadow-sm">
          {history.length ? history.map(h => (
            <div key={h._id} className="list-group-item list-group-item-action p-3">
              <div className="d-flex align-items-center">
                {/* Pet Image */}
                <img 
                  src={h.petId?.image || 'https://via.placeholder.com/100x70?text=Pet+Image'} 
                  className="rounded me-3 flex-shrink-0"
                  style={{width: '100px', height: '70px', objectFit: 'cover'}} 
                  alt={h.petId?.name || 'Pet'} 
                />
                
                {/* Request Details */}
                <div className="flex-grow-1">
                  <div className='d-flex justify-content-between align-items-start'>
                    <h5 className="mb-1 fw-bold text-dark">{h.petId?.name || 'Pet Name N/A'}</h5>
                    {/* Status Indicator with Icons */}
                    {getStatusIndicator(h.status)}
                  </div>
                  
                  <div className="d-flex justify-content-between small text-muted">
                    <p className="mb-1">
                       Requested on: {new Date(h.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mb-1 text-truncate ms-3" style={{maxWidth:'300px'}} title={h.reason}>
                       Reason: {h.reason}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="alert alert-info text-center m-3" role="alert">
              You haven't submitted any adoption requests yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}