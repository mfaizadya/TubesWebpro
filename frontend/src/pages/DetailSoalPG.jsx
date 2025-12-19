import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './styles/EditSoalPG.css'

export default function DetailSoalPG() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [soal, setSoal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSoal()
  }, [id])

  const fetchSoal = async () => {
    try {
      const response = await fetch(`http://localhost:3030/api/soals-pg/${id}`)
      const data = await response.json()
      if (data.data) {
        setSoal(data.data)
      }
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus soal ini?')) return

    try {
      const response = await fetch(`http://localhost:3030/api/soals-pg/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Soal berhasil dihapus')
        navigate('/soals-pg')
      } else {
        alert('Gagal menghapus soal')
      }
    } catch (err) {
      alert(`Error: ${err.message}`)
    }
  }

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!soal) return <div className="error">Soal tidak ditemukan</div>

  return (
    <div className="page">
      <header className="header">
        <button className="back" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>Detail Soal Pilihan Ganda</h1>
      </header>

      <main className="content">
        <label>Pertanyaan</label>
        <div className="detail-box">
          {soal.text_soal}
        </div>

        <div id="options-container">
          <label>Opsi Jawaban</label>
          <div id="options-list">
            {soal.opsis?.map((o, index) => (
              <div
                key={o.id}
                className={`option-row detail-option ${
                  o.is_correct ? 'correct-answer' : ''
                }`}
              >
                <span className="option-label">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="option-text">{o.text_opsi}</span>
                {o.is_correct && <span className="correct-badge">✓ Benar</span>}
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <button
          className="btn"
          onClick={() => navigate(`/edit-soal-pg/${id}`)}
          style={{ backgroundColor: '#2977ff' }}
        >
          EDIT
        </button>
        <button className="btn" onClick={handleDelete} style={{ backgroundColor: '#dc3545' }}>
          HAPUS
        </button>
      </footer>
    </div>
  )
}
