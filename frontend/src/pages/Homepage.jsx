import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './styles/HomePage.css';

const Homepage = () => {
  const navigate = useNavigate();

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch("http://localhost:3030/api/sections"); 
        
        if (!response.ok) {
          throw new Error("Gagal mengambil data section dari server.");
        }
        
        const responseJson = await response.json();
        const validData = responseJson?.payload?.datas || [];
        setSections(validData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching sections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSections = sections.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sections.length / itemsPerPage);

  const handleDetailsClick = (sectionId) => {
    navigate(`/sections/${sectionId}`); 
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />

      {/* Main Content */}
      <div className="container">
        <h1>Selamat Datang di Dashboard Admin</h1>
        <p>Kelola section, level, soal, dan review jawaban siswa dengan mudah melalui halaman ini.</p>
        

        <main className="content-body">
          {loading ? (
            <div className="loading-state">Memuat data...</div>
          ) : error ? (
            <div className="error-state">Error: {error}</div>
          ) : (
            <div className="table-wrapper">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Judul Section</th>
                    <th>Jumlah Level</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSections.length > 0 ? (
                    currentSections.map((section, index) => (
                      <tr key={section.id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td className="fw-bold">{section.nama || "Tanpa Judul"}</td>
                        <td>{section.levels ? `${section.levels.length} Level` : "0 Level"}</td>
                        <td>
                          <button
                            className="btn-details"
                            onClick={() => handleDetailsClick(section.id)}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Tidak ada data section tersedia.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="pagination-container">
                <button
                  className="page-btn"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &laquo; Prev
                </button>
                
                <span className="page-info">
                  Halaman {currentPage} dari {totalPages || 1}
                </span>

                <button
                  className="page-btn"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Next &raquo;
                </button>
              </div>
            </div>
          )}
        </main>
    </div>
    </>
  );
}
export default Homepage;