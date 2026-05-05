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
import ElectedOfficialsLayout from './pages/government/elected-officials/layout';
import ElectedOfficials from './pages/government/elected-officials/index';
import MunicipalCommitteesPage from './pages/government/elected-officials/MunicipalCommittees';

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
              {/* 1. Make Government the Parent Route */}
              <Route path="/government" element={<Government />}>
                {/* 2. Nest the Elected Officials Layout */}
                <Route
                  path="elected-officials"
                  element={<ElectedOfficialsLayout />}
                >
                  {/* 3. The default content (index) and sub-pages */}
                  <Route index element={<ElectedOfficials />} />
                  <Route
                    path="committees"
                    element={<MunicipalCommitteesPage />}
                  />
                </Route>

                {/* 
                  Fallback for other categories (like /government/barangays).
                  Once you build the barangays layout, you will nest it here just like elected-officials!
                */}
              </Route>

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
