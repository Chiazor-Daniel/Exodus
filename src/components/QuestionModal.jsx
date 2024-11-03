import React from 'react';
import { X, Check, AlertCircle } from 'lucide-react';

export const QuestionModal = ({
  question,
  onClose,
  selectedAnswer,
  setSelectedAnswer,
  onUpdateQuestionStatus,
  showAnswer,
  setShowAnswer
}) => {
  const handleCheckAnswer = () => {
    setShowAnswer(true);
    if (onUpdateQuestionStatus) {
      onUpdateQuestionStatus(question.postId, question.id, selectedAnswer); // Adjust parameters based on actual data structure
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold dark:text-white">{question.question}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {showAnswer && (
          <div className={`mb-4 p-4 rounded-lg flex items-center space-x-2 ${
            selectedAnswer === question.correctAnswer 
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
          }`}>
            {selectedAnswer === question.correctAnswer ? (
              <>
                <Check className="w-5 h-5" />
                <p>Correct! Well done!</p>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5" />
                <p>Not quite right. The correct answer was option {question.correctAnswer + 1}.</p>
              </>
            )}
          </div>
        )}

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-4 rounded-lg text-left ${
                selectedAnswer === index
                  ? 'bg-blue-100 dark:bg-blue-900 border-purple-400'
                  : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
              } ${
                showAnswer && index === question.correctAnswer
                  ? 'bg-green-100 dark:bg-green-900 border-green-400'
                  : ''
              } dark:text-white`}
              onClick={() => setSelectedAnswer(index)}
              disabled={showAnswer}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          {!showAnswer && (
            <button
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-lg"
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
            >
              Check Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
