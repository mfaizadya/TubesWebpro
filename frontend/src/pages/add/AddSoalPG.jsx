import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddSoalPG() {
  const navigate = useNavigate();

  const [pertanyaan, setPertanyaan] = useState('');
  const [opsi, setOpsi] = useState([
    { text_opsi: '', is_correct: false },
    { text_opsi: '', is_correct: false }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpsiChange = (index, value) => {
    const newOpsi = [...opsi];
    newOpsi[index].text_opsi = value;
    setOpsi(newOpsi);
    if (error) setError('');
  };

  const handleCorrectAnswerChange = (index) => {
    const newOpsi = opsi.map((o, i) => ({
      ...o,
      is_correct: i === index
    }));
    setOpsi(newOpsi);
    if (error) setError('');
  };

  const handleAddOpsi = () => {
    setOpsi([...opsi, { text_opsi: '', is_correct: false }]);
  };

  const handleRemoveOpsi = (index) => {
    if (opsi.length > 2) {
      setOpsi(opsi.filter((_, i) => i !== index));
    } else {
      setError('Minimal harus ada 2 opsi jawaban.');
    }
  };

  const handleSave = async () => {
    setError('');

    if (!pertanyaan.trim()) {
      setError('Pertanyaan wajib diisi.');
      return;
    }

    if (opsi.some(o => !o.text_opsi.trim())) {
      setError('Semua opsi jawaban harus diisi.');
      return;
    }

    if (!opsi.some(o => o.is_correct)) {
      setError('Pilih salah satu jawaban yang benar.');
      return;
    }

    setLoading(true);
    try {
      const levelId = localStorage.getItem('current_level_id') || '1';
      const token = localStorage.getItem('token');

      const payload = {
        id_level: parseInt(levelId),
        text_soal: pertanyaan,
        opsi
      };

      const response = await fetch('http://localhost:3030/api/soals-pg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        navigate(`/list-soal/${levelId}`, { state: { message: "Soal berhasil ditambahkan!" } });
      } else {
        setError(data.message || 'Gagal menyimpan soal.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const interStyle = { fontFamily: "'Inter', sans-serif" };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3 overflow-hidden"
      style={{ ...interStyle, backgroundColor: '#f8fafc' }}>

      <div className="card border-0 shadow-sm rounded-4 w-100" style={{ maxWidth: '750px' }}>
        <div className="card-body p-4 p-md-5">

          <div className="d-flex align-items-center mb-4">
            <div
              className="bg-primary bg-opacity-10 d-flex align-items-center justify-content-center rounded-4 me-3"
              style={{ width: '50px', height: '50px' }}
            >
              <i className="bi bi-list-check text-primary fs-4"></i>
            </div>
            <div>
              <h1 className="h4 fw-bold mb-1" style={{ color: '#0f172a', letterSpacing: '-0.02em' }}>
                Tambah Soal Pilihan Ganda
              </h1>
              <p className="text-muted small mb-0">Buat pertanyaan pilihan ganda untuk ujian Anda</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold small text-secondary text-uppercase mb-2"
              style={{ letterSpacing: '0.05em', fontSize: '11px' }}>
              PERTANYAAN
            </label>
            <textarea
              className={`form-control border-light rounded-3 p-3 ${error && !pertanyaan.trim() ? 'is-invalid' : ''}`}
              rows="3"
              value={pertanyaan}
              onChange={(e) => {
                setPertanyaan(e.target.value);
                if (error) setError('');
              }}
              placeholder="Masukkan pertanyaan soal..."
              style={{
                ...interStyle,
                backgroundColor: '#f1f5f9',
                border: '1px solid #e2e8f0',
                resize: 'vertical',
                minHeight: '100px'
              }}
            ></textarea>
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <label className="form-label fw-bold small text-secondary text-uppercase mb-0"
                style={{ letterSpacing: '0.05em', fontSize: '11px' }}>
                OPSI JAWABAN
              </label>
              <button
                type="button"
                className="btn btn-sm btn-link text-decoration-none fw-semibold"
                onClick={handleAddOpsi}
                style={{ fontSize: '12px' }}
              >
                + Tambah Opsi
              </button>
            </div>

            <div className="d-flex flex-column gap-3">
              {opsi.map((o, index) => (
                <div key={index} className="d-flex align-items-center gap-2">
                  <div className="flex-grow-1 position-relative">
                    <span
                      className="position-absolute top-50 start-0 translate-middle-y ms-3 fw-bold text-muted"
                      style={{ fontSize: '12px' }}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <input
                      type="text"
                      className="form-control border-light rounded-3 py-2 ps-5" // ps-5 to make room for the label A/B/C
                      placeholder={`Masukkan teks opsi ${String.fromCharCode(65 + index)}`}
                      value={o.text_opsi}
                      onChange={(e) => handleOpsiChange(index, e.target.value)}
                      style={{
                        ...interStyle,
                        backgroundColor: '#f1f5f9',
                        border: '1px solid #e2e8f0',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div className="form-check d-flex align-items-center mb-0" style={{ minWidth: '120px' }}>
                    <input
                      className="form-check-input me-2"
                      type="radio"
                      name="correct-answer"
                      id={`correct-${index}`}
                      checked={o.is_correct}
                      onChange={() => handleCorrectAnswerChange(index)}
                      style={{ cursor: 'pointer' }}
                    />
                    <label
                      className={`form-check-label small fw-medium ${o.is_correct ? 'text-success' : 'text-muted'}`}
                      htmlFor={`correct-${index}`}
                      style={{ cursor: 'pointer', fontSize: '13px' }}
                    >
                      {o.is_correct ? 'Jawaban Benar' : 'Benar?'}
                    </label>
                  </div>

                  {opsi.length > 2 && (
                    <button
                      type="button"
                      className="btn btn-light text-danger btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                      onClick={() => handleRemoveOpsi(index)}
                      style={{ width: '32px', height: '32px', backgroundColor: '#fee2e2' }}
                      title="Hapus Opsi"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small border-0 mb-4 rounded-3 d-flex align-items-center">
              <i className="bi bi-exclamation-circle-fill me-2"></i>
              {error}
            </div>
          )}

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
              className="btn btn-primary px-4 py-2 fw-semibold rounded-3 shadow-sm border-0"
              onClick={handleSave}
              disabled={loading}
              style={{
                ...interStyle,
                minWidth: '160px',
                backgroundColor: '#0d6efd',
                fontSize: '14px'
              }}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : 'Simpan Soal'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
