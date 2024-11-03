import React, { useEffect, useState } from 'react';
import { Cog, FileText, MonitorCog, X } from 'lucide-react';
import Avatar from 'react-avatar';

export const PostCreator = ({ isGenerating, setIsGenerating }) => {
  const [difficulty, setDifficulty] = useState('Easy');
  const [inputText, setInputText] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      if (uploadedFile.type.startsWith('image/')) {
        setFile(URL.createObjectURL(uploadedFile));
        setFileName(''); // Clear file name if it's an image
      } else {
        setFile(null); // Clear file preview if it's not an image
        setFileName(uploadedFile.name); // Set file name for non-image file
      }
    }
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
  };

  const removeFile = () => {
    setFile(null);
    setFileName('');
  };

  const isButtonDisabled = !inputText && !file && !fileName;

  useEffect(() => {
    if (inputText.length < 2 && !file && !fileName) {
      setIsGenerating(false);
    }
  }, [inputText, file, fileName, setIsGenerating]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        {/* Avatar for the user */}
        <Avatar name="Buzz C" src="https://buzzstezz.netlify.app/buzz.jpeg" size="40" round={true} />
        <div className="flex-1">
          <input 
            type="text" 
            placeholder="Type In Question Prompt Or Upload Document..."
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none"
            value={inputText}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      {/* Document Preview or File Name with Icon */}
      {(file || fileName) && (
        <div className="relative mb-4 flex items-center justify-center">
          {file ? (
            <div className="relative inline-block">
              <img src={file} alt="Document Preview" className="rounded-lg max-h-40 w-auto object-cover" />
              <button
                onClick={removeFile}
                className="absolute -top-1 -right-1 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
              <FileText className="w-6 h-6 text-blue-500" />
              <span>{fileName}</span>
              <button
                onClick={removeFile}
                className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between border-t dark:border-gray-700 pt-4">
        <div className="flex space-x-4 items-center">
          <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 cursor-pointer">
            <FileText className="w-5 h-5" />
            <span>Upload Document</span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>

          {/* Difficulty Dropdown */}
          <div className="relative">
            {/* <select 
            
              onChange={(e) => setDifficulty(e.target.value)} 
              className="p-1 rounded-lg bg-gray-500 dark:bg-gray-600 text-white"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select> */}
            <MonitorCog className="dark:text-white cursor-pointer" size={20}/>

            
          </div>
        </div>
        
        <button 
          onClick={() => setIsGenerating(true)}
          className={`px-4 py-2 rounded-lg transition-opacity ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} bg-gradient-to-r from-purple-600 to-blue-500 text-white`}
          disabled={isButtonDisabled}
        >
          Generate Questions
        </button>
      </div>
      
      {isGenerating && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="dark:text-white">
              Generating questions {(!inputText || inputText.length < 2) && "from your document..."}
            </span>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          </div>
        </div>
      )}
    </div>
  );
};
