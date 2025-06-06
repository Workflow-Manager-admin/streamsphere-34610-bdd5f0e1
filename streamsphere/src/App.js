import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout Components
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';

// Context Providers
import { AuthProvider } from './context/AuthContext';

// Placeholder page components (to be implemented later)
const HomePage = () => (
  <div className="page-content">
    <div className="video-grid">
      {/* Placeholder for video grid */}
      <div className="video-card">
        <div className="video-thumbnail">
          <div className="video-duration">10:24</div>
        </div>
        <div className="video-info">
          <h3 className="video-title">Sample Video Title</h3>
          <p className="video-channel">Channel Name</p>
          <p className="video-meta">1.2M views • 2 days ago</p>
        </div>
      </div>
      <div className="video-card">
        <div className="video-thumbnail">
          <div className="video-duration">15:30</div>
        </div>
        <div className="video-info">
          <h3 className="video-title">Another Video Title</h3>
          <p className="video-channel">Different Channel</p>
          <p className="video-meta">850K views • 1 week ago</p>
        </div>
      </div>
    </div>
  </div>
);

const TrendingPage = () => (
  <div className="page-content">
    <h1>Trending</h1>
    <p>Trending videos will be displayed here.</p>
  </div>
);

const SubscriptionsPage = () => (
  <div className="page-content">
    <h1>Subscriptions</h1>
    <p>Videos from your subscribed channels will be displayed here.</p>
  </div>
);

const LibraryPage = () => (
  <div className="page-content">
    <h1>Library</h1>
    <p>Your saved videos and playlists will be displayed here.</p>
  </div>
);

const PlaylistsPage = () => (
  <div className="page-content">
    <h1>Your Playlists</h1>
    <p>Your created playlists will be displayed here.</p>
  </div>
);

const HistoryPage = () => (
  <div className="page-content">
    <h1>Watch History</h1>
    <p>Your viewing history will be displayed here.</p>
  </div>
);

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application component with routing and layout structure
   * Manages sidebar state and provides overall app structure
   */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header onMenuToggle={toggleSidebar} sidebarOpen={sidebarOpen} />
          
          <div className="main-layout">
            <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
            
            <main className={`main-content ${!sidebarOpen ? 'expanded' : ''}`}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/trending" element={<TrendingPage />} />
                <Route path="/subscriptions" element={<SubscriptionsPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/playlists" element={<PlaylistsPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/watch-later" element={<HomePage />} />
                <Route path="/liked" element={<HomePage />} />
                <Route path="/downloads" element={<HomePage />} />
                <Route path="/music" element={<HomePage />} />
                <Route path="/gaming" element={<HomePage />} />
                <Route path="/news" element={<HomePage />} />
                <Route path="/sports" element={<HomePage />} />
                <Route path="/settings" element={<HomePage />} />
                <Route path="/help" element={<HomePage />} />
                <Route path="/feedback" element={<HomePage />} />
                <Route path="/report" element={<HomePage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
