import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/ReviewAttempt.css';

export default function ReviewAttempt() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3030/api/attempts');
      if (!response.ok) {
        throw new Error(`Gagal memuat attempt: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Response data:', data);
      const attempts = data.payload?.datas || [];
      setAttempts(attempts);
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

  const handleViewDetail = (attemptId) => {
    navigate(`/detail-attempt/${attemptId}`);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Review Attempt</h1>
        <h2>Attempt Terbaru:</h2>

        {loading && <p>Memuat data...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <div id="attemptList">
          {attempts.length === 0 && !loading && (
            <p>Tidak ada attempt ditemukan</p>
          )}

          {attempts.map((attempt) => (
            <div key={attempt.id} className="card">
              <h3>
                {attempt.pelajars?.nama} - {attempt.levels?.nama}
              </h3>
              <p className="small">
                Skor: <strong>{attempt.skor}</strong>
              </p>
              <p className="small">
                Section: {attempt.levels?.sections?.nama}
              </p>
              <button
                className="icon-btn"
                onClick={() => handleViewDetail(attempt.id)}
              >
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
