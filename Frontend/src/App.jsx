import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Signup.jsx";
import VerifyOTP from "../pages/VerifyOTP.jsx";
import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import HackathonRegister from "../pages/HackathonRegister.jsx";
import Contact from "../pages/Contact.jsx";
import Home from "../pages/Home.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/hackathon-register"
            element={<HackathonRegister />}
          />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;