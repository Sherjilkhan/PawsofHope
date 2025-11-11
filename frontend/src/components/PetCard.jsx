import React from 'react';
import { Link } from 'react-router-dom';

export default function PetCard({pet, onAdopt}) {
    // Determine the badge style based on adoption status
    const status = pet.adoptionStatus || 'available';
    const badgeClass = 
        status === 'available' ? 'bg-success' : 
        status === 'pending' ? 'bg-warning text-dark' : 
        'bg-danger';

    // Disable the adopt button if the pet is not available
    const isAvailable = status === 'available';

    return (
        // Added h-100 and shadow-sm for consistent height and visual appeal
        <div className="card h-100  shadow-sm border-0 rounded-lg overflow-hidden custom-card-hover" style={{width:"40rem"}}>
            
            {/* Pet Image */}
            <img 
                className="card-img-top" 
                src={pet.image || 'https://via.placeholder.com/400x300?text=Pet+Image'} 
                alt={pet.name} 
                // Set fixed height for uniform look across all cards
                style={{ height: '250px', objectFit: 'cover' }}
            />
            
            {/* Card Body */}
            <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    {/* Pet Name */}
                    <h5 className="card-title text-primary mb-0 fw-bold">{pet.name}</h5>
                    
                    {/* Status Badge */}
                    <span className={`badge ${badgeClass} text-uppercase`}>
                        {status}
                    </span>
                </div>

                {/* Pet Details */}
                <p className="card-text small text-muted mb-3">
                    {pet.breed || 'Unknown Breed'} • {pet.age ? `${pet.age} years old` : 'Age N/A'}
                </p>

                {/* Action Buttons */}
                <div className="mt-auto d-flex gap-2">
                    <Link 
                        className="btn btn-outline-primary btn-sm w-70 " 
                        to={`/pets/${pet._id}`}
                    >
                        View Details
                    </Link>
                    <button 
                        className={`btn btn-sm w-60 ${isAvailable ? 'btn-success' : 'btn-secondary'}`} 
                        onClick={() => onAdopt && onAdopt(pet)}
                        disabled={!isAvailable}
                        title={!isAvailable ? `Adoption is ${status}` : 'Click to start the adoption process'}
                    >
                        {isAvailable ? 'Adopt Me' : 'Unavailable'}
                    </button>
                </div>
            </div>
        </div>
    );
}