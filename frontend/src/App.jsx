import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ListSoalPG from './pages/ListSoalPG'
import AddSoalPG from './pages/add/AddSoalPG'
import EditSoalPG from './pages/edit/EditSoalPG'
import DetailSoalPG from './pages/DetailSoalPG'
import './pages/styles/EditSoalPG.css'
import './pages/styles/ListSoalPG.css'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/soals-pg" replace />} />
        <Route path="/soals-pg" element={<ListSoalPG />} />
        <Route path="/add-soal-pg" element={<AddSoalPG />} />
        <Route path="/edit-soal-pg/:id" element={<EditSoalPG />} />
        <Route path="/soal-pg/:id" element={<DetailSoalPG />} />
      </Routes>
    </Router>
  )
}

export default App
