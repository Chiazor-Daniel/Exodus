import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Download, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import Avatar from 'react-avatar';

export const QuestionCard = ({ post, onQuestionClick }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const getQuestionStatusIcon = (question) => {
    if (!question.answered?.attempted) {
      return <HelpCircle className="w-5 h-5 text-gray-400" title="Not attempted" />;
    }
    return question.answered.gotCorrect ? (
      <CheckCircle className="w-5 h-5 text-green-500" title="Correct answer" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" title="Incorrect answer" />
    );
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar name={post.author} size="40" round={true} />
          <div>
            <span className="font-medium dark:text-white">{post.author}</span>
            <div className="flex items-center space-x-1">
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400">{post.documentTitle}</a>
              {post.documentTitle.includes(".pdf") && (
                <Download className="w-3 h-3 cursor-pointer text-gray-400 dark:text-gray-300" />
              )}
            </div>
          </div>
        </div>
        <div>
          <div className='text-sm text-gray-400 cursor-pointer'>{post.likes}</div>
          <button className="text-gray-400 hover:text-red-500 dark:hover:text-red-400">
            <Heart className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
      </div>
      <p className="mb-4 dark:text-white">{post.content}</p>
      <div className="space-y-4">
        {post.questions.map(question => (
          <div
            key={question.id}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={() => onQuestionClick(question)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium dark:text-white mb-2">{question.question}</p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {question.answered?.attempted ? 'Click to review' : 'Click to answer'}
                </div>
              </div>
              <div className="ml-4">
                {getQuestionStatusIcon(question)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t dark:border-gray-700">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <MessageCircle className="w-5 h-5" />
            <span>{post.questions.length} questions</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 py-2 mx-6 rounded-full border-none text-sm focus:outline-none pl-4 bg-gray-200 dark:bg-gray-700 dark:text-white"
          />
        <button className="text-gray-600 dark:text-gray-300">
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    
    </div>
  );
};
