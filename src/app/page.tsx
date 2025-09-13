import AISection from "./AiSection";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center py-10 px-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-4">AI Study Buddy</h1>
      <p className="text-center text-base-content/70 max-w-xl mb-20">
        Paste your text below and let AI help you learn better with summaries,
        kid-friendly explanations, quizzes, and translations.
      </p>

      {/* AI Input + Results (Client Component) */}
      <AISection />
    </main>
  );
}
