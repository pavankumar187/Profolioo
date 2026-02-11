import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import AuthPage from "./pages/AuthPage";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import ProtectedRoute from "./components/ProtectedRoute";




function App() {
  return (
    <BrowserRouter basename="/Profolioo">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/login" element={<AuthPage />} />
        <Route 
  path="/portfolio-builder"
  element={
    <ProtectedRoute>
      <PortfolioBuilder />
    </ProtectedRoute>
  }

 />




      </Routes>
    </BrowserRouter>
  );
}

export default App;
