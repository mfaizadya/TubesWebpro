import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ListLevel.css';

const ListLevel = () => {
  const navigate = useNavigate();
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3030/levels');
      if (!response.ok) {
        throw new Error('Gagal memuat level');
      }
      const data = await response.json();
      setLevels(data.datas || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddLevel = () => {
    navigate('/add-level');
  };

  const handleEditLevel = (id) => {
    navigate(`/edit-level/${id}`);
  };

  const handleDeleteLevel = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus level ini?')) {
      try {
        const response = await fetch(`http://localhost:3030/levels/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Gagal menghapus level');
        }
        setLevels(levels.filter(level => level.id !== id));
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  const handleViewSoal = (id) => {
    navigate(`/list-soal-pg/${id}`);
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
        <div className="page-header">
          <div>
            <h1>Daftar Level</h1>
            <p>Kelola semua level pembelajaran</p>
          </div>
          <button className="btn-add" onClick={handleAddLevel}>
            + Tambah Level
          </button>
        </div>

        {loading && <p>Memuat data...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && levels.length === 0 && (
          <p>Tidak ada level ditemukan. Silakan tambahkan level baru.</p>
        )}

        {!loading && levels.length > 0 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Level</th>
                  <th>Section</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {levels.map((level, index) => (
                  <tr key={level.id}>
                    <td>{index + 1}</td>
                    <td>{level.nama}</td>
                    <td>{level.sections?.nama || '-'}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="view-btn"
                          onClick={() => handleViewSoal(level.id)}
                        >
                          Lihat Soal
                        </button>
                        <button
                          className="rename-btn"
                          onClick={() => handleEditLevel(level.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteLevel(level.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ListLevel;
