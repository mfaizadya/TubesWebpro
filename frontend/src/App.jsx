import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pastikan path ini benar & file-nya berekstensi .jsx, BUKAN .html
import HomePage from './pages/Homepage';
// import SectionPage from './pages/SectionPage'; // Nanti di-uncomment jika halaman sudah dibuat teman

// Komponen Placeholder Sementara
const PlaceholderSection = () => (
  <div className="container" style={{textAlign: 'center', marginTop: '50px'}}>
    <h1>Halaman Section</h1>
    <p>Halaman ini sedang dikerjakan oleh tim.</p>
    <a href="/">Kembali ke Home</a>
  </div>
);

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
}

export default App;