import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaSearch, FaVideo, FaBell, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

// PUBLIC_INTERFACE
const Header = ({ onMenuToggle, sidebarOpen }) => {
  /**
   * Header component with navigation, search, and user controls
   * Handles menu toggle, search functionality, and user authentication state
   */
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleUploadClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/upload');
    }
  };

  const handleUserMenuClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/profile');
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-btn"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>
        <Link to="/" className="logo">
          <span className="logo-icon">▶</span>
          StreamSphere
        </Link>
      </div>

      <div className="header-center">
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="header-right">
        <button 
          className="icon-btn"
          onClick={handleUploadClick}
          title="Upload video"
        >
          <FaVideo />
        </button>
        
        {user && (
          <button className="icon-btn" title="Notifications">
            <FaBell />
          </button>
        )}
        
        <div className="user-menu">
          {user ? (
            <div className="user-avatar" onClick={handleUserMenuClick}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                user.name.charAt(0).toUpperCase()
              )}
            </div>
          ) : (
            <button className="icon-btn" onClick={handleUserMenuClick}>
              <FaUser />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
