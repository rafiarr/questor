// src/components/QuizPage.tsx
import React, { useState, useEffect } from 'react';
import type { Question } from '../types/question';

interface QuizPageProps {
  questions: Question[];
  onGoToResult: (score: number, totalQuestions: number) => void;
  onGoBackToInput: () => void;
  initialScore: number; // Receive initial score from App
}

const QuizPage: React.FC<QuizPageProps> = ({ questions, onGoToResult, onGoBackToInput, initialScore }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(initialScore);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    // Reset state when questions change (e.g., going back and starting again)
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(initialScore);
    setIsAnswered(false);
  }, [questions, initialScore]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (answer: string) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      if (answer === currentQuestion.answer) {
        setScore((prevScore) => prevScore + 1);
      } else {
        onGoToResult(score, questions.length); // Pass score and total questions
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      onGoToResult(score, questions.length);
    }
  };

  return (
    <div>
      <h2>Quiz Time!</h2>
      {currentQuestion ? (
        <div>
          <h3>{currentQuestion.question}</h3>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswerClick(option)}
                style={{
                  cursor: 'pointer',
                  marginBottom: '5px',
                  padding: '8px',
                  border: '1px solid #eee',
                  backgroundColor: selectedAnswer === option ? (option === currentQuestion.answer ? '#d4edda' : '#f8d7da') : 'white',
                  color: selectedAnswer === option ? (option === currentQuestion.answer ? '#155724' : '#721c24') : 'black',
                }}
              >
                {option}
              </li>
            ))}
          </ul>
          {isAnswered ? (
            <button onClick={handleNextQuestion} style={{ marginTop: '15px', padding: '10px', cursor: 'pointer' }}>
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          ) : (
            <p>Select your answer.</p>
          )}
        </div>
      ) : (
        <p>No questions loaded.</p>
      )}
      <button onClick={onGoBackToInput} style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}>
        Back to Input
      </button>
    </div>
  );
};

export default QuizPage;