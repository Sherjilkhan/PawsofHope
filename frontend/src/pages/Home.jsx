import React, { useEffect, useState } from 'react';
import { API_BASE } from '../api';
import PetCard from '../components/PetCard';
import { Link } from 'react-router-dom';

// --- COLOR PALETTE DEFINITIONS ---
// Primary Color: Deep Teal/Navy (e.g., #006978)
// Accent Color: Soft Coral/Orange (e.g., #FF7766)
// Background: Soft Off-White/Light Gray (e.g., #f7f9fb)

export default function Home(){
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/pets?limit=6`)
      .then(r => r.json())
      .then(data => {
        setFeatured(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const customStyles = {
    // New Hero Background - Simple, spacious, and slightly off-white
    heroBg: {
      backgroundColor: '#f7f9fb', 
      padding: '6rem 0 8rem', // Extra vertical padding
    },
    primaryColor: {
      color: '#006978',
    },
    accentColor: {
      color: '#FF7766',
    },
    btnPrimary: {
      backgroundColor: '#FF7766', // Accent color for the primary CTA
      borderColor: '#FF7766',
      color: '#ffffff',
      letterSpacing: '0.05em',
      transition: 'all 0.3s ease',
      // For hover effects, you would use a separate CSS file or utility classes
    },
    // Stylized image container
    imageWrapper: {
        position: 'relative',
        height: '250px',
        width: '100%',
        margin: '0 auto',
        borderRadius: '1rem',
        overflow: 'hidden',
    },
    // Asymmetrical image effect
    heroImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 40%', // Crop slightly lower to show the pet's face
      transform: 'scale(1.05) rotate(-2deg)', // Subtle tilt and scale
      filter: 'brightness(95%)', // Slight filter for aesthetic
    },
    // Small decorative element
    decoration: {
        position: 'absolute',
        bottom: '-15px',
        right: '-15px',
        height: '60px',
        width: '60px',
        backgroundColor: '#006978', // Deep Teal
        borderRadius: '1rem',
        zIndex: 1,
    }
  };

  return (
    <div className="container-fluid p-0">
      
      {/* 🌟 New Minimalist Hero Section 🌟 */}
      <div style={customStyles.heroBg}>
        <div className="container text-center">
            
            {/* Image Placeholder/Styling - Small and centered */}
          

            {/* Text Content - Minimalist and centered */}
            <h1 className="display-2 fw-bolder mb-3" style={{ color: '#343a40' }}>
              Your <span style={customStyles.accentColor}>Future Companion</span> Awaits
            </h1>
            <p className="fs-5 text-muted col-10 col-md-8 col-lg-7 mx-auto mb-5">
              Open your heart and home to a pet in need. Browse our featured animals looking for their perfect family today.
            </p>
            
            {/* Call-to-Action Button */}
            <Link 
              to="/pets" 
              className="btn btn-lg shadow-lg text-uppercase fw-bold" 
              role="button"
              style={customStyles.btnPrimary}
            >
              Start the Adoption Journey
            </Link>
            
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container py-5">
        <hr className="my-5" />

        {/* 🌟 Featured Pets Section (Unchanged from previous versions) 🌟 */}
        <h2 className="text-center display-5 fw-bold mb-5" style={customStyles.primaryColor}>
          <span style={customStyles.accentColor}>★</span> Featured Companions
        </h2>
        
        {loading ? (
          <div className="text-center my-5 py-5">
            <div className="spinner-grow" style={customStyles.primaryColor} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted fs-5">Fetching your wonderful pets...</p>
          </div>
        ) : (
          <div className="row g-5 justify-content-center"> 
            {featured.length ? (
              featured.slice(0, 6).map(p => (
                <div key={p._id} className="col-12 col-sm-6 col-md-6 col-lg-4 d-flex align-items-stretch">
                  <PetCard pet={p} />
                </div>
              ))
            ) : (
              <p className="col-12 text-center text-muted fs-5 py-5">
                No featured pets available right now. Check back soon!
              </p>
            )}
          </div>
        )}

        {/* Footer Call-to-Action for 'View All' */}
        <div className="text-center mt-5 pt-4">
          <Link 
            to="/pets" 
            className="btn btn-outline-secondary btn-lg" 
            role="button"
            style={{borderColor: customStyles.primaryColor.color, color: customStyles.primaryColor.color}}
          >
            View All &gt;
          </Link>
        </div>
        
      </div>
    </div>
  );
}