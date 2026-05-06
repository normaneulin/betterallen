import { NuqsAdapter } from 'nuqs/adapters/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ScrollToTop from './components/ui/ScrollToTop';
import Services from './pages/Services';
import Document from './pages/Document';
import Government from './pages/Government';
import Tourism from './pages/Tourism';
import { Toaster } from './components/ui/sonner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/about';
import AboutAllen from './pages/about/Allen';
import AboutBetterGov from './pages/about/BetterGov';

// --- ADD THESE NEW IMPORTS ---
import ElectedOfficials from './pages/government/elected-officials/ElectedOfficials';
import MunicipalCommitteesPage from './pages/government/elected-officials/MunicipalCommittees';
import MunicipalOffices from './pages/government/municipal-offices';

import Barangays from './pages/government/barangays';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <NuqsAdapter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/services/:category" element={<Services />} />
              <Route path="/services" element={<Services />} />
              <Route
                path="/services/:category/:documentSlug"
                element={<Document categoryType="service" />}
              />

              <Route path="/tourism/:category" element={<Tourism />} />
              <Route path="/tourism" element={<Tourism />} />

              {/* --- FIXED GOVERNMENT ROUTING --- */}
              <Route path="/government" element={<Government />}>
                {/* 1. Elected Officials Branch */}
                <Route
                  path="elected-officials"
                  element={<ElectedOfficials />}
                />
                <Route
                  path="elected-officials/committees"
                  element={<MunicipalCommitteesPage />}
                />

                {/* 2. Municipal Offices Branch (Sidebar Layout + Content) */}
                <Route path="municipal-offices" element={<MunicipalOffices />}>
                  <Route index element={<MunicipalOffices />} />
                </Route>

                {/* 3. Barangays Branch */}
                <Route path="barangays" element={<Barangays />} />
              </Route>

              {/* Keep this standalone route for your markdown documents */}
              <Route
                path="/government/:category/:documentSlug"
                element={<Document categoryType="government" />}
              />
              {/* --------------------------------- */}

              {/* Keep this standalone route for your markdown documents */}
              <Route
                path="/government/:category/:documentSlug"
                element={<Document categoryType="government" />}
              />
              {/* --------------------------------- */}

              <Route path="/about" element={<About />}>
                <Route index element={<AboutAllen />} />
                <Route path="allen" element={<AboutAllen />} />
                <Route path="bettergov" element={<AboutBetterGov />} />
              </Route>

              <Route path="/:lang/:documentSlug" element={<Document />} />
              <Route path="/:documentSlug" element={<Document />} />
            </Routes>
            <Toaster position="top-right" />
            <Footer />
          </div>
        </NuqsAdapter>
      </Router>
    </HelmetProvider>
  );
}

export default App;
