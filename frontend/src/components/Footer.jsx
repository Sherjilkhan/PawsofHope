import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, EnvelopeFill, GeoAltFill } from 'react-bootstrap-icons'; 

// Note: Ensure you have 'react-router-dom' and 'react-bootstrap-icons' installed:
// npm install react-bootstrap-icons

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Use bg-dark for a classic, professional footer, padding for space, and mt-auto 
    // to push it to the bottom if your layout uses flex-column min-vh-100.
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row g-4">
          
          {/* Column 1: Brand & Mission */}
          <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4">
            <h5 className="text-uppercase fw-bold text-primary mb-3">
              <span className="me-2">🐾</span> PawfectHome
            </h5>
            <p className="small text-white-50">
              Dedicated to uniting loving pets with caring families. Give a companion a forever home.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-3">
              Quick Links
            </h6>
            <p className="mb-2">
              <Link to="/" className="text-white text-decoration-none small">Home</Link>
            </p>
            <p className="mb-2">
              <Link to="/pets" className="text-white text-decoration-none small">Browse Pets</Link>
            </p>
            <p className="mb-2">
              <Link to="/about" className="text-white text-decoration-none small">About Us</Link>
            </p>
            <p className="mb-2">
              <Link to="/admin" className="text-white text-decoration-none small">Admin Login</Link>
            </p>
          </div>

          {/* Column 3: Contact Info */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-3">
              Contact
            </h6>
            <p className="mb-2 small">
              <GeoAltFill className="me-2 text-primary" />
              123 Pet Lane, Adoption City, 10001
            </p>
            <p className="mb-2 small">
              <EnvelopeFill className="me-2 text-primary" />
              info@adoptease.org
            </p>
            <p className="mb-2 small">
              <span className="me-2 text-primary">📞</span>
              + 01 234 567 88
            </p>
          </div>

          {/* Column 4: Social Media */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
            <h6 className="text-uppercase fw-bold mb-3">
              Follow Us
            </h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-white me-2"><Facebook size={24} /></a>
              <a href="#" className="text-white me-2"><Twitter size={24} /></a>
              <a href="#" className="text-white me-2"><Instagram size={24} /></a>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <hr className="mb-4 text-white-50" />

        {/* Copyright Section */}
        <div className="row align-items-center">
          <div className="col-md-8 col-lg-8">
            <p className="text-center text-md-start mb-0 small text-white-50">
              Copyright &copy; {currentYear} AdoptEase. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}