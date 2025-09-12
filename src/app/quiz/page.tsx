// app/quiz/page.tsx
export default function QuizPage() {
  return (
    <main className="flex flex-col items-center justify-center py-10 px-4">
      {/* Progress */}
      <p className="text-sm text-base-content/70 mb-4">Question 1 of 5</p>

      {/* Question */}
      <h2 className="text-2xl font-bold text-center mb-6">
        What is the main cause of climate change?
      </h2>

      {/* Answer Options */}
      <div className="w-full max-w-md flex flex-col gap-3">
        <button className="btn btn-outline">Deforestation</button>
        <button className="btn btn-outline">Burning fossil fuels</button>
        <button className="btn btn-outline">Volcanic eruptions</button>
        <button className="btn btn-outline">Ocean currents</button>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-8">
        <button className="btn">Back</button>
        <button className="btn btn-primary">Next</button>
      </div>
    </main>
  );
}
