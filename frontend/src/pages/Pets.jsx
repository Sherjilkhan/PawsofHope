import React, { useEffect, useState } from 'react';
import { API_BASE } from '../api';
import PetCard from '../components/PetCard';
import AdoptionForm from '../components/AdoptionForm';
import { Search, ChevronDown, Filter } from 'react-bootstrap-icons'; // Assuming use of icons

export default function Pets(){
  const [pets, setPets] = useState([]);
  const [species, setSpecies] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [adoptingPet, setAdoptingPet] = useState(null);

  const load = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (species) params.append('species', species);
    if (search) params.append('search', search);
    
    try {
      const res = await fetch(`${API_BASE}/api/pets?${params.toString()}`);
      const data = await res.json();
      setPets(data.filter(p => p.adoptionStatus === 'available')); // Optionally filter only available pets
    } catch (error) {
      console.error("Failed to load pets:", error);
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  // 1. Automatically load data when species or search changes
  useEffect(() => { 
    // Add a small debounce here if performance is an issue with fast typing
    const handler = setTimeout(() => {
        load();
    }, 300); // Debounce search input by 300ms

    return () => {
        clearTimeout(handler);
    };
  }, [species, search]);


  // Handler for successful adoption submission (optional, but good UX)
  const handleAdoptionSuccess = () => {
    setAdoptingPet(null);
    load(); // Reload pets list to update status
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 pb-2 border-bottom text-dark fw-bold">Find Your Perfect Companion</h2>
      
      {/* Search and Filter Bar */}
      <div className="row mb-4 g-3 align-items-center bg-light p-3 rounded-3 shadow-sm">
        
        {/* Search Input */}
        <div className="col-md-7">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0"><Search /></span>
            <input 
              type="text"
              className="form-control border-start-0" 
              placeholder="Search by name or breed..." 
              value={search} 
              onChange={e=>setSearch(e.target.value)} 
            />
          </div>
        </div>
        
        {/* Species Filter */}
        <div className="col-md-5">
          <div className="input-group">
            <label className="input-group-text bg-white" htmlFor="species-filter"><Filter /></label>
            <select 
              id="species-filter"
              className="form-select" 
              value={species} 
              onChange={e=>setSpecies(e.target.value)}
            >
              <option value="">All Species</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        {/* NOTE: Removed the explicit "Search" button as the effect handles loading */}
      </div>

      {/* Pet Cards Grid */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Searching for pets...</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {pets.length ? (
            pets.map(p => (
              <div key={p._id} className="col d-flex align-items-stretch">
                <PetCard pet={p} onAdopt={() => setAdoptingPet(p)} />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-warning text-center" role="alert">
                No pets match your criteria. Try widening your search!
              </div>
            </div>
          )}
        </div>
      )}

      {/* Adoption Form (Modal Style Recommended) */}
      {adoptingPet && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Adopt {adoptingPet.name}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setAdoptingPet(null)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p className="small text-muted">Fill out the form below to submit your adoption request for **{adoptingPet.name}**.</p>
                <AdoptionForm 
                    petId={adoptingPet._id} 
                    onClose={handleAdoptionSuccess} 
                    // Pass a simple close handler to AdoptionForm to close the modal
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}