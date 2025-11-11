import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Using diverse icons: HouseHeart for Brand, PersonVcard for Profile, Key for Login, PlusCircle for Signup
import { HouseHeart, PersonVcard, Key, PlusCircle, BoxArrowRight, Cpu, Search } from 'react-bootstrap-icons';

export default function Navbar(){
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // --- Custom Colors for Enhanced Branding ---
  const brandColors = {
    primaryColor: '#0f4c75', // Deep Blue/Teal (Matching Admin Dashboard primary)
    accentColor: '#3282b8', // Lighter Blue (Highlight/CTA secondary)
    bgWhite: '#ffffff',
  };

  const navStyles = {
    linkStyle: {
      color: brandColors.primaryColor,
      fontWeight: '600', // Semi-bold for main links
      padding: '0.5rem 1rem',
      borderRadius: '0.3rem',
      transition: 'all 0.2s',
      '&:hover': {
        backgroundColor: brandColors.lightBg,
        color: brandColors.primaryColor,
      }
    },
    // Primary CTA Button Style (e.g., Logged-in Profile/Signup)
    btnPrimaryStyle: {
      backgroundColor: brandColors.accentColor,
      borderColor: brandColors.accentColor,
      color: brandColors.bgWhite,
    },
    // Outline Button Style
    btnOutlineStyle: {
      borderColor: brandColors.accentColor,
      color: brandColors.accentColor,
    }
  };


  return (
    // Increased vertical padding, slightly less shadow for a 'lighter' bar
    <nav className="navbar navbar-expand-lg sticky-top py-3" style={{ backgroundColor: brandColors.bgWhite, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)' }}>
      <div className="container-fluid container">
        
        {/* 🐾 Brand/Logo - Stronger Branding */}
        <Link to="/" className="navbar-brand d-flex align-items-center fw-bolder" style={{ color: brandColors.primaryColor }}>
          <HouseHeart className="me-2" size={28} />
          <span className="fs-5">Paws of Hope</span>
        </Link>
        
        {/* Toggler button for mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          
          {/* Left Navigation Links - Now visually stronger */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* Added Search icon to improve UX for the pet browsing action */}
              <Link 
                to="/pets" 
                className="nav-link d-flex align-items-center me-2" 
                style={navStyles.linkStyle}
              >
                <Search className="me-1" size={16} /> Browse Pets
              </Link>
            </li>
          </ul>

          {/* Right Section: Auth and Admin Links - More distinct buttons */}
          <ul className="navbar-nav d-flex align-items-center">
            
            {user ? (
              // User Logged In
              <>
                {/* Profile Link - Highlighted with Primary Color */}
                <li className="nav-item me-2">
                  <Link 
                    to="/profile" 
                    className="btn btn-sm d-flex align-items-center fw-semibold" 
                    style={navStyles.btnPrimaryStyle}
                  >
                    <PersonVcard className="me-1" />
                    {user.name.split(' ')[0]} {/* Show only first name for conciseness */}
                  </Link>
                </li>
                {/* Logout Button - Clean outline with brand color */}
                <li className="nav-item me-3">
                  <button 
                    className="btn btn-sm d-flex align-items-center fw-semibold" 
                    onClick={handleLogout}
                    style={navStyles.btnOutlineStyle}
                  >
                    <BoxArrowRight className="me-1" /> Logout
                  </button>
                </li>
              </>
            ) : (
              // User Logged Out
              <>
                {/* Login - Outline style */}
                <li className="nav-item me-2">
                  <Link 
                    to="/login" 
                    className="btn btn-sm d-flex align-items-center fw-semibold"
                    style={navStyles.btnOutlineStyle}
                  >
                    <Key className="me-2" /> Login
                  </Link>
                </li>
                {/* Signup - Solid Primary CTA style */}
                <li className="nav-item me-3">
                  <Link 
                    to="/signup" 
                    className="btn btn-sm d-flex align-items-center fw-semibold"
                    style={navStyles.btnPrimaryStyle}
                  >
                    <PlusCircle className="me-1" /> Sign Up
                  </Link>
                </li>
              </>
            )}
            
            {/* Admin Link - Visually secondary, separated by a line */}
            <li className="nav-item border-start ps-3 ms-3 border-secondary-subtle">
              <Link 
                to="/admin/login" 
                className="nav-link text-secondary small d-flex align-items-center"
              >
                <Cpu className="me-1" size={14} /> Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}