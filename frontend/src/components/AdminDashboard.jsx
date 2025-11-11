import React, { useEffect, useState } from 'react';
import { API_BASE } from '../api';

// Custom Hook to get admin headers (Logic remains unchanged)
function useAdminHeader(){
  const pw = localStorage.getItem('adminPassword') || '';
  return { 'x-admin-password': pw };
}

export default function AdminDashboard(){
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ 
    name:'', age:'', breed:'', species:'Dog', description:'', 
    gender:'', image:'', adoptionStatus:'available' 
  });
  const headers = useAdminHeader();

  // Load logic remains unchanged
  const load = async () => {
    setLoading(true);
    try {
      const p = await fetch(`${API_BASE}/api/pets`).then(r=>r.json()).catch(()=>[]);
      setPets(p || []);
      await new Promise(resolve => setTimeout(resolve, 300)); 
      const reqs = await fetch(`${API_BASE}/api/adoptions`, { headers }).then(r=>r.ok ? r.json() : []).catch(()=>[]);
      setRequests(reqs || []);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // Submission, Delete, Edit, ClearForm, Logout logic remains unchanged

  const submit = async (e) => {
    // ... (Submit logic remains the same)
    e.preventDefault();
    try {
      const url = editing ? `${API_BASE}/api/pets/${editing}` : `${API_BASE}/api/pets`;
      const method = editing ? 'PUT' : 'POST';

      const res = await fetch(url, { 
        method, 
        headers:{...headers,'Content-Type':'application/json'}, 
        body: JSON.stringify(form) 
      });

      if (!res.ok) throw new Error(`Server returned status: ${res.status}`);

      setForm({ name:'', age:'', breed:'', species:'Dog', description:'', gender:'', image:'', adoptionStatus:'available' });
      setEditing(null);
      load();
    } catch (err) { alert(`Error saving pet: ${err.message}`); }
  };

  const del = async (id) => {
    // ... (Delete logic remains the same)
    if (!window.confirm('Are you sure you want to delete this pet? This action cannot be undone.')) return;
    try {
        const res = await fetch(`${API_BASE}/api/pets/${id}`, { method:'DELETE', headers });
        if (!res.ok) throw new Error(`Server returned status: ${res.status}`);
        load();
    } catch (err) { alert(`Error deleting pet: ${err.message}`); }
  };

  const startEdit = (p) => {
    // ... (Edit logic remains the same)
    setEditing(p._id);
    setForm({
      name:p.name||'', age:p.age||'', breed:p.breed||'', species:p.species||'Dog',
      description:p.description||'', gender:p.gender||'', image:p.image||'', adoptionStatus:p.adoptionStatus||'available'
    });
  };

  const clearForm = () => {
    // ... (Clear form logic remains the same)
    setEditing(null); 
    setForm({ name:'', age:'', breed:'', species:'Dog', description:'', gender:'', image:'', adoptionStatus:'available' });
  };

  const logout = () => {
    // ... (Logout logic remains the same)
    localStorage.removeItem('adminPassword');
    window.location.replace('/'); 
  };
  
  // --- Custom Styles for Modern Aesthetic ---
  const styles = {
    primaryBlue: '#0f4c75', // Deep Blue
    secondaryAccent: '#3282b8', // Lighter Blue
    lightBg: '#f7f9fc', // Soft Background
    cardBorder: '1px solid #e1e4e8',
    // New: Stats colors
    statsGreen: '#28a745',
    statsYellow: '#ffc107',
    statsBlue: '#007bff',
  };

  // --- Calculated Stats for the Dashboard Cards ---
  const availablePets = pets.filter(p => p.adoptionStatus === 'available').length;
  const pendingPets = pets.filter(p => p.adoptionStatus === 'pending').length;

  // Helper function for status badges in the list
  const getStatusIndicator = (status) => {
    switch (status) {
      case 'available': return <span className="text-success me-1">●</span>;
      case 'pending': return <span className="text-warning me-1">●</span>;
      case 'adopted': return <span className="text-danger me-1">●</span>;
      default: return null;
    }
  };

  // Helper function for status badges in the inventory
  const getInventoryBadgeClass = (status) => {
    switch (status) {
      case 'available': return 'bg-success';
      case 'pending': return 'bg-warning text-dark';
      case 'adopted': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };


  return (
    <div className="container py-5">
      
      {/* 🚀 Dashboard Header & Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <h1 className="fw-bold" style={{ color: styles.primaryBlue }}>
          Adoption Center Management
        </h1>
        <div>
          <button className="btn btn-sm me-2" onClick={load} disabled={loading} style={{backgroundColor: styles.lightBg, borderColor: styles.cardBorder}}>
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
          <button className="btn btn-sm btn-danger" onClick={logout}>Logout</button>
        </div>
      </div>
      
      {/* --- Section 0: Stats Overview Cards --- */}
      <div className="row g-4 mb-5">
        
        {/* Total Pets Card */}
        <div className="col-md-4">
            <div className="p-3 shadow-sm rounded-3 h-100" style={{ backgroundColor: styles.lightBg, borderLeft: `5px solid ${styles.statsBlue}` }}>
                <h6 className="text-uppercase text-muted mb-1 small fw-bold">Total Pets</h6>
                <div className="d-flex justify-content-between align-items-end">
                    <h2 className="fw-bold mb-0" style={{ color: styles.statsBlue }}>{pets.length}</h2>
                    {loading && <div className="spinner-border spinner-border-sm text-secondary" role="status"></div>}
                </div>
            </div>
        </div>

        {/* Available Pets Card */}
        <div className="col-md-4">
            <div className="p-3 shadow-sm rounded-3 h-100" style={{ backgroundColor: styles.lightBg, borderLeft: `5px solid ${styles.statsGreen}` }}>
                <h6 className="text-uppercase text-muted mb-1 small fw-bold">Available for Adoption</h6>
                <h2 className="fw-bold mb-0" style={{ color: styles.statsGreen }}>{availablePets}</h2>
            </div>
        </div>

        {/* Pending Requests Card */}
        <div className="col-md-4">
            <div className="p-3 shadow-sm rounded-3 h-100" style={{ backgroundColor: styles.lightBg, borderLeft: `5px solid ${styles.statsYellow}` }}>
                <h6 className="text-uppercase text-muted mb-1 small fw-bold">Pending Adoption Requests</h6>
                <h2 className="fw-bold mb-0" style={{ color: styles.statsYellow }}>{requests.length}</h2>
            </div>
        </div>
      </div>


      {/* --- Section 1: Form and Requests --- */}
      <div className='row g-5 mb-5'> 
        
        {/* 📝 Pet Add/Edit Form (Column 1) */}
        <div className="col-lg-5">
          <div className="card shadow-lg border-0 h-100"> {/* Removed inline background color, relying on card style */}
            <div className="card-body p-4">
              <h4 className="fw-bold text-center mb-4 pb-2 border-bottom" style={{ color: styles.primaryBlue }}>
                {editing ? 'Edit Pet Record' : 'Create New Pet Listing'}
              </h4>
              <form onSubmit={submit}>
                
                <div className="mb-3">
                  <label className="form-label small text-muted">Pet Name *</label>
                  <input className="form-control" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
                </div>

                <div className="row g-3"> 
                    <div className="col-md-6">
                      <label className="form-label small text-muted">Age (Years)</label>
                      <input className="form-control" type="number" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small text-muted">Breed</label>
                      <input className="form-control" value={form.breed} onChange={e=>setForm({...form,breed:e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small text-muted">Species</label>
                        <select className="form-select" value={form.species} onChange={e=>setForm({...form,species:e.target.value})}>
                            <option value="Dog">Dog</option><option value="Cat">Cat</option><option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small text-muted">Gender</label>
                      <input className="form-control" value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} />
                    </div>
                </div>

                <div className="mb-3 mt-3">
                    <label className="form-label small text-muted">Image URL</label>
                    <input className="form-control" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} />
                </div>

                <div className="mb-3">
                    <label className="form-label small text-muted">Description</label>
                    <textarea className="form-control" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows="3"></textarea>
                </div>
                
                {/* Status Selector */}
                <div className="mb-4 pt-2 border-top">
                  <label className="form-label small text-muted">Adoption Status</label>
                  <select className="form-select" value={form.adoptionStatus} onChange={e=>setForm({...form,adoptionStatus:e.target.value})}>
                      <option value="available">Available</option>
                      <option value="pending">Pending</option>
                      <option value="adopted">Adopted</option>
                  </select>
                </div>
                
                {/* Action Buttons */}
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                  <button className="btn btn-primary btn-lg" style={{backgroundColor: styles.primaryBlue, borderColor: styles.primaryBlue}} type="submit" disabled={loading}>
                    {editing ? 'SAVE CHANGES' : 'ADD NEW PET'}
                  </button>
                  {editing && (
                      <button className="btn btn-outline-secondary btn-lg" type="button" onClick={clearForm}>
                        Cancel Edit
                      </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* 📬 Adoption Requests (Column 2) */}
        <div className="col-lg-7">
          <div className="card shadow-lg border-0 h-100" style={{ backgroundColor: styles.lightBg }}> {/* Added background for contrast */}
            <div className="card-body p-4">
              <h4 className="fw-bold mb-3 pb-2 border-bottom" style={{ color: styles.primaryBlue }}>
                Pending Requests ({requests.length})
              </h4>
              <div className="list-group list-group-flush" style={{maxHeight:'600px', overflowY:'auto'}}>
                {loading && requests.length === 0 ? (
                    <p className="text-center text-muted py-5">Loading requests...</p>
                ) : requests.length ? requests.map(r => (
                  <div key={r._id} className="list-group-item list-group-item-action py-3 px-2 border-bottom">
                    <div className="d-flex w-100 justify-content-between align-items-center">
                      <h6 className="mb-0 fw-semibold" style={{ color: styles.secondaryAccent }}>{r.name}</h6>
                      <span className="badge bg-light text-secondary">
                          Pet: {r.petId?.name || 'Unknown Pet'}
                      </span>
                    </div>
                    <p className="mb-1 small text-muted text-truncate pt-1">
                      {r.reason}
                    </p>
                    <small className="text-muted">
                      {r.email} | {r.phone}
                    </small>
                  </div>
                )) : (
                    <div className="alert alert-success text-center mt-3" role="alert">
                        🎉 No pending requests!
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 🐾 Section 2: Pet Inventory */}
      <h3 className="mb-4 pb-2 border-bottom fw-bold" style={{ color: styles.primaryBlue }}>
        Pet Inventory ({pets.length})
      </h3>

      {loading && pets.length === 0 ? (
          <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
          </div>
      ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            {pets.map(p => (
              <div className="col" key={p._id}>
                <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                  
                  {/* Image Area */}
                  <div style={{height: '180px', overflow: 'hidden'}}>
                    <img 
                      src={p.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
                      className="card-img-top w-100 h-100" 
                      alt={p.name} 
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Card Body */}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold" style={{ color: styles.primaryBlue }}>
                      {getStatusIndicator(p.adoptionStatus)}
                      {p.name}
                    </h5>
                    <p className="card-text small text-muted mb-2">
                        {p.breed} • {p.species} • {p.age} years
                    </p>
                    {/* Status Badge - Used helper function for class */}
                    <span className={`badge mb-3 align-self-start ${getInventoryBadgeClass(p.adoptionStatus)}`}>
                        {p.adoptionStatus.charAt(0).toUpperCase() + p.adoptionStatus.slice(1)}
                    </span>
                    
                    {/* Actions - Pushed to the bottom */}
                    <div className="mt-auto d-flex justify-content-between pt-2 border-top">
                      <button className="btn btn-sm btn-outline-primary w-50 me-2" onClick={() => startEdit(p)}>Edit</button>
                      <button className="btn btn-sm btn-outline-danger w-50" onClick={() => del(p._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      )}
    </div>
  );
}