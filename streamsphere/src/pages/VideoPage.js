import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaShare, FaSave, FaBell, FaFlag } from 'react-icons/fa';
import VideoPlayer from '../components/Video/VideoPlayer';
import Comments from '../components/Social/Comments';
import RelatedVideos from '../components/Recommendations/RelatedVideos';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
const VideoPage = () => {
  /**
   * VideoPage component that displays a complete video viewing experience
   * Includes video player, metadata, social interactions, comments, and related videos
   */
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const videoId = searchParams.get('v');
  
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  // Mock video data
  const mockVideo = {
    id: videoId || '1',
    title: 'Building Modern React Applications with Hooks and Context',
    description: `In this comprehensive tutorial, we'll explore how to build modern React applications using the latest features including Hooks and Context API. 

We'll cover:
• Setting up a React project with modern tooling
• Understanding React Hooks (useState, useEffect, useContext)
• Implementing Context API for state management
• Building reusable components
• Best practices for component composition
• Performance optimization techniques

This tutorial is perfect for developers who want to level up their React skills and learn modern development patterns. We'll build a complete application from scratch, implementing real-world features and following industry best practices.

🔗 Resources:
- GitHub Repository: https://github.com/example/react-tutorial
- React Documentation: https://reactjs.org/
- Create React App: https://create-react-app.dev/

⏰ Timestamps:
00:00 Introduction
02:30 Project Setup
05:15 React Hooks Overview
12:45 useState Hook
18:20 useEffect Hook
25:10 Context API Setup
32:40 Building Components
45:15 State Management
52:30 Performance Tips
58:45 Conclusion

#React #JavaScript #WebDevelopment #Tutorial #Hooks #ContextAPI`,
    channelName: 'Tech Academy',
    channelId: 'tech-academy',
    channelAvatar: 'https://via.placeholder.com/48x48/f00000/ffffff?text=TA',
    subscribers: 125000,
    views: 1250000,
    likes: 45000,
    dislikes: 1200,
    uploadDate: '2024-01-15T10:30:00Z',
    duration: 3600, // 1 hour
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://via.placeholder.com/1280x720/f00000/ffffff?text=React+Tutorial',
    tags: ['React', 'JavaScript', 'Web Development', 'Tutorial', 'Hooks', 'Context API'],
    category: 'Education'
  };

  useEffect(() => {
    if (!videoId) {
      navigate('/');
      return;
    }

    // Simulate API call
    const loadVideo = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real app, this would be an API call
        setVideo(mockVideo);
        
        // Check if user has liked/disliked this video (mock data)
        if (user) {
          const userInteractions = JSON.parse(localStorage.getItem(`user_${user.id}_interactions`) || '{}');
          setLiked(userInteractions[videoId]?.liked || false);
          setDisliked(userInteractions[videoId]?.disliked || false);
          setSubscribed(user.subscriptions?.includes(mockVideo.channelId) || false);
        }
      } catch (err) {
        setError('Failed to load video. Please try again later.');
        console.error('Error loading video:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVideo();
  }, [videoId, navigate, user]);

  const handleLike = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const newLiked = !liked;
    setLiked(newLiked);
    if (newLiked && disliked) {
      setDisliked(false);
    }

    // Save to localStorage (mock persistence)
    const userInteractions = JSON.parse(localStorage.getItem(`user_${user.id}_interactions`) || '{}');
    userInteractions[videoId] = {
      ...userInteractions[videoId],
      liked: newLiked,
      disliked: newLiked ? false : userInteractions[videoId]?.disliked || false
    };
    localStorage.setItem(`user_${user.id}_interactions`, JSON.stringify(userInteractions));
  };

  const handleDislike = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const newDisliked = !disliked;
    setDisliked(newDisliked);
    if (newDisliked && liked) {
      setLiked(false);
    }

    // Save to localStorage (mock persistence)
    const userInteractions = JSON.parse(localStorage.getItem(`user_${user.id}_interactions`) || '{}');
    userInteractions[videoId] = {
      ...userInteractions[videoId],
      disliked: newDisliked,
      liked: newDisliked ? false : userInteractions[videoId]?.liked || false
    };
    localStorage.setItem(`user_${user.id}_interactions`, JSON.stringify(userInteractions));
  };

  const handleSubscribe = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setSubscribed(!subscribed);
    // In a real app, this would update the user's subscriptions via API
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: `Check out this video: ${video.title}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatViewCount = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatSubscriberCount = (subscribers) => {
    if (subscribers >= 1000000) {
      return `${(subscribers / 1000000).toFixed(1)}M`;
    } else if (subscribers >= 1000) {
      return `${(subscribers / 1000).toFixed(1)}K`;
    }
    return subscribers.toString();
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const uploadDate = new Date(dateString);
    const diffInMs = now - uploadDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) {
      return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    return 'Today';
  };

  if (loading) {
    return (
      <div className="video-page">
        <div className="video-page-loading">
          <div className="video-player-skeleton">
            <div className="skeleton-shimmer"></div>
          </div>
          <div className="video-info-skeleton">
            <div className="skeleton-title">
              <div className="skeleton-shimmer"></div>
            </div>
            <div className="skeleton-meta">
              <div className="skeleton-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="video-page">
        <div className="video-page-error">
          <h3>Video not found</h3>
          <p>{error || 'The video you\'re looking for doesn\'t exist or has been removed.'}</p>
          <button className="btn" onClick={() => navigate('/')}>
            Go back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="video-page">
      <div className="video-page-content">
        <div className="video-page-main">
          <div className="video-player-container">
            <VideoPlayer 
              videoUrl={video.videoUrl}
              thumbnail={video.thumbnail}
              title={video.title}
            />
          </div>

          <div className="video-info">
            <h1 className="video-title">{video.title}</h1>
            
            <div className="video-meta">
              <div className="video-stats">
                <span className="views-count">
                  {formatViewCount(video.views)} views
                </span>
                <span className="upload-date">
                  • {formatTimeAgo(video.uploadDate)}
                </span>
              </div>

              <div className="video-actions">
                <button 
                  className={`action-btn ${liked ? 'active' : ''}`}
                  onClick={handleLike}
                >
                  <FaThumbsUp />
                  <span>{formatViewCount(video.likes + (liked ? 1 : 0))}</span>
                </button>

                <button 
                  className={`action-btn ${disliked ? 'active' : ''}`}
                  onClick={handleDislike}
                >
                  <FaThumbsDown />
                  <span>{formatViewCount(video.dislikes + (disliked ? 1 : 0))}</span>
                </button>

                <button className="action-btn" onClick={handleShare}>
                  <FaShare />
                  <span>Share</span>
                </button>

                <button className="action-btn">
                  <FaSave />
                  <span>Save</span>
                </button>

                <button className="action-btn">
                  <FaFlag />
                  <span>Report</span>
                </button>
              </div>
            </div>

            <div className="channel-info">
              <div className="channel-details">
                <div className="channel-avatar">
                  <img src={video.channelAvatar} alt={video.channelName} />
                </div>
                <div className="channel-text">
                  <h3 className="channel-name">{video.channelName}</h3>
                  <p className="subscriber-count">
                    {formatSubscriberCount(video.subscribers)} subscribers
                  </p>
                </div>
              </div>

              <div className="channel-actions">
                <button 
                  className={`subscribe-btn ${subscribed ? 'subscribed' : ''}`}
                  onClick={handleSubscribe}
                >
                  <FaBell />
                  <span>{subscribed ? 'Subscribed' : 'Subscribe'}</span>
                </button>
              </div>
            </div>

            <div className="video-description">
              <button 
                className="description-toggle"
                onClick={() => setShowDescription(!showDescription)}
              >
                <span>{showDescription ? 'Show less' : 'Show more'}</span>
              </button>
              
              <div className={`description-content ${showDescription ? 'expanded' : ''}`}>
                <pre>{video.description}</pre>
              </div>
            </div>
          </div>

          <Comments videoId={videoId} />
        </div>

        <div className="video-page-sidebar">
          <RelatedVideos currentVideoId={videoId} />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
