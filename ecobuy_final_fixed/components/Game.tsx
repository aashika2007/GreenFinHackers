
import React, { useState } from 'react';
import { SUSTAINABILITY_QUIZ } from '../constants';

interface GameProps {
  onComplete: (points: number) => void;
}

const Game: React.FC<GameProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === SUSTAINABILITY_QUIZ[currentQuestion].answer) {
      setScore(score + 100);
    }

    if (currentQuestion + 1 < SUSTAINABILITY_QUIZ.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      onComplete(score + (index === SUSTAINABILITY_QUIZ[currentQuestion].answer ? 100 : 0));
    }
  };

  if (showResult) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🏆</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
        <p className="text-gray-500 mb-6">You earned {score} Eco-points for your sustainability knowledge.</p>
        <button 
          onClick={() => { setShowResult(false); setCurrentQuestion(0); setScore(0); }}
          className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          Play Again
        </button>
      </div>
    );
  }

  const q = SUSTAINABILITY_QUIZ[currentQuestion];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-2xl mx-auto border border-green-50">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-800">Eco-Master Quiz</h2>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
          {currentQuestion + 1} / {SUSTAINABILITY_QUIZ.length}
        </span>
      </div>

      <p className="text-2xl font-semibold text-gray-900 mb-8">{q.question}</p>

      <div className="space-y-4">
        {q.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-green-500 hover:bg-green-50 transition-all font-medium text-gray-700"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Game;
