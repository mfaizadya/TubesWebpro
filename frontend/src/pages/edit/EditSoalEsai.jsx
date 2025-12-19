import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditSoalEsai() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [pertanyaan, setPertanyaan] = useState('');
  const [kataKunci, setKataKunci] = useState('');
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchDetailSoal = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3030/api/soal-esai/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await response.json();
        
        if (result.payload?.datas) {
          setPertanyaan(result.payload.datas.text_soal);
          setKataKunci(result.payload.datas.kata_kunci || '');
        }
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Gagal memuat data soal.");
      } finally {
        setLoadingFetch(false);
      }
    };

    if (id) fetchDetailSoal();
  }, [id]);

  const handleUpdate = async () => {
    if (!pertanyaan.trim()) {
      alert('Pertanyaan tidak boleh kosong!');
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3030/api/soal-esai/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          text_soal: pertanyaan,
          kata_kunci: kataKunci
        })
      });

      if (response.ok) {
        alert('Soal Esai berhasil diperbarui!');
        navigate(-1);
      } else {
        const result = await response.json();
        alert(`Gagal: ${result.payload?.message || 'Gagal update'}`);
      }
    } catch {
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loadingFetch) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
        <span className="ms-3">Memuat data soal...</span>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0 rounded-4 mx-auto" style={{ maxWidth: '700px' }}>
        <div className="card-header bg-white border-0 pt-4 px-4 d-flex align-items-center">
          <button className="btn btn-outline-secondary btn-sm rounded-circle me-3" onClick={() => navigate(-1)}>
            ←
          </button>
          <h1 className="h4 mb-0 fw-bold text-success">Edit Soal Esai</h1>
        </div>

        <div className="card-body p-4">
          <div className="mb-3">
            <label className="form-label fw-bold">Pertanyaan</label>
            <textarea
              className="form-control border-2 rounded-3"
              rows="6"
              value={pertanyaan}
              onChange={(e) => setPertanyaan(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Kata Kunci Jawaban</label>
            <input
              type="text"
              className="form-control border-2 rounded-3"
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
            />
          </div>
        </div>

        <div className="card-footer bg-white border-0 pb-4 px-4 d-grid">
          <button
            className="btn btn-success btn-lg rounded-pill fw-bold shadow-sm"
            onClick={handleUpdate}
            disabled={isSaving}
          >
            {isSaving ? 'MEMPERBARUI...' : 'UPDATE SOAL'}
          </button>
        </div>
      </div>
    </div>
  );
}