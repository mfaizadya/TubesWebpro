import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import ListLevel from './pages/ListLevel';
import ReviewAttempt from './pages/ReviewAttempt';
import DetailAttempt from './pages/DetailAttempt';


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

        {/* 4. Review Attempt */}
        <Route path="/review-attempt" element={<ReviewAttempt />} />
        <Route path="/detail-attempt/:id" element={<DetailAttempt />} />
        
      </Routes>
    </Router>
  );
}

export default App;