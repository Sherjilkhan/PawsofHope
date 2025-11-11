import React, { useState } from 'react';
import { API_BASE } from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdoptionForm({ petId, onClose }) {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    reason: ''
  });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/adoptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...form, petId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      setMsg('Adoption request submitted — check your profile for status.');
    } catch (err) {
      setMsg('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <h3>Adoption Form</h3>
      <form onSubmit={submit}>
        <input required className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
        <input className="input" placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} />
        <textarea className="input" placeholder="Reason for adoption" value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} />
        <div style={{display:'flex', gap:8}}>
          <button className="btn" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
          <button className="btn secondary" type="button" onClick={onClose}>Close</button>
        </div>
        {msg && <p className="small" style={{marginTop:8}}>{msg}</p>}
      </form>
    </div>
  );
}
