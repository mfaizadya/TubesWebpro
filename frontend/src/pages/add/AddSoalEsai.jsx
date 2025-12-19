import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddSoalEsai() {
  const navigate = useNavigate();
  
  const [pertanyaan, setPertanyaan] = useState('');
  const [kataKunci, setKataKunci] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!pertanyaan.trim()) {
      alert('Pertanyaan tidak boleh kosong!');
      return;
    }

    setLoading(true);
    try {
      const levelId = localStorage.getItem('current_level_id') || '1';
      const token = localStorage.getItem('token');

      const payload = {
        id_level: parseInt(levelId),
        text_soal: pertanyaan,
        kata_kunci: kataKunci,
      };

      const response = await fetch('http://localhost:3030/api/soal-esai', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Soal Esai berhasil disimpan!');
        navigate(-1);
      } else {
        alert(`Gagal: ${result.payload?.message || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal menyambung ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-white">
      {/* Background Decor - Membuat kesan tidak kaku */}
      <div 
        className="position-absolute top-0 start-0 w-100" 
        style={{ height: '300px', background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)', zIndex: 0 }}
      ></div>

      {/* Main Content */}
      <div className="container position-relative z-1 my-auto py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-7">
            
            {/* Wrapper Utama dengan Shadow Halus */}
            <div className="bg-white rounded-5 shadow-lg border-0 overflow-hidden p-4 p-md-5" style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
              
              {/* Header Section */}
              <div className="d-flex align-items-center mb-5">
                <button 
                  className="btn btn-light rounded-circle border-0 d-flex align-items-center justify-content-center shadow-sm" 
                  onClick={() => navigate(-1)}
                  style={{ width: '45px', height: '45px', transition: 'all 0.3s ease' }}
                >
                  <span style={{ fontSize: '24px', color: '#0d6efd' }}>←</span>
                </button>
                <h1 className="h3 mb-0 fw-bold ms-3" style={{ color: '#2b3481', letterSpacing: '-0.5px' }}>
                  Tambah Soal Esai
                </h1>
              </div>

              {/* Form Input Pertanyaan */}
              <div className="mb-5">
                <label className="form-label fw-bold mb-3 d-block" style={{ color: '#4a5568', fontSize: '1.1rem' }}>
                  Isi Pertanyaan
                </label>
                <textarea
                  className="form-control border-0 rounded-4 p-4 shadow-sm"
                  rows="6"
                  value={pertanyaan}
                  onChange={(e) => setPertanyaan(e.target.value)}
                  placeholder="Ketikkan pertanyaan soal esai di sini..."
                  style={{ 
                    backgroundColor: '#f8fafc', 
                    fontSize: '1rem', 
                    lineHeight: '1.6',
                    resize: 'none' 
                  }}
                ></textarea>
              </div>

              {/* Form Input Kata Kunci */}
              <div className="mb-2">
                <label className="form-label fw-bold mb-3 d-block" style={{ color: '#4a5568', fontSize: '1.1rem' }}>
                  Kata Kunci Jawaban <span className="text-muted fw-normal">(Opsional)</span>
                </label>
                <input
                  type="text"
                  className="form-control border-0 rounded-pill px-4 py-3 shadow-sm"
                  value={kataKunci}
                  onChange={(e) => setKataKunci(e.target.value)}
                  placeholder="Contoh: Hardware, Software, Sistem"
                  style={{ backgroundColor: '#f8fafc', fontSize: '0.95rem' }}
                />
              </div>
              <p className="text-muted small ms-2 mb-5">
                Membantu admin saat mengoreksi jawaban nantinya.
              </p>

              {/* Action Button */}
              <div className="d-grid pt-2">
                <button
                  className="btn btn-primary btn-lg rounded-pill fw-bold py-3 shadow-md border-0"
                  onClick={handleSave}
                  disabled={loading}
                  style={{ 
                    background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
                    letterSpacing: '1px',
                    fontSize: '1rem'
                  }}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm me-2"></span>
                  ) : 'SIMPAN SOAL'}
                </button>
              </div>

            </div> {/* End Card */}

          </div>
        </div>
      </div>
    </div>
  );
}