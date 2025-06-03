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

  // Ensure currentQuestion is valid
  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <div>
        <p>No questions available or quiz completed.</p>
        <button onClick={onGoBackToInput} style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}>
          Back to Input
        </button>
      </div>
    );
  }

  const handleAnswerClick = (answer: string) => {
    if (!isAnswered) { // Only allow answering if not already answered
      setSelectedAnswer(answer);
      setIsAnswered(true); // Mark as answered
      if (answer === currentQuestion.answer) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    // Reset selection and answered status for the next question
    setSelectedAnswer(null);
    setIsAnswered(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to next question
    } else {
      // All questions answered, go to result page
      onGoToResult(score, questions.length);
    }
  };

  const getOptionStyle = (option: string) => {
    if (!isAnswered) {
      // Before answering, all options are normal
      return {
        cursor: 'pointer',
        marginBottom: '5px',
        padding: '8px',
        border: '1px solid #eee',
        backgroundColor: 'white',
        color: 'black',
      };
    }

    // After answering:
    const style = {
      cursor: 'not-allowed', // Disable clicking after answer
      marginBottom: '5px',
      padding: '8px',
      border: '1px solid #eee',
      backgroundColor: 'white',
      color: 'black',
    };

    if (option === currentQuestion.answer) {
      // Correct answer
      style.backgroundColor = '#d4edda'; // Light green
      style.color = '#155724'; // Dark green text
      style.border = '1px solid #28a745'; // Green border
    } else if (option === selectedAnswer) {
      // Selected wrong answer
      style.backgroundColor = '#f8d7da'; // Light red
      style.color = '#721c24'; // Dark red text
      style.border = '1px solid #dc3545'; // Red border
    }

    return style;
  };

  return (
    <div>
      <h2>Quiz Time!</h2>
      {/* Progress Indicator */}
      <p style={{ fontWeight: 'bold' }}>
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>

      <div>
        <h3>{currentQuestion.question}</h3>
        <ul>
          {currentQuestion.options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleAnswerClick(option)}
              style={getOptionStyle(option)} // Apply dynamic styles
            >
              {option}
            </li>
          ))}
        </ul>

        {/* Show Next Question/Finish Quiz button only after an answer is selected */}
        {isAnswered && (
          <button onClick={handleNextQuestion} style={{ marginTop: '15px', padding: '10px', cursor: 'pointer' }}>
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        )}
      </div>

      <button onClick={onGoBackToInput} style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}>
        Back to Input
      </button>
    </div>
  );
};

export default QuizPage;