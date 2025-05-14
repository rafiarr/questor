import React, { useState } from 'react';
import type { Question } from '../types/question';

interface QuestionInputProps {
  onGoToQuiz: (data: Question[]) => void;
  onGoBack: () => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({ onGoToQuiz, onGoBack }) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleStartQuiz = () => {
    try {
      const parsedData = JSON.parse(inputText);
      onGoToQuiz(parsedData);
    } catch (error) {
      alert('Invalid JSON format!');
      console.error('Error parsing JSON:', error);
    }
  };

  return (
    <div>
      <h2>Enter Questions (JSON Format)</h2>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        rows={10}
        cols={50}
        style={{ marginBottom: '10px' }}
        placeholder={`Example JSON:
[
  {
    "question": "What is the capital of France?",
    "options": ["Berlin", "Madrid", "Paris", "Rome"],
    "answer": "Paris"
  },
  {
    "question": "What is 2 + 2?",
    "options": ["3", "4", "5", "6"],
    "answer": "4"
  }
]`}
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