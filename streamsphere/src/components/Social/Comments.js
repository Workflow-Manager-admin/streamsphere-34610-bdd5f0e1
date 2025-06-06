import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaThumbsDown, FaReply, FaSort } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

// PUBLIC_INTERFACE
const Comments = ({ videoId }) => {
  /**
   * Comments component that handles video comments, replies, and social interactions
   * Provides commenting functionality with like/dislike and reply features
   */
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Mock comments data
  const mockComments = [
    {
      id: '1',
      userId: '1',
      username: 'TechEnthusiast',
      avatar: 'https://via.placeholder.com/40x40/f00000/ffffff?text=TE',
      text: 'Great tutorial! Really helped me understand React hooks better. The examples were clear and easy to follow.',
      timestamp: '2024-01-16T12:30:00Z',
      likes: 24,
      dislikes: 2,
      replies: [
        {
          id: '1-1',
          userId: '2',
          username: 'ReactDev',
          avatar: 'https://via.placeholder.com/40x40/282828/ffffff?text=RD',
          text: 'Totally agree! This channel always delivers quality content.',
          timestamp: '2024-01-16T13:15:00Z',
          likes: 8,
          dislikes: 0
        }
      ]
    },
    {
      id: '2',
      userId: '3',
      username: 'WebDeveloper',
      avatar: 'https://via.placeholder.com/40x40/f00000/ffffff?text=WD',
      text: 'Could you make a tutorial about React Native next? Would love to see how these concepts apply to mobile development.',
      timestamp: '2024-01-16T10:45:00Z',
      likes: 15,
      dislikes: 1,
      replies: []
    },
    {
      id: '3',
      userId: '4',
      username: 'CodeNewbie',
      avatar: 'https://via.placeholder.com/40x40/282828/ffffff?text=CN',
      text: 'I\'m new to React and this was exactly what I needed. Thank you for breaking it down so well!',
      timestamp: '2024-01-16T09:20:00Z',
      likes: 31,
      dislikes: 0,
      replies: [
        {
          id: '3-1',
          userId: '5',
          username: 'MentorDev',
          avatar: 'https://via.placeholder.com/40x40/f00000/ffffff?text=MD',
          text: 'Keep learning! React is an amazing technology once you get the hang of it.',
          timestamp: '2024-01-16T09:35:00Z',
          likes: 12,
          dislikes: 0
        },
        {
          id: '3-2',
          userId: '1',
          username: 'TechEnthusiast',
          avatar: 'https://via.placeholder.com/40x40/f00000/ffffff?text=TE',
          text: 'Welcome to the React community! Feel free to ask questions.',
          timestamp: '2024-01-16T09:40:00Z',
          likes: 6,
          dislikes: 0
        }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call to load comments
    const loadComments = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 300));
        setComments(mockComments);
      } catch (error) {
        console.error('Error loading comments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [videoId]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const diffInMs = now - commentDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.name,
      avatar: user.avatar || `https://via.placeholder.com/40x40/f00000/ffffff?text=${user.name.charAt(0)}`,
      text: newComment.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleReplySubmit = (e, commentId) => {
    e.preventDefault();
    if (!user || !replyText.trim()) return;

    const reply = {
      id: `${commentId}-${Date.now()}`,
      userId: user.id,
      username: user.name,
      avatar: user.avatar || `https://via.placeholder.com/40x40/f00000/ffffff?text=${user.name.charAt(0)}`,
      text: replyText.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));

    setReplyText('');
    setReplyingTo(null);
  };

  const handleCommentLike = (commentId, isReply = false, parentId = null) => {
    if (!user) return;

    if (isReply) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ));
    }
  };

  const sortComments = (commentsToSort) => {
    switch (sortBy) {
      case 'oldest':
        return [...commentsToSort].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      case 'popular':
        return [...commentsToSort].sort((a, b) => b.likes - a.likes);
      default: // newest
        return [...commentsToSort].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
  };

  if (loading) {
    return (
      <div className="comments-section">
        <div className="comments-header">
          <h3>Comments</h3>
        </div>
        <div className="comments-loading">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="comment-skeleton">
              <div className="comment-avatar-skeleton">
                <div className="skeleton-shimmer"></div>
              </div>
              <div className="comment-content-skeleton">
                <div className="skeleton-line">
                  <div className="skeleton-shimmer"></div>
                </div>
                <div className="skeleton-line short">
                  <div className="skeleton-shimmer"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const sortedComments = sortComments(comments);

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3>{comments.length} Comments</h3>
        <div className="comments-sort">
          <FaSort />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="popular">Most popular</option>
          </select>
        </div>
      </div>

      {user && (
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <div className="comment-input-container">
            <div className="comment-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <div className="avatar-placeholder">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="comment-input-wrapper">
              <textarea
                className="comment-input"
                placeholder="Add a public comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="2"
              />
              {newComment.trim() && (
                <div className="comment-actions">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setNewComment('')}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn">
                    Comment
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      )}

      <div className="comments-list">
        {sortedComments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-avatar">
              <img src={comment.avatar} alt={comment.username} />
            </div>
            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-username">{comment.username}</span>
                <span className="comment-timestamp">{formatTimeAgo(comment.timestamp)}</span>
              </div>
              <div className="comment-text">{comment.text}</div>
              <div className="comment-actions">
                <button 
                  className="comment-action-btn"
                  onClick={() => handleCommentLike(comment.id)}
                >
                  <FaThumbsUp />
                  <span>{comment.likes}</span>
                </button>
                <button className="comment-action-btn">
                  <FaThumbsDown />
                  <span>{comment.dislikes}</span>
                </button>
                <button 
                  className="comment-action-btn"
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                >
                  <FaReply />
                  <span>Reply</span>
                </button>
              </div>

              {replyingTo === comment.id && user && (
                <form 
                  className="reply-form"
                  onSubmit={(e) => handleReplySubmit(e, comment.id)}
                >
                  <div className="reply-input-container">
                    <div className="comment-avatar small">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <div className="avatar-placeholder">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="reply-input-wrapper">
                      <textarea
                        className="reply-input"
                        placeholder={`Reply to ${comment.username}...`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows="2"
                      />
                      <div className="reply-actions">
                        <button 
                          type="button" 
                          className="btn-secondary"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText('');
                          }}
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn" disabled={!replyText.trim()}>
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {comment.replies.length > 0 && (
                <div className="replies">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="reply">
                      <div className="comment-avatar small">
                        <img src={reply.avatar} alt={reply.username} />
                      </div>
                      <div className="comment-content">
                        <div className="comment-header">
                          <span className="comment-username">{reply.username}</span>
                          <span className="comment-timestamp">{formatTimeAgo(reply.timestamp)}</span>
                        </div>
                        <div className="comment-text">{reply.text}</div>
                        <div className="comment-actions">
                          <button 
                            className="comment-action-btn"
                            onClick={() => handleCommentLike(reply.id, true, comment.id)}
                          >
                            <FaThumbsUp />
                            <span>{reply.likes}</span>
                          </button>
                          <button className="comment-action-btn">
                            <FaThumbsDown />
                            <span>{reply.dislikes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {!user && (
          <div className="comments-login-prompt">
            <p>Sign in to leave a comment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
