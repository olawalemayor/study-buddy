export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center py-10 px-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-4">AI Study Buddy</h1>
      <p className="text-center text-base-content/70 max-w-xl mb-8">
        Paste your text below and let AI help you learn better with summaries,
        kid-friendly explanations, quizzes, and translations.
      </p>

      {/* Input Section */}
      <div className="w-full max-w-2xl mb-10">
        <textarea
          className="textarea textarea-bordered w-full h-40 mb-4"
          placeholder="Paste or type your text here..."></textarea>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="btn btn-primary">Summarize</button>
          <button className="btn btn-secondary">Simplify</button>
          <button className="btn btn-accent">Generate Quiz</button>
          <button className="btn">Translate</button>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full max-w-4xl grid gap-6 md:grid-cols-2">
        {/* Summary Card */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-primary">Summary</h2>
            <p className="text-base-content/80">
              Your summarized text will appear here after you click the button.
            </p>
          </div>
        </div>

        {/* Simplified Explanation Card */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-secondary">Simplified</h2>
            <p className="text-base-content/80">
              A kid-friendly explanation of your text will be shown here.
            </p>
          </div>
        </div>

        {/* Quiz Card */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-accent">Quiz</h2>
            <p className="text-base-content/80">
              Practice questions will be generated here.
            </p>
            <div className="card-actions justify-end">
              <a href="/quiz" className="btn btn-accent btn-sm">
                Go to Quiz
              </a>
            </div>
          </div>
        </div>

        {/* Translation Card */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">Translation</h2>
            <p className="text-base-content/80">
              Your translated text will appear here in the selected language.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
