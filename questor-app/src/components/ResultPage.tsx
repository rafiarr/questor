// src/components/ResultPage.tsx
import React from 'react';

interface ResultPageProps {
  onGoToHome: () => void;
  score: number; // We'll need to pass the score to this component
  totalQuestions: number; // We'll also need to pass the total number of questions
}

const ResultPage: React.FC<ResultPageProps> = ({ onGoToHome, score, totalQuestions }) => {
  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Your final score is: {score} out of {totalQuestions}</p>
      <button onClick={onGoToHome} style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}>
        Back to Home
      </button>
    </div>
  );
};

export default ResultPage;