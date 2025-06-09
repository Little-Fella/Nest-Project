import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import reportWebVitals from "./reportWebVitals";
import { Header } from "./components/header/Header";
import UserProfilePage from "./components/profile/profilePage";
import Home from "./components/mainPage/mainPage";
import { AppointmentWizard } from "./components/recordPages/Appointment";
import WorksPage from "./components/works/works";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegisterPage />} />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/appointment" element={<AppointmentWizard />} />
      <Route path="/works" element={<WorksPage />} />
    </Routes>
  </Router>
);

reportWebVitals();
