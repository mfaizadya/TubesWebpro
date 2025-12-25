import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditSoalEsai() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [pertanyaan, setPertanyaan] = useState('');
  const [kataKunci, setKataKunci] = useState('');
  const [levelId, setLevelId] = useState('');
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

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
          setLevelId(result.payload.datas.id_level);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoadingFetch(false);
      }
    };

    if (id) fetchDetailSoal();
  }, [id]);

  const handleUpdate = async () => {
    setError('');
    if (!pertanyaan.trim()) {
      setError('Pertanyaan wajib diisi.');
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
        navigate(`/list-soal/${levelId}`, { state: { message: "Soal berhasil diubah!" }});
      } else {
        const result = await response.json();
        setError(result.payload?.message || 'Gagal memperbarui soal.');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const interStyle = { fontFamily: "'Inter', sans-serif" };

  if (loadingFetch) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center" style={interStyle}>
        <div className="spinner-border text-warning" role="status"></div>
        <span className="ms-3 fw-medium">Memuat data soal...</span>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3 overflow-hidden" 
         style={{ ...interStyle, backgroundColor: '#f8fafc' }}>
      
      <div className="card border-0 shadow-sm rounded-4 w-100" style={{ maxWidth: '750px' }}>
        <div className="card-body p-4 p-md-5">
          
          <div className="d-flex align-items-center mb-4">
            <div 
              className="bg-warning bg-opacity-10 d-flex align-items-center justify-content-center rounded-4 me-3" 
              style={{ width: '50px', height: '50px' }}
            >
              <i className="bi bi-pencil-square text-warning fs-4"></i>
            </div>
            <div>
              <h1 className="h4 fw-bold mb-1" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>
                Ubah Soal Esai
              </h1>
              <p className="text-muted small mb-0">Ubah pertanyaan esai</p>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary text-uppercase mb-2" 
                   style={{ letterSpacing: '0.05em', fontSize: '11px' }}>
              PERTANYAAN
            </label>
            <textarea
              className={`form-control border-light rounded-3 p-3 ${error && !pertanyaan ? 'is-invalid' : ''}`}
              rows="3" 
              value={pertanyaan}
              onChange={(e) => {
                setPertanyaan(e.target.value);
                if(error) setError('');
              }}
              placeholder="Masukkan soal esai"
              style={{ 
                ...interStyle,
                backgroundColor: '#f1f5f9', 
                border: '1px solid #e2e8f0', 
                resize: 'vertical',
                minHeight: '100px',
                maxHeight: '180px'
              }}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold small text-secondary text-uppercase mb-2" 
                   style={{ letterSpacing: '0.05em', fontSize: '11px' }}>
              KATA KUNCI JAWABAN
            </label>
            <textarea
              className="form-control border-light rounded-3 p-3"
              rows="3"
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              placeholder="Masukkan kata kunci jawaban"
              style={{ 
                ...interStyle,
                backgroundColor: '#f1f5f9', 
                border: '1px solid #e2e8f0', 
                resize: 'vertical',
                minHeight: '100px',
                maxHeight: '180px'
              }}
            ></textarea>
          </div>

          {error && <div className="alert alert-danger py-2 small border-0 mb-4">{error}</div>}

          <div className="d-flex justify-content-end gap-2 mt-2">
            <button 
              type="button" 
              className="btn btn-light px-4 py-2 fw-semibold rounded-3 border-0"
              onClick={() => navigate(-1)}
              style={{ ...interStyle, backgroundColor: '#f8fafc', color: '#0f172a', fontSize: '14px' }}
            >
              Batal
            </button>
            <button
              className="btn btn-warning px-4 py-2 fw-semibold rounded-3 shadow-sm border-0 text-white"
              onClick={handleUpdate}
              disabled={isSaving}
              style={{ 
                ...interStyle, 
                minWidth: '160px', 
                backgroundColor: '#ffc107', 
                fontSize: '14px' 
              }}
            >
              {isSaving ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : 'Ubah Soal'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}