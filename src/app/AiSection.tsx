"use client";
import { useState } from "react";
import {
  summarizeText,
  simplifyText,
  generateQuiz,
  translateText,
} from "./services";
import LoadingScreen from "./components/LoadingScreen";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { IQuizItem } from "./interfaces/quiz-item";

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "ja", label: "Japanese" },
];

export default function AISection() {
  const [inputText, setInputText] = useState("");
  const [loadMessage, setLoadMessage] = useState("");
  const [summary, setSummary] = useState<string | null>(null);
  const [simplified, setSimplified] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<IQuizItem | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleReset = () => {
    setSummary(null);
    setSimplified(null);
    setQuiz(null);
    setTranslation(null);
  };

  const handleSummarize = async () => {
    setLoadMessage("Generating your summary...");
    handleReset(); // reset other states
    setLoading(true);
    const result = await summarizeText(inputText);
    setSummary(result ?? "");
    setLoading(false);
  };

  const handleSimplify = async () => {
    setLoadMessage("Simplifying your text...");
    handleReset(); // reset other states
    setLoading(true);
    const result = await simplifyText(inputText);
    setSimplified(result ?? "");
    setLoading(false);
  };

  const handleQuizzes = async () => {
    setLoadMessage("Generating your quiz...");
    handleReset(); // reset other states
    setLoading(true);
    const result = await generateQuiz(inputText);
    sessionStorage.setItem("questions", JSON.stringify(result));

    setQuiz(result[0]);
    setLoading(false);
  };

  const handleTranslate = async () => {
    setLoadMessage("Translating your text...");
    handleReset(); // reset other states
    setLoading(true);
    const result = await translateText(inputText, selectedLanguage);
    setTranslation(result);
    setLoading(false);
  };

  if (loading) return <LoadingScreen message={loadMessage} />;

  return (
    <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-5">
      <div>
        <textarea
          className="textarea textarea-bordered w-full h-40 mb-4"
          placeholder="Paste or type your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <button
            className="btn btn-primary"
            onClick={handleSummarize}
            disabled={!inputText.length}>
            Summarize
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleSimplify}
            disabled={!inputText.length}>
            Simplify
          </button>
          <button
            className="btn btn-accent"
            onClick={handleQuizzes}
            disabled={!inputText.length}>
            Generate Quiz
          </button>

          <div className="flex flex-wrap gap-3 justify-center">
            <div className="flex gap-2 items-center">
              <select
                className="select select-bordered"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                disabled={!inputText.length}>
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <button
                className="btn"
                disabled={!inputText.length}
                onClick={handleTranslate}>
                Translate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        {/* Results Section */}
        {/* Summary Card */}
        {summary && (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-primary">Summary</h2>
              <div className="text-base-content/80">
                <ReactMarkdown>{summary}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {/* Simplified Explanation Card */}
        {simplified && (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-secondary">Simplified</h2>
              <div className="text-base-content/80">
                <ReactMarkdown>{simplified}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Card */}
        {quiz && (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-accent">Quiz</h2>
              <div className="text-base-content/80">
                <strong>{quiz.question}</strong>
                <ul>
                  {quiz.options.map((opt, index) => (
                    <li key={index}>
                      {index + 1}.) {opt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-actions justify-end">
                <Link href="/quiz" className="btn btn-accent btn-sm">
                  Go to Quiz
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Translation Card */}
        {translation && (
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">Translation</h2>
              <div className="text-base-content/80">{translation}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
