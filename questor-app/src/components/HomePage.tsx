import React from 'react';

interface HomePageProps {
  onGoToInput: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGoToInput }) => {
  return (
    <div>
      <h2>Welcome to Questor!</h2>
      <p>Ready to create and take quizzes?</p>
      <button onClick={onGoToInput} style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}>
        Go to Input Questions
      </button>
    </div>
  );
};

export default HomePage;