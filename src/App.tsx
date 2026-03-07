import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToolsProvider } from './context/ToolsContext';
import { UserProvider } from './context/UserContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ToolDetailPage from './pages/ToolDetailPage';
import NotFound from './pages/NotFound';
import About from './pages/info/About';
import FAQ from './pages/info/FAQ';
import Contact from './pages/info/Contact';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';

function App() {
  return (
    <Router>
      <UserProvider>
        <ToolsProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tools" element={<Home />} />
                <Route path="/tools/:toolId" element={<ToolDetailPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ToolsProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
