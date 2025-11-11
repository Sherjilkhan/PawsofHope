import React, { useState } from 'react';
import { API_BASE } from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const [err, setErr] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await fetch(`${API_BASE}/api/users/login`, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      login(data.user, data.token);
      navigate('/profile');
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <div style={{maxWidth:480}} className="form">
      <h3>Login</h3>
      <form onSubmit={submit}>
        <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <div style={{display:'flex', gap:8}}>
          <button className="btn">Login</button>
          <Link to="/signup" className="btn secondary" style={{display:'inline-flex', alignItems:'center', justifyContent:'center'}}>Signup</Link>
        </div>
        {err && <p className="small" style={{color:'red'}}>{err}</p>}
      </form>
    </div>
  );
}
