import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Route dinamis untuk menangkap ID Section */}
        <Route path="/section/:id" element={<PlaceholderSection />} />
      </Routes>
    </Router>
  );
    <Router>
      <Routes>
        {/* 1. Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* 2. HomePage*/}
        <Route path="/homepage" element={<Homepage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
export default App;