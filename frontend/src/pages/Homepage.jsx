import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Pastikan path ini sesuai dengan struktur folder Anda
import "./styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- GET DATA SECTION ---
  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      // Ganti URL ini dengan endpoint backend teman Anda
      // Contoh: http://localhost:3000/api/sections
      const response = await axios.get('http://localhost:3030/api/sections');
      
      // Sesuaikan dengan struktur JSON dari backend. 
      // Jika backend mengirim { data: [...] }, gunakan response.data.data
      setSections(response.data.data || response.data); 
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Gagal mengambil data section dari server.");
      setLoading(false);
    }
  };

  // --- HANDLERS ---

  // 1. Fungsi ke Halaman Details
  const handleDetails = (id) => {
    // Navigasi ke route section (walaupun halamannya belum ada)
    navigate(`/section/${id}`);
  };

  // 2. Fungsi Delete Section
  const handleDelete = async (id, name) => {
    // Konfirmasi sebelum hapus (Best Practice UX)
    const isConfirmed = window.confirm(`Apakah Anda yakin ingin menghapus Section "${name}"?`);

    if (isConfirmed) {
      try {
        // Panggil API Delete
        await axios.delete(`http://localhost:3000/api/sections/${id}`);
        
        // Optimistic Update: Hapus dari state tanpa perlu reload halaman
        setSections(sections.filter((section) => section.id !== id));
        
        alert(`Section "${name}" berhasil dihapus.`);
      } catch (err) {
        console.error("Gagal menghapus:", err);
        alert("Gagal menghapus section. Cek koneksi backend.");
      }
    }
  };

  return (
    <>
      <Navbar />

      <main>
        <div className="container">
        <div className="page-header">
          <div>
            <h1>Daftar Section</h1>
            <p>Kelola daftar materi pembelajaran yang tersedia.</p>
          </div>
          {/* Tombol Tambah (Opsional jika diperlukan) */}
          {/* <button className="btn-add"> + Tambah Section </button> */}
        </div>

        {/* Tampilan Loading / Error */}
        {loading && <div className="loading-state">Memuat data...</div>}
        {error && <div className="error-state">{error}</div>}

        {/* Tampilan Tabel */}
        {!loading && !error && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Section</th>
                  <th>Jumlah Level</th> {/* Asumsi ada data jumlah level */}
                  <th style={{ width: '200px' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {sections.length > 0 ? (
                  sections.map((section, index) => (
                    <tr key={section.id}>
                      <td>{index + 1}</td>
                      <td>{section.name || section.judul_section}</td>
                      <td>
                        {/* Cek jika backend mengirim array levels atau count levels */}
                        {section.levels ? section.levels.length : (section.levelCount || 0)} Level
                      </td>
                      <td>
                        <div className="action-buttons">
                          {/* Tombol DETAILS (Biru/Primary) */}
                          <button 
                            className="rename-btn" // Menggunakan style class 'rename-btn' dari CSS lama agar tetap biru
                            onClick={() => handleDetails(section.id)}
                          >
                            Details
                          </button>

                          {/* Tombol DELETE (Merah/Danger) */}
                          <button 
                            className="delete-btn" 
                            onClick={() => handleDelete(section.id, section.name)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                      Belum ada data section.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
        )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
