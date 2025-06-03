import React, { useState } from 'react';
import type { Question } from '../types/question';

interface QuestionInputProps {
  onGoToQuiz: (data: Question[]) => void;
  onGoBack: () => void;
}

// Define the example JSON directly in the component file for easy access
const EXAMPLE_JSON = `[
  {
    "question": "What is the capital of France?",
    "options": ["Berlin", "Madrid", "Paris", "Rome"],
    "answer": "Paris"
  },
  {
    "question": "Which planet is known as the Red Planet?",
    "options": ["Earth", "Mars", "Jupiter", "Venus"],
    "answer": "Mars"
  },
  {
    "question": "What is 2 + 2?",
    "options": ["3", "4", "5", "6"],
    "answer": "4"
  }
]`;

const QuestionInput: React.FC<QuestionInputProps> = ({ onGoToQuiz, onGoBack }) => {
  const [inputText, setInputText] = useState('');
  const [copyFeedback, setCopyFeedback] = useState(''); // New state for copy feedback


  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleStartQuiz = () => {
    try {
      const parsedData = JSON.parse(inputText);
      // Basic validation: Check if it's an array and contains required properties
      if (!Array.isArray(parsedData) || parsedData.some(q => !q.question || !Array.isArray(q.options) || !q.answer)) {
        alert('Invalid JSON format! Please ensure it\'s an array of objects with "question", "options", and "answer".');
        return;
      }
      onGoToQuiz(parsedData);
    } catch (error) {
      alert('Invalid JSON format! Please check your syntax.');
      console.error('Error parsing JSON:', error);
    }
  };

  const handleCopyExample = async () => {
    try {
      await navigator.clipboard.writeText(EXAMPLE_JSON);
      setCopyFeedback('Copied!');
      // Clear feedback after a short delay
      setTimeout(() => {
        setCopyFeedback('');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyFeedback('Failed to copy!');
    }
  };

  return (
    <div>
      <h2>Enter Questions (JSON Format)</h2>
      <p>
        <button onClick={handleCopyExample} style={{ padding: '8px 12px', cursor: 'pointer', marginRight: '10px' }}>
          Copy Example JSON
        </button>
        {copyFeedback && <span style={{ color: 'green' }}>{copyFeedback}</span>} {/* Display feedback */}
      </p>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        rows={10}
        cols={50}
        style={{ marginBottom: '10px', display: 'block' }} // Added display:block for better layout
        placeholder={`Paste your JSON questions here, or use the 'Copy Example JSON' button above.`}
      />
      <button onClick={handleStartQuiz} style={{ marginRight: '10px', padding: '10px', cursor: 'pointer' }}>
        Start Quiz
      </button>
      <button onClick={onGoBack} style={{ padding: '10px', cursor: 'pointer' }}>
        Back to Home
      </button>
    </div>
  );
};

export default QuestionInput;