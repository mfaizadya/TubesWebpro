import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './styles/ListLevel.css';

const LevelPage= () => {
  const navigate = useNavigate()

  const [levels, setLevels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null) 

  useEffect(() => {
    const fetchLevels = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        navigate("/login")
        return
      }

      try {
        const response = await fetch("http://localhost:3030/api/levels", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })

        const responseJson = await response.json()

        if (responseJson?.payload?.statusCode !== 200){
          throw new Error(`Gagal memuat data level: ${responseJson.payload.message}`)
        }

        
        const levelData = responseJson?.payload?.datas || []
        setLevels(levelData)

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchLevels()
  }, [navigate])

  if (loading) {
    return (
      <>
        <Navbar/>
        <div className='container'>
          Memuat data level...
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar/>
        <div className='container'>
          {error}
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar/>
      <div className='container'>
        <h1>Daftar Level</h1>

        <table className='custom-table'>
          <thead>
            <tr>
              <th>NO</th>
              <th>Nama Level</th>
              <th>Section</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            { levels.length > 0 ? (
              levels.map((level, index) => (
                <tr key={level.id} >
                  <td>{index+1}</td>
                  <td className='fw-bold'>{level.nama}</td>
                  <td>{level.sections?.nama || "-"}</td>
                  <td>
                    <button className='btn-detail'>Detail</button>
                    <button className="btn-update">Update</button>
                    <button className="btn-delete">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className='text-center'>
                  Belum ada level
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default LevelPage