// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-text">
        <h1 className="mb-4">📊 Placement Insights Dashboard</h1>
        <p className="mb-5">Visualize campus placements, explore interviews, and track stats.</p>

        <div className="d-flex gap-3 justify-content-center">
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>
            🔐 Login
          </button>
          <button className="btn btn-success btn-lg" onClick={() => navigate('/register')}>
            📝 Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
