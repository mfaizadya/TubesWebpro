import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/EditSoalPG.css'

export default function AddSoalPG() {
  const navigate = useNavigate()
  const [pertanyaan, setPertanyaan] = useState('')
  const [opsi, setOpsi] = useState([
    { text_opsi: '', is_correct: false },
    { text_opsi: '', is_correct: false }
  ])
  const [loading, setLoading] = useState(false)

  const handleOpsiChange = (index, value) => {
    const newOpsi = [...opsi]
    newOpsi[index].text_opsi = value
    setOpsi(newOpsi)
  }

  const handleCorrectAnswerChange = (index) => {
    const newOpsi = opsi.map((o, i) => ({
      ...o,
      is_correct: i === index
    }))
    setOpsi(newOpsi)
  }

  const handleAddOpsi = () => {
    setOpsi([...opsi, { text_opsi: '', is_correct: false }])
  }

  const handleRemoveOpsi = (index) => {
    if (opsi.length > 2) {
      setOpsi(opsi.filter((_, i) => i !== index))
    } else {
      alert('Minimal harus ada 2 opsi jawaban')
    }
  }

  const handleSave = async () => {
    if (!pertanyaan.trim()) {
      alert('Pertanyaan tidak boleh kosong')
      return
    }

    if (opsi.some(o => !o.text_opsi.trim())) {
      alert('Semua opsi harus diisi')
      return
    }

    if (!opsi.some(o => o.is_correct)) {
      alert('Pilih salah satu jawaban yang benar')
      return
    }

    setLoading(true)
    try {
      const levelId = localStorage.getItem('current_level_id') || '1'
      
      const payload = {
        id_level: parseInt(levelId),
        text_soal: pertanyaan,
        opsi
      }

      console.log('Sending payload:', payload)

      const response = await fetch('http://localhost:3030/soals-pg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      console.log('Response:', data)

      if (response.ok) {
        alert('Soal berhasil ditambahkan')
        navigate('/soals-pg')
      } else {
        alert(`Error: ${data.message || 'Gagal menyimpan soal'}`)
      }
    } catch (err) {
      console.error('Error:', err)
      alert(`Gagal menyimpan: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <header className="header">
        <button className="back" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1>Tambah Soal Pilihan Ganda</h1>
      </header>

      <main className="content">
        <label>Pertanyaan</label>
        <textarea
          className="input-box"
          rows="4"
          value={pertanyaan}
          onChange={(e) => setPertanyaan(e.target.value)}
          placeholder="Masukkan pertanyaan soal..."
        ></textarea>

        <div id="options-container">
          <label>Opsi Jawaban</label>
          <div id="options-list">
            {opsi.map((o, index) => (
              <div key={index} className="option-row">
                <input
                  type="text"
                  className="option-input"
                  placeholder={`Opsi ${String.fromCharCode(65 + index)}`}
                  value={o.text_opsi}
                  onChange={(e) => handleOpsiChange(index, e.target.value)}
                />
                <label className="radio-label">
                  <input
                    type="radio"
                    name="correct-answer"
                    checked={o.is_correct}
                    onChange={() => handleCorrectAnswerChange(index)}
                  />
                  Jawaban Benar
                </label>
                {opsi.length > 2 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveOpsi(index)}
                  >
                    Hapus
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" id="add-option" className="btn" onClick={handleAddOpsi}>
            Tambah Opsi
          </button>
        </div>
      </main>

      <footer className="footer">
        <button
          className="btn"
          id="save-btn"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'MENYIMPAN...' : 'SIMPAN'}
        </button>
      </footer>
    </div>
  )
}
