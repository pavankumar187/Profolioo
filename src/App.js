import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import AuthPage from "./pages/AuthPage";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicPortfolio from "./pages/PublicPortfolio";
import ResumeBuilder from "./pages/ResumeBuilder";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/resume-builder" element={<ResumeBuilder />} />


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

        <Route path="/portfolio/:uid" element={<PublicPortfolio />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
