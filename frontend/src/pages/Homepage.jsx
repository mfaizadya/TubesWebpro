import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HomePage.css';

const Homepage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <a href="/home" className="brand-link">
            <span>LogiLearn</span>
            <img
              src="/src/assets/pose hai.png"
              alt="LogiLearn Mascot"
              className="brand-logo"
            />
          </a>
        </div>

        <div className="nav-right">
          <div className="nav-links">
            <a href="/levels">Level</a>
            <a href="/review-attempt">Review Attempt</a>
          </div>
          <div className="nav-logout">
            <a href="#" onClick={handleLogout} id="logout-btn">
              Keluar
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container">
        <h1>Selamat Datang di Dashboard Admin</h1>
        <p>Kelola level, soal, dan review jawaban siswa dengan mudah melalui halaman ini.</p>
        
        <div className="page-header">
          <div>
            <h2>Fitur Utama</h2>
            <p>Pilih salah satu fitur di atas untuk memulai:</p>
          </div>
        </div>

        <div className="feature-cards">
          <div className="feature-card">
            <h3>📚 Level</h3>
            <p>Kelola level pembelajaran dan soal untuk setiap section.</p>
            <a href="/levels" className="feature-btn">Buka Level</a>
          </div>
          <div className="feature-card">
            <h3>✏️ Review Attempt</h3>
            <p>Review dan nilai jawaban dari semua siswa yang mengerjakan.</p>
            <a href="/review-attempt" className="feature-btn">Buka Review</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;