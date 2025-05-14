import React, { useState } from 'react';
import type { Question } from './types/question';
import HomePage  from './components/HomePage';
import QuestionInput from './components/QuestionInput'; // We'll create this next
import QuizPage from './components/QuizPage';       // We'll create this later
import ResultPage from './components/ResultPage';      // We'll create this later
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'input' | 'quiz' | 'result'>('home');
  const [questionsData, setQuestionsData] = useState<Question[] | null>(null); // To store the input questions
  const [quizScore, setQuizScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const goToInputPage = () => {
    setCurrentPage('input');
    setQuizScore(0);
  };

  const goToQuizPage = (data: Question[]) => {
    setQuestionsData(data);
    setTotalQuestions(data.length);
    setCurrentPage('quiz');
    setQuizScore(0);
  };

  const goToResultPage = (score: number, total: number) => {
    setQuizScore(score);
    setTotalQuestions(total);
    setCurrentPage('result');
  };

  const goToHomePage = () => {
    setCurrentPage('home');
    setQuestionsData(null);
    setQuizScore(0);
    setTotalQuestions(0);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {currentPage === 'home' && (
          <HomePage onGoToInput={goToInputPage} />
        )}
        {currentPage === 'input' && (
          <QuestionInput onGoToQuiz={goToQuizPage} onGoBack={goToHomePage} />
        )}
        {currentPage === 'quiz' && questionsData && (
          <QuizPage
            questions={questionsData}
            onGoToResult={goToResultPage}
            onGoBackToInput={goToInputPage}
            initialScore={quizScore} // Pass the current score
          />
        )}
        {currentPage === 'result' && (
          <ResultPage onGoToHome={goToHomePage} score={quizScore} totalQuestions={totalQuestions} />
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;