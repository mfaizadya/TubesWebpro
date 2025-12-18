import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../pages/styles/HomePage.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const isConfirmed = confirm('Apakah Anda yakin ingin keluar?');
    if (isConfirmed) {
      console.log('Pengguna telah logout.');
      alert('Anda telah berhasil logout.');
      navigate('/'); // Asumsi route '/' adalah login page
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/home" className="brand-link">
          {/* Ganti src dengan path logo Anda jika ada */}
          <img src="/assets/berdiri.png" alt="Logo" className="brand-logo" />
          <span>LogiLearn</span>
        </Link>
      </div>
      
      <div className="nav-right">
        <div className="nav-links">
          <Link to="/ReviewAttempt">Review Attempt</Link>
          <Link to="/ListLevel">List Level</Link>
        </div>
        <button onClick={handleLogout} className="btn-logout">
            Keluar
        </button>
      </div>
    </nav>
  );
};

export default Navbar;