import React, { useState, useEffect } from 'react';
import VideoCard from '../Video/VideoCard';

// PUBLIC_INTERFACE
const MainFeed = () => {
  /**
   * Main feed component that displays recommended videos in a responsive grid layout
   * Fetches and displays video data with proper loading and error states
   */
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock video data for demonstration
  const mockVideos = [
    {
      id: '1',
      title: 'Building Modern React Applications with Hooks and Context',
      channelName: 'Tech Academy',
      channelId: 'tech-academy',
      views: 1250000,
      uploadDate: '2024-01-15T10:30:00Z',
      duration: 1848, // 30:48
      thumbnail: 'https://via.placeholder.com/320x180/f00000/ffffff?text=React+Tutorial'
    },
    {
      id: '2',
      title: 'CSS Grid Layout: Complete Guide for Responsive Design',
      channelName: 'WebDev Pro',
      channelId: 'webdev-pro',
      views: 875000,
      uploadDate: '2024-01-12T14:20:00Z',
      duration: 2146, // 35:46
      thumbnail: 'https://via.placeholder.com/320x180/282828/ffffff?text=CSS+Grid'
    },
    {
      id: '3',
      title: 'JavaScript ES6+ Features You Need to Know in 2024',
      channelName: 'Code Masters',
      channelId: 'code-masters',
      views: 2100000,
      uploadDate: '2024-01-10T09:15:00Z',
      duration: 1654, // 27:34
      thumbnail: 'https://via.placeholder.com/320x180/f00000/ffffff?text=JavaScript+ES6'
    },
    {
      id: '4',
      title: 'Node.js Microservices Architecture Best Practices',
      channelName: 'Backend Guru',
      channelId: 'backend-guru',
      views: 456000,
      uploadDate: '2024-01-08T16:45:00Z',
      duration: 3245, // 54:05
      thumbnail: 'https://via.placeholder.com/320x180/282828/ffffff?text=Node.js+Microservices'
    },
    {
      id: '5',
      title: 'Docker Containers Explained: From Beginner to Advanced',
      channelName: 'DevOps Central',
      channelId: 'devops-central',
      views: 1800000,
      uploadDate: '2024-01-05T11:30:00Z',
      duration: 2567, // 42:47
      thumbnail: 'https://via.placeholder.com/320x180/f00000/ffffff?text=Docker+Tutorial'
    },
    {
      id: '6',
      title: 'Python Data Science: Pandas and NumPy Masterclass',
      channelName: 'Data Science Hub',
      channelId: 'data-science-hub',
      views: 950000,
      uploadDate: '2024-01-03T13:20:00Z',
      duration: 4123, // 1:08:43
      thumbnail: 'https://via.placeholder.com/320x180/282828/ffffff?text=Python+Data+Science'
    },
    {
      id: '7',
      title: 'AWS Cloud Architecture Patterns for Scalable Applications',
      channelName: 'Cloud Expert',
      channelId: 'cloud-expert',
      views: 675000,
      uploadDate: '2024-01-01T08:00:00Z',
      duration: 2934, // 48:54
      thumbnail: 'https://via.placeholder.com/320x180/f00000/ffffff?text=AWS+Architecture'
    },
    {
      id: '8',
      title: 'Vue.js 3 Composition API: Complete Tutorial',
      channelName: 'Frontend Focus',
      channelId: 'frontend-focus',
      views: 425000,
      uploadDate: '2023-12-28T15:45:00Z',
      duration: 1923, // 32:03
      thumbnail: 'https://via.placeholder.com/320x180/282828/ffffff?text=Vue.js+3'
    },
    {
      id: '9',
      title: 'GraphQL vs REST API: When to Use Each',
      channelName: 'API Design',
      channelId: 'api-design',
      views: 780000,
      uploadDate: '2023-12-25T12:30:00Z',
      duration: 1456, // 24:16
      thumbnail: 'https://via.placeholder.com/320x180/f00000/ffffff?text=GraphQL+vs+REST'
    },
    {
      id: '10',
      title: 'TypeScript Advanced Types and Generics Deep Dive',
      channelName: 'Type Safety',
      channelId: 'type-safety',
      views: 612000,
      uploadDate: '2023-12-22T10:15:00Z',
      duration: 2678, // 44:38
      thumbnail: 'https://via.placeholder.com/320x180/282828/ffffff?text=TypeScript+Advanced'
    },
    {
      id: '11',
      title: 'MongoDB Atlas: Database Design and Performance Optimization',
      channelName: 'Database Pro',
      channelId: 'database-pro',
      views: 534000,
      uploadDate: '2023-12-20T14:00:00Z',
      duration: 3156, // 52:36
      thumbnail: 'https://via.placeholder.com/320x180/f00000/ffffff?text=MongoDB+Atlas'
    },
    {
      id: '12',
      title: 'React Native vs Flutter: Mobile Development Comparison',
      channelName: 'Mobile Dev',
      channelId: 'mobile-dev',
      views: 890000,
      uploadDate: '2023-12-18T09:30:00Z',
      duration: 2245, // 37:25
      thumbnail: 'https://via.placeholder.com/320x180/282828/ffffff?text=React+Native+vs+Flutter'
    }
  ];

  useEffect(() => {
    // Simulate API call with loading delay
    const loadVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // In a real application, this would be an API call
        // const response = await fetch('/api/videos/recommendations');
        // const data = await response.json();
        
        setVideos(mockVideos);
      } catch (err) {
        setError('Failed to load videos. Please try again later.');
        console.error('Error loading videos:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  if (loading) {
    return (
      <div className="main-feed">
        <div className="main-feed-loading">
          <div className="video-grid">
            {/* Loading skeleton cards */}
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index} className="video-card video-card-skeleton">
                <div className="video-thumbnail skeleton-thumbnail">
                  <div className="skeleton-shimmer"></div>
                </div>
                <div className="video-info">
                  <div className="skeleton-title">
                    <div className="skeleton-shimmer"></div>
                  </div>
                  <div className="skeleton-channel">
                    <div className="skeleton-shimmer"></div>
                  </div>
                  <div className="skeleton-meta">
                    <div className="skeleton-shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-feed">
        <div className="main-feed-error">
          <div className="error-message">
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button 
              className="btn"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-feed">
      <div className="video-grid">
        {videos.map(video => (
          <VideoCard 
            key={video.id} 
            video={video}
          />
        ))}
      </div>
    </div>
  );
};

export default MainFeed;
