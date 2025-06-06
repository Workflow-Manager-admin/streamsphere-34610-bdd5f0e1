import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
const RelatedVideos = ({ currentVideoId }) => {
  /**
   * RelatedVideos component that displays recommended videos in sidebar layout
   * Shows related content based on current video context
   */
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock related videos data
  const mockRelatedVideos = [
    {
      id: '2',
      title: 'CSS Grid Layout: Complete Guide for Responsive Design',
      channelName: 'WebDev Pro',
      channelId: 'webdev-pro',
      views: 875000,
      uploadDate: '2024-01-12T14:20:00Z',
      duration: 2146,
      thumbnail: 'https://via.placeholder.com/320x180/282828/ffffff?text=CSS+Grid'
    },
    {
      id: '3',
      title: 'JavaScript ES6+ Features You Need to Know in 2024',
      channelName: 'Code Masters',
      channelId: 'code-masters',
      views: 2100000,
      uploadDate: '2024-01-10T09:15:00Z',
      duration: 1654,
      thumbnail: 'https://via.placeholder.com/320x180/f00000/ffffff?text=JavaScript+ES6'
    },
    {
      id: '4',
      title: 'Node.js Microservices Architecture Best Practices',
      channelName: 'Backend Guru',
      channelId: 'backend-guru',
      views: 456000,
      uploadDate: '2024-01-08T16:45:00Z',
      duration: 3245,
      thumbnail: 'https://via.placeholder.com/320x180/282828/ffffff?text=Node.js+Microservices'
    },
    {
      id: '5',
      title: 'Docker Containers Explained: From Beginner to Advanced',
      channelName: 'DevOps Central',
      channelId: 'devops-central',
      views: 1800000,
      uploadDate: '2024-01-05T11:30:00Z',
      duration: 2567,
      thumbnail: 'https://via.placeholder.com/320x180/f00000/ffffff?text=Docker+Tutorial'
    },
    {
      id: '6',
      title: 'Python Data Science: Pandas and NumPy Masterclass',
      channelName: 'Data Science Hub',
      channelId: 'data-science-hub',
      views: 950000,
      uploadDate: '2024-01-03T13:20:00Z',
      duration: 4123,
      thumbnail: 'https://via.placeholder.com/320x180/282828/ffffff?text=Python+Data+Science'
    },
    {
      id: '7',
      title: 'AWS Cloud Architecture Patterns for Scalable Applications',
      channelName: 'Cloud Expert',
      channelId: 'cloud-expert',
      views: 675000,
      uploadDate: '2024-01-01T08:00:00Z',
      duration: 2934,
      thumbnail: 'https://via.placeholder.com/320x180/f00000/ffffff?text=AWS+Architecture'
    },
    {
      id: '8',
      title: 'Vue.js 3 Composition API: Complete Tutorial',
      channelName: 'Frontend Focus',
      channelId: 'frontend-focus',
      views: 425000,
      uploadDate: '2023-12-28T15:45:00Z',
      duration: 1923,
      thumbnail: 'https://via.placeholder.com/320x180/282828/ffffff?text=Vue.js+3'
    },
    {
      id: '9',
      title: 'GraphQL vs REST API: When to Use Each',
      channelName: 'API Design',
      channelId: 'api-design',
      views: 780000,
      uploadDate: '2023-12-25T12:30:00Z',
      duration: 1456,
      thumbnail: 'https://via.placeholder.com/320x180/f00000/ffffff?text=GraphQL+vs+REST'
    }
  ];

  useEffect(() => {
    // Simulate API call to load related videos
    const loadRelatedVideos = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Filter out current video and get random related videos
        const filtered = mockRelatedVideos.filter(video => video.id !== currentVideoId);
        setRelatedVideos(filtered);
      } catch (error) {
        console.error('Error loading related videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRelatedVideos();
  }, [currentVideoId]);

  const formatViewCount = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const uploadDate = new Date(dateString);
    const diffInMs = now - uploadDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInMonths > 0) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else if (diffInWeeks > 0) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    return 'Today';
  };

  if (loading) {
    return (
      <div className="related-videos">
        <div className="related-videos-header">
          <h3>Up next</h3>
        </div>
        <div className="related-videos-list">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="related-video-skeleton">
              <div className="related-thumbnail-skeleton">
                <div className="skeleton-shimmer"></div>
              </div>
              <div className="related-info-skeleton">
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
    );
  }

  return (
    <div className="related-videos">
      <div className="related-videos-header">
        <h3>Up next</h3>
      </div>
      
      <div className="related-videos-list">
        {relatedVideos.map(video => (
          <Link
            key={video.id}
            to={`/watch?v=${video.id}`}
            className="related-video"
          >
            <div className="related-thumbnail">
              <img src={video.thumbnail} alt={video.title} loading="lazy" />
              <div className="related-duration">
                {formatDuration(video.duration)}
              </div>
            </div>
            
            <div className="related-info">
              <h4 className="related-title">{video.title}</h4>
              <div className="related-channel">{video.channelName}</div>
              <div className="related-meta">
                <span>{formatViewCount(video.views)} views</span>
                <span> • </span>
                <span>{formatTimeAgo(video.uploadDate)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedVideos;
