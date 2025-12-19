import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ReviewAttempt.css';

export default function DetailAttempt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAttemptDetail();
  }, [id]);

  const fetchAttemptDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3030/attempts/${id}`);
      if (!response.ok) {
        throw new Error(`Gagal memuat detail attempt: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Detail attempt data:', data);
      const attemptData = data.payload?.datas;
      setAttempt(attemptData);
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

  const handleBack = () => {
    navigate('/review-attempt');
  };

  if (loading) {
    return (
      <>
        <nav className="navbar">
          <div className="nav-brand">
            <a href="/home" className="brand-link">
              <img
                src="/src/assets/berdiri depan.png"
                alt="Mascot"
                className="brand-logo"
              />
              <span>LogiLearn</span>
            </a>
          </div>

          <div className="nav-right">
            <div className="nav-links">
              <a href="/levels">Level</a>
              <a href="/review-attempt">Review Attempt</a>
            </div>
            <div className="nav-logout">
              <a href="#" onClick={handleLogout}>
                Keluar
              </a>
            </div>
          </div>
        </nav>

        <div className="container">
          <p>Memuat data...</p>
        </div>
      </>
    );
  }

  if (error || !attempt) {
    return (
      <>
        <nav className="navbar">
          <div className="nav-brand">
            <a href="/home" className="brand-link">
              <img
                src="/src/assets/berdiri depan.png"
                alt="Mascot"
                className="brand-logo"
              />
              <span>LogiLearn</span>
            </a>
          </div>

          <div className="nav-right">
            <div className="nav-links">
              <a href="/levels">Level</a>
              <a href="/review-attempt">Review Attempt</a>
            </div>
            <div className="nav-logout">
              <a href="#" onClick={handleLogout}>
                Keluar
              </a>
            </div>
          </div>
        </nav>

        <div className="container">
          <p style={{ color: 'red' }}>Error: {error}</p>
          <button onClick={handleBack}>⬅ Kembali</button>
        </div>
      </>
    );
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">
          <a href="/home" className="brand-link">
            <img
              src="/src/assets/berdiri depan.png"
              alt="Mascot"
              className="brand-logo"
            />
            <span>LogiLearn</span>
          </a>
        </div>

        <div className="nav-right">
          <div className="nav-links">
            <a href="/levels">Level</a>
            <a href="/review-attempt">Review Attempt</a>
          </div>
          <div className="nav-logout">
            <a href="#" onClick={handleLogout}>
              Keluar
            </a>
          </div>
        </div>
      </nav>

      <div className="container">
        <h1>Detail Attempt</h1>

        <div id="attemptDetail">
          <div className="card">
            <h3>Informasi Attempt</h3>
            <p>
              <strong>Pelajar:</strong> {attempt.pelajars?.nama}
            </p>
            <p>
              <strong>Level:</strong> {attempt.levels?.nama}
            </p>
            <p>
              <strong>Section:</strong> {attempt.levels?.sections?.nama}
            </p>
            <p>
              <strong>Skor:</strong> {attempt.skor}
            </p>
          </div>

          {attempt.jawaban_pgs && attempt.jawaban_pgs.length > 0 && (
            <div className="card">
              <h3>Jawaban Pilihan Ganda</h3>
              {attempt.jawaban_pgs.map((jawaban, index) => (
                <div key={jawaban.id} style={{ marginBottom: '1rem' }}>
                  <p>
                    <strong>Soal {index + 1}:</strong> {jawaban.opsis?.soals?.text_soal}
                  </p>
                  <p>
                    <strong>Jawaban:</strong> {jawaban.opsis?.text_opsi}
                  </p>
                  <p>
                    <strong>Benar:</strong>{' '}
                    {jawaban.opsis?.is_correct ? '✓ Benar' : '✗ Salah'}
                  </p>
                </div>
              ))}
            </div>
          )}

          {attempt.jawaban_esais && attempt.jawaban_esais.length > 0 && (
            <div className="card">
              <h3>Jawaban Esai</h3>
              {attempt.jawaban_esais.map((jawaban, index) => (
                <div key={jawaban.id} style={{ marginBottom: '1rem' }}>
                  <p>
                    <strong>Soal {index + 1}:</strong> {jawaban.soals?.text_soal}
                  </p>
                  <p>
                    <strong>Jawaban:</strong> {jawaban.text_jawaban}
                  </p>
                  {jawaban.admins && (
                    <p>
                      <strong>Dinilai oleh:</strong> {jawaban.admins.nama}
                    </p>
                  )}
                  {jawaban.feedback && (
                    <p>
                      <strong>Feedback:</strong> {jawaban.feedback}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={handleBack}>⬅ Kembali</button>
      </div>
    </>
  );
}
