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
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3030/api/attempts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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

  // Pagination & Search State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Search Logic
  const filteredAttempts = attempts.filter((attempt) =>
    attempt.pelajars?.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attempt.levels?.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attempt.levels?.sections?.nama?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredAttempts.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredAttempts.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold mb-1">Review Attempt</h1>
            <p className="text-muted">Kelola dan tinjau hasil pengerjaan siswa</p>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
          <div className="card-header bg-white py-3 px-4 border-bottom">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold text-primary">Daftar Attempt Terbaru</h5>
              <div style={{ position: 'relative', width: '300px' }}>
                <input
                  type="text"
                  className="form-control bg-light border-0 ps-5 rounded-pill"
                  placeholder="Cari siswa, level..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ paddingRight: '1rem', height: '42px' }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-search text-muted"
                  viewBox="0 0 16 16"
                  style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)' }}
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="px-4 py-3 text-secondary text-uppercase small fw-bold">No</th>
                  <th className="px-4 py-3 text-secondary text-uppercase small fw-bold">Username</th>
                  <th className="px-4 py-3 text-secondary text-uppercase small fw-bold">Level</th>
                  <th className="px-4 py-3 text-secondary text-uppercase small fw-bold">Section</th>
                  <th className="px-4 py-3 text-secondary text-uppercase small fw-bold">Skor</th>
                  <th className="px-4 py-3 text-secondary text-uppercase small fw-bold text-end">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : currentRows.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-muted">
                      {searchTerm ? 'Tidak ada hasil pencarian.' : 'Tidak ada data attempt ditemukan.'}
                    </td>
                  </tr>
                ) : (
                  currentRows.map((attempt, index) => (
                    <tr key={attempt.id}>
                      <td className="px-4">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td className="px-4 fw-bold text-dark">{attempt.pelajars?.username || '-'}</td>
                      <td className="px-4">
                        <span className="badge bg-light text-dark border">
                          {attempt.levels?.nama || '-'}
                        </span>
                      </td>
                      <td className="px-4 text-muted">{attempt.levels?.sections?.nama || '-'}</td>
                      <td className="px-4">
                        <span className={`fw-bold ${attempt.skor >= 75 ? 'text-success' : 'text-danger'}`}>
                          {Number(attempt.skor).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 text-end">
                        <button
                          className="btn btn-sm btn-outline-primary rounded-pill px-3"
                          onClick={() => handleViewDetail(attempt.id)}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="card-footer bg-white border-top py-3 px-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="text-muted small mb-2 mb-md-0">
                Menampilkan {filteredAttempts.length > 0 ? indexOfFirstRow + 1 : 0} - {Math.min(indexOfLastRow, filteredAttempts.length)} dari {filteredAttempts.length} data
              </div>

              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center">
                  <label className="me-2 small text-muted">Baris per halaman:</label>
                  <select
                    className="form-select form-select-sm"
                    style={{ width: '70px' }}
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                  </select>
                </div>

                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link rounded-start-pill" onClick={() => handlePageChange(currentPage - 1)}>
                        &lt;
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button className="page-link rounded-end-pill" onClick={() => handlePageChange(currentPage + 1)}>
                        &gt;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
