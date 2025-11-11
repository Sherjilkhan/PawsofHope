import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE } from '../api';
import AdoptionForm from '../components/AdoptionForm';

export default function PetDetails(){
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/pets/${id}`).then(r=>r.json()).then(setPet).catch(()=>{});
  }, [id]);

  if (!pet) return <p>Loading...</p>;

  return (
    <>
      <div className="card" style={{display:'flex',gap:16,flexWrap:'wrap'}}>
        <img src={pet.image || 'https://via.placeholder.com/400x300?text=No+Image'} style={{width:300, height:220, objectFit:'cover'}} alt={pet.name} />
        <div style={{flex:1, minWidth:260}}>
          <h2>{pet.name} <span className="small">({pet.species})</span></h2>
          <p className="small">{pet.breed} • {pet.gender} • {pet.age}</p>
          <p>{pet.description}</p>
          <p className="small">Health: {pet.healthInfo || 'Not specified'}</p>
          <p className="small">Status: {pet.adoptionStatus}</p>
          <div style={{marginTop:8}}>
            <button className="btn" onClick={()=>setShowForm(true)}>Adopt Now</button>
          </div>
        </div>
      </div>

      {showForm && <div style={{marginTop:12}}><AdoptionForm petId={pet._id} onClose={()=>setShowForm(false)} /></div>}
    </>
  );
}
