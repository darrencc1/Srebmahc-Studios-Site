import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import OurGames from './pages/OurGames';
import FutureGames from './pages/FutureGames';
import FreeGames from './pages/FreeGames';
import Demos from './pages/Demos';

function App() {
  return (
    <Router>
      <div className="app">
        <h1>Srebmahc Studios</h1>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/our-games">Our Games</Link>
          <Link to="/future-games">Future Games</Link>
          <Link to="/free-games">Free Games</Link>
          <Link to="/try-a-game">Demos</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-games" element={<OurGames />} />
          <Route path="/future-games" element={<FutureGames />} />
          <Route path="/free-games" element={<FreeGames />} />
          <Route path="/demos" element={<Demos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

