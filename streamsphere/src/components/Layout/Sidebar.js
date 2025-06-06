import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaFire, 
  FaUser, 
  FaHistory, 
  FaList, 
  FaClock, 
  FaThumbsUp,
  FaDownload,
  FaMusic,
  FaGamepad,
  FaNewspaper,
  FaTrophy,
  FaCog,
  FaFlag,
  FaQuestionCircle,
  FaComments
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

// PUBLIC_INTERFACE
const Sidebar = ({ isOpen, onToggle }) => {
  /**
   * Sidebar navigation component with responsive design
   * Provides navigation links for main app sections and user-specific content
   */
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const mainNavItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/trending', icon: FaFire, label: 'Trending' },
    { path: '/subscriptions', icon: FaUser, label: 'Subscriptions', requiresAuth: true }
  ];

  const libraryItems = [
    { path: '/library', icon: FaList, label: 'Library', requiresAuth: true },
    { path: '/history', icon: FaHistory, label: 'History', requiresAuth: true },
    { path: '/playlists', icon: FaList, label: 'Your playlists', requiresAuth: true },
    { path: '/watch-later', icon: FaClock, label: 'Watch later', requiresAuth: true },
    { path: '/liked', icon: FaThumbsUp, label: 'Liked videos', requiresAuth: true },
    { path: '/downloads', icon: FaDownload, label: 'Downloads', requiresAuth: true }
  ];

  const exploreItems = [
    { path: '/music', icon: FaMusic, label: 'Music' },
    { path: '/gaming', icon: FaGamepad, label: 'Gaming' },
    { path: '/news', icon: FaNewspaper, label: 'News' },
    { path: '/sports', icon: FaTrophy, label: 'Sports' }
  ];

  const moreItems = [
    { path: '/settings', icon: FaCog, label: 'Settings' },
    { path: '/report', icon: FaFlag, label: 'Report history' },
    { path: '/help', icon: FaQuestionCircle, label: 'Help' },
    { path: '/feedback', icon: FaComments, label: 'Send feedback' }
  ];

  const renderNavItem = (item) => {
    // Skip items that require authentication if user is not logged in
    if (item.requiresAuth && !user) {
      return null;
    }

    const IconComponent = item.icon;
    
    return (
      <Link
        key={item.path}
        to={item.path}
        className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
        onClick={() => {
          // Close sidebar on mobile after navigation
          if (window.innerWidth <= 1024) {
            onToggle();
          }
        }}
      >
        <IconComponent className="sidebar-icon" />
        <span>{item.label}</span>
      </Link>
    );
  };

  const renderNavSection = (items, title = null) => {
    const filteredItems = items.filter(item => !item.requiresAuth || user);
    
    if (filteredItems.length === 0) {
      return null;
    }

    return (
      <div className="sidebar-section">
        {title && <div className="sidebar-section-title">{title}</div>}
        {filteredItems.map(renderNavItem)}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onToggle}
        />
      )}
      
      <nav className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
        {/* Main navigation */}
        {renderNavSection(mainNavItems)}

        {/* Library section - only show if user is logged in */}
        {user && renderNavSection(libraryItems)}

        {/* Subscriptions section - only show if user has subscriptions */}
        {user && user.subscriptions && user.subscriptions.length > 0 && (
          <div className="sidebar-section">
            <div className="sidebar-section-title">Subscriptions</div>
            {/* In a real app, this would render actual subscribed channels */}
            <div className="sidebar-item">
              <div className="channel-avatar">C</div>
              <span>Channel 1</span>
            </div>
            <div className="sidebar-item">
              <div className="channel-avatar">T</div>
              <span>Tech Channel</span>
            </div>
          </div>
        )}

        {/* Explore section */}
        {renderNavSection(exploreItems, 'Explore')}

        {/* More section */}
        {renderNavSection(moreItems, 'More from StreamSphere')}

        {/* Footer info */}
        <div className="sidebar-footer">
          <div className="sidebar-section">
            <div className="sidebar-footer-text">
              © 2024 StreamSphere
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
