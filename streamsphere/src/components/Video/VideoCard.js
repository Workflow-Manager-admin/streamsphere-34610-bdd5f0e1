import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
const VideoCard = ({ video }) => {
  /**
   * Reusable video card component for displaying video information
   * Displays thumbnail, title, channel, views, and upload date
   * @param {Object} video - Video data object containing title, thumbnail, channel, etc.
   */
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
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInYears > 0) {
      return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    } else if (diffInWeeks > 0) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    } else if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    return 'Today';
  };

  if (!video) {
    return null;
  }

  return (
    <div className="video-card">
      <Link to={`/watch?v=${video.id}`} className="video-link">
        <div className="video-thumbnail">
          {video.thumbnail ? (
            <img src={video.thumbnail} alt={video.title} loading="lazy" />
          ) : (
            <div className="video-thumbnail-placeholder">
              <span>▶</span>
            </div>
          )}
          {video.duration && (
            <div className="video-duration">
              {formatDuration(video.duration)}
            </div>
          )}
        </div>
        
        <div className="video-info">
          <h3 className="video-title" title={video.title}>
            {video.title}
          </h3>
          
          <div className="video-channel">
            <Link to={`/channel/${video.channelId}`} className="channel-link">
              {video.channelName}
            </Link>
          </div>
          
          <div className="video-meta">
            <span className="video-views">
              {formatViewCount(video.views)} views
            </span>
            <span className="video-separator"> • </span>
            <span className="video-upload-time">
              {formatTimeAgo(video.uploadDate)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
