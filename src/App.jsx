import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './components/NavBar';
import { Sidebar } from './components/SideBar';
import { PostCreator } from './components/PostCreator';
import { QuestionCard } from './components/QuestionCard';
import { QuestionModal } from './components/QuestionModal';
import { FriendsList, ChatModal } from './components/FriendsChat';
import MobileFriendsPanel from './components/mobile/FriendsChat';
import { Allposts } from './constants/posts';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [posts, setPosts] = useState(Allposts);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isMobileFriendsOpen, setIsMobileFriendsOpen] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Function to update question status
  const updateQuestionStatus = (postId, questionId, selectedAnswerIndex) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            questions: post.questions.map(question => {
              if (question.id === questionId) {
                return {
                  ...question,
                  answered: {
                    attempted: true,
                    gotCorrect: question.correctAnswer === selectedAnswerIndex
                  }
                };
              }
              return question;
            })
          };
        }
        return post;
      })
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-slate-200'}`}>
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <div className="max-w-7xl mx-auto pt-14 lg:pt-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-2 mt-4">
            <Sidebar />
          </div>
          
          <div className="lg:col-span-7 space-y-6 lg:pt-4">
            <PostCreator isGenerating={isGenerating} setIsGenerating={setIsGenerating} />
            {posts.map(post => (
              <QuestionCard
                key={post.id}
                post={post}
                onQuestionClick={(question) => {
                  setSelectedQuestion(question);
                  setSelectedAnswer(null);
                  setShowAnswer(false);
                }}
                onUpdateQuestionStatus={updateQuestionStatus} // Pass the function here
              />
            ))}
          </div>

          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24 hidden lg:block">
              <FriendsList onChatOpen={setSelectedFriend} />
            </div>
          </div>
        </div>
      </div>

      {/* Modals and Panels */}
      {selectedQuestion && (
        <QuestionModal
          question={selectedQuestion}
          onClose={() => {
            setSelectedQuestion(null);
            setSelectedAnswer(null);
            setShowAnswer(false);
          }}
          selectedAnswer={selectedAnswer}
          onUpdateQuestionStatus={updateQuestionStatus}
          setSelectedAnswer={setSelectedAnswer}
          showAnswer={showAnswer}
          setShowAnswer={setShowAnswer}
        />
      )}

      {selectedFriend && (
        <ChatModal
          friend={selectedFriend}
          onClose={() => setSelectedFriend(null)}
        />
      )}

      <MobileFriendsPanel
        isOpen={isMobileFriendsOpen}
        onClose={() => setIsMobileFriendsOpen(false)}
        onChatOpen={(friend) => {
          setSelectedFriend(friend);
          setIsMobileFriendsOpen(false);
        }}
      />

      {/* Mobile Friends Button */}
      <div className="fixed bottom-4 right-4 lg:hidden">
        <button 
          onClick={() => setIsMobileFriendsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default App;
