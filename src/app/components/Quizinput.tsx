"use client";
import React, { useState } from "react";
import { generateQuiz } from "../services";
import LoadingScreen from "./LoadingScreen";

const Quizinput = ({ onGenerate }: { onGenerate: (val: boolean) => void }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQuizzes = async () => {
    setLoading(true);
    const result = await generateQuiz(inputText);
    sessionStorage.setItem("questions", JSON.stringify(result));
    setLoading(false);
    onGenerate(true);
  };

  if (loading) return <LoadingScreen message="Generating your quiz..." />;

  return (
    <div className="w-full">
      <textarea
        className="textarea textarea-bordered w-full h-40 mb-4"
        placeholder="Paste or type your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button
        className="btn btn-accent w-full"
        onClick={handleQuizzes}
        disabled={!inputText.length}>
        Generate Quiz
      </button>
    </div>
  );
};

export default Quizinput;
