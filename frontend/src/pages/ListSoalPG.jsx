import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/ListSoalPG.css'

export default function ListSoalPG() {
  const navigate = useNavigate()
  const [soals, setSoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const levelId = localStorage.getItem('current_level_id') || '1'

  useEffect(() => {
    localStorage.setItem('current_level_id', levelId)
    fetchSoals()
  }, [levelId])

  const fetchSoals = async () => {
    try {
      const response = await fetch(`http://localhost:3030/api/soals-pg/level/${levelId}`)
      const data = await response.json()
      if (data.data) {
        setSoals(data.data)
      }
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus soal ini?')) return

    try {
      const response = await fetch(`http://localhost:3030/api/soals-pg/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Soal berhasil dihapus')
        setSoals(soals.filter(s => s.id !== id))
      } else {
        alert('Gagal menghapus soal')
      }
    } catch (err) {
      alert(`Error: ${err.message}`)
    }
  }

  const handleEdit = (id) => {
    navigate(`/edit-soal-pg/${id}`)
  }

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <main className="container">
      <h1>Daftar Soal Pilihan Ganda - Level {levelId}</h1>

      <button className="add-btn" onClick={() => navigate('/add-soal-pg')}>
        + Tambah Soal PG
      </button>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Pertanyaan</th>
              <th>Jumlah Opsi</th>
              <th>Jawaban Benar</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {soals.length > 0 ? (
              soals.map((soal, index) => {
                const jawabanBenar = soal.opsis?.find(o => o.is_correct)
                return (
                  <tr key={soal.id}>
                    <td>{index + 1}</td>
                    <td className="question">{soal.text_soal}</td>
                    <td>{soal.opsis?.length || 0}</td>
                    <td>{jawabanBenar?.text_opsi || '-'}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(soal.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(soal.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  Belum ada soal PG
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
