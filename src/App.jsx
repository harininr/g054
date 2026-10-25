import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Research from './pages/Research/Research';
import Methodology from './pages/Methodology/Methodology';
import Architecture from './pages/Architecture/Architecture';
import Experiments from './pages/Experiments/Experiments';
import Results from './pages/Results/Results';
import Progress from './pages/Progress/Progress';
import Documentation from './pages/Documentation/Documentation';
import Team from './pages/Team/Team';
import Demonstration from './pages/Demonstration/Demonstration';
import GitHub from './pages/GitHub/GitHub';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageWrapper({ children }) {
  return <div className="page-enter">{children}</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/research" element={<PageWrapper><Research /></PageWrapper>} />
          <Route path="/methodology" element={<PageWrapper><Methodology /></PageWrapper>} />
          <Route path="/architecture" element={<PageWrapper><Architecture /></PageWrapper>} />
          <Route path="/experiments" element={<PageWrapper><Experiments /></PageWrapper>} />
          <Route path="/results" element={<PageWrapper><Results /></PageWrapper>} />
          <Route path="/progress" element={<PageWrapper><Progress /></PageWrapper>} />
          <Route path="/documentation" element={<PageWrapper><Documentation /></PageWrapper>} />
          <Route path="/team" element={<PageWrapper><Team /></PageWrapper>} />
          <Route path="/demonstration" element={<PageWrapper><Demonstration /></PageWrapper>} />
          <Route path="/github" element={<PageWrapper><GitHub /></PageWrapper>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
