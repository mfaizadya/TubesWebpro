import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./styles/ListLevel.css";

const LevelPage = () => {
  const navigate = useNavigate();

  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [sections, setSections] = useState([]);
  const [newLevelName, setNewLevelName] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("");

  const handleDeleteClick = (level) => {
    setSelectedLevel(level);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedLevel) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3030/api/levels/${selectedLevel.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseJson = await response.json();

      if (responseJson?.payload?.statusCode !== 200) {
        throw new Error(responseJson.payload.message);
      }

      setLevels((prev) =>
        prev.filter((level) => level.id !== selectedLevel.id)
      );

      setShowDeleteModal(false);
      setSelectedLevel(null);
      alert(responseJson.payload.message);
    } catch (err) {
      alert(`Gagal menghapus level: ${err.message}`);
    }
  };

  const fetchLevels = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:3030/api/levels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseJson = await response.json();

      if (responseJson?.payload?.statusCode !== 200) {
        throw new Error(responseJson.payload.message);
      }

      setLevels(responseJson.payload.datas || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLevel = async () => {
    if (!newLevelName || !selectedSectionId) {
      alert("Nama level dan section wajib diisi");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3030/api/levels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nama: newLevelName,
          idSection: selectedSectionId,
        }),
      });

      const responseJson = await response.json();

      if (responseJson?.payload?.statusCode !== 200) {
        throw new Error(responseJson.payload.message);
      }

      await fetchLevels();

      setShowAddModal(false);
      setNewLevelName("");
      setSelectedSectionId("");

      alert("Level berhasil ditambahkan");
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchLevels();
    const fetchSections = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:3030/api/sections", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseJson = await response.json();

        if (responseJson?.payload?.statusCode !== 200) {
          throw new Error(responseJson.payload.message);
        }

        setSections(responseJson.payload.datas || []);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchLevels();
    fetchSections();
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="row mb-4 align-items-center">
          <div className="col d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold mb-1">Daftar Level</h1>
              <p className="text-muted mb-0">Kelola data level</p>
            </div>

            <button
              className="btn btn-success rounded-pill px-4"
              onClick={() => setShowAddModal(true)}
            >
              + Tambah Level
            </button>
          </div>
        </div>

        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-0">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light text-uppercase small">
                <tr>
                  <th className="px-4 py-3">No</th>
                  <th className="px-4 py-3">Nama Level</th>
                  <th className="px-4 py-3">Section</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      <div className="spinner-border text-primary" />
                    </td>
                  </tr>
                )}

                {error && !loading && (
                  <tr>
                    <td colSpan="4" className="text-center text-danger py-4">
                      {error}
                    </td>
                  </tr>
                )}

                {!loading && !error && levels.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      Belum ada level
                    </td>
                  </tr>
                )}

                {!loading &&
                  !error &&
                  levels.map((level, index) => (
                    <tr key={level.id}>
                      <td className="px-4">{index + 1}</td>
                      <td className="px-4 fw-semibold">{level.nama}</td>
                      <td className="px-4">{level.sections?.nama || "-"}</td>
                      <td className="px-4 text-center">
                        <div className="d-flex gap-2 justify-content-center">
                          <button className="btn btn-sm btn-outline-primary rounded-pill px-3">
                          Detil
                        </button>
                        <button className="btn btn-sm btn-outline-warning rounded-pill px-3">
                          Ubah
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger rounded-pill px-3"
                          onClick={() => handleDeleteClick(level)}
                        >
                          Hapus
                        </button>
                        </div>
                        
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <>
          <div className="modal-backdrop show"></div>

          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Hapus Level</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowDeleteModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  Apakah anda yakin ingin menghapus level{" "}
                  <strong>{selectedLevel?.nama}</strong>?
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-outline-secondary rounded-pill"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    className="btn btn-danger rounded-pill"
                    onClick={handleConfirmDelete}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showAddModal && (
        <>
          <div className="modal-backdrop show"></div>

          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content rounded-4">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Tambah Level</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowAddModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Nama Level</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Masukkan nama level"
                      value={newLevelName}
                      onChange={(e) => setNewLevelName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Section</label>
                    <select
                      className="form-select"
                      value={selectedSectionId}
                      onChange={(e) => setSelectedSectionId(e.target.value)}
                    >
                      <label htmlFor=""></label>
                      <option value="">--Pilih Section--</option>
                      {sections.map((section) => (
                        <option key={section.id} value={section.id}>
                          {section.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-outline-secondary rounded-pill"
                    onClick={() => setShowAddModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    className="btn btn-success rounded-pill"
                    onClick={handleAddLevel}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LevelPage;
