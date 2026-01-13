import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Web/Home";
import Admin from "./Web/Admin";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-logo">📦 QLKHO</div>
          <div className="nav-links">
            <Link to="/" className="nav-item">🏠 Trang Chủ</Link>
            <Link to="/admin" className="nav-item">🔧 Quản Lý</Link>
          </div>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;