import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import ListLevel from './pages/ListLevel';
import ReviewAttempt from './pages/ReviewAttempt';
import DetailAttempt from './pages/DetailAttempt';
import AddSoalPG from './pages/add/AddSoalPG';
import ListSoalPG from './pages/ListSoalPG';
import DetailSoalPG from './pages/DetailSoalPG';
import AddSoalEsai from './pages/add/AddSoalEsai';
import EditSoalEsai from './pages/edit/EditSoalEsai';


function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* 2. HomePage*/}
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />

        {/* 3. Level */}
        <Route path="/levels" element={<ListLevel />} />

        {/* 5. Soal PG */}
        <Route path="/soals-pg" element={<ListSoalPG />} />
        <Route path="/soals-pg/:id" element={<DetailSoalPG />} />
        <Route path="/add-soal-pg" element={<AddSoalPG />} />

        {/* 6. Soal Essai */}
        <Route path="/add-esai" element={<AddSoalEsai />} />
        <Route path="/edit-esai/:id" element={<EditSoalEsai />} />

        {/* 4. Review Attempt */}
        <Route path="/review-attempt" element={<ReviewAttempt />} />
        <Route path="/detail-attempt/:id" element={<DetailAttempt />} />
      </Routes>
    </Router>
  );
}

export default App;