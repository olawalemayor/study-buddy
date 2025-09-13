"use client";

import { useEffect, useState } from "react";
import { IQuizItem } from "../interfaces/quiz-item";
import Quizinput from "../components/Quizinput";

const getOptionButtonClass = (
  option: string,
  selected: string,
  correct: string
) => {
  const baseClass = "btn w-full justify-start"; // full-width, left-aligned text

  // Before selection
  if (!selected) return baseClass + " btn-outline";

  // After selection
  if (option === correct) return baseClass + " btn-success";
  if (option === selected) return baseClass + " btn-error";

  return baseClass + " btn-outline"; // unselected wrong options
};

export default function QuizPage() {
  const [quiz, setQuiz] = useState<IQuizItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [generateMode, setGenerateMode] = useState(false);

  useEffect(() => {
    setSelectedQuiz();
  }, []);

  const setSelectedQuiz = () => {
    setGenerateMode(false);
    const stored = sessionStorage.getItem("questions");
    if (stored) {
      const parsed: IQuizItem[] = JSON.parse(stored);
      setQuiz(parsed);
      setSelectedAnswers(Array(parsed.length).fill(""));
      if (parsed.length) setGenerateMode(false);
    }
  };

  const handleSelect = (option: string) => {
    if (selectedAnswers[currentIndex]) return; // prevent changes
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = option;
    setSelectedAnswers(newAnswers);
  };

  const goNext = () => {
    if (currentIndex < quiz.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const goBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (quiz.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center py-10 px-4 mx-auto mt-12">
        <p className="text-center text-base-content/70">No quiz found.</p>
      </main>
    );
  }

  const q = quiz[currentIndex];

  return (
    <>
      {!generateMode && (
        <>
          <div className="mb-3 max-w-2xl w-full mx-auto mt-5 px-3">
            <button
              className="btn btn-secondary w-full"
              onClick={() => setGenerateMode(true)}>
              Reset
            </button>
          </div>

          <main className="flex flex-col items-center justify-center py-10 px-4 w-full max-w-2xl mx-auto mt-12">
            <h1 className="text-3xl font-bold mb-4 text-center">Quiz Time!</h1>
            <p className="text-base-content/70 mb-6">
              Question {currentIndex + 1} of {quiz.length}
            </p>

            <div className="card bg-base-100 shadow-md w-full p-6">
              <h2 className="card-title text-primary mb-4">{q.question}</h2>

              <div className="flex flex-col gap-3 mb-6">
                {q.options.map((option) => (
                  <button
                    key={option}
                    className={getOptionButtonClass(
                      option,
                      selectedAnswers[currentIndex],
                      q.answer
                    )}
                    onClick={() => handleSelect(option)}>
                    {option}
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  className="btn btn-secondary"
                  onClick={goBack}
                  disabled={currentIndex === 0}>
                  Back
                </button>
                <button
                  className="btn btn-primary"
                  onClick={goNext}
                  disabled={currentIndex === quiz.length - 1}>
                  Next
                </button>
              </div>
            </div>
          </main>
        </>
      )}
      {generateMode && (
        <div className="mb-3 px-2 max-w-2xl w-full mx-auto mt-32 flex items-center justify-center">
          <Quizinput onGenerate={() => setSelectedQuiz()} />
        </div>
      )}
    </>
  );
}
