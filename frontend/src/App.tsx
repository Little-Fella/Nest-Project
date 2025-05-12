// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <Link style={styles.link} to="/">
            Главная
          </Link>
          <Link style={styles.link} to="/services">
            Услуги
          </Link>
          <Link style={styles.link} to="/appointment">
            Запись
          </Link>
          <Link style={styles.link} to="/login">
            Вход
          </Link>
        </nav>
      </header>

      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

const styles = {
  header: {
    background: "#0088cc",
    padding: "10px",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  main: {
    padding: "20px",
  },
};
