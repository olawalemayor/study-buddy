// app/about/page.tsx
export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        About Study Buddy
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🌍 The Problem</h2>
        <p className="text-base-content/80">
          Learning about complex topics like climate change can feel
          overwhelming, especially for young learners or those studying in a
          second language.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">💡 Our Solution</h2>
        <p className="text-base-content/80">
          Study Buddy uses AI to simplify content, summarize lessons, translate
          into multiple languages, and even generate quizzes to make learning
          interactive.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🚀 How It Works</h2>
        <ul className="list-disc list-inside text-base-content/80">
          <li>Summarize long text into key insights</li>
          <li>Rewrite content into simple, kid-friendly language</li>
          <li>Generate quizzes for active recall</li>
          <li>Translate into multiple languages</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🛠️ Built With</h2>
        <p className="text-base-content/80">
          Next.js, DaisyUI, Tailwind CSS, and Google AI APIs (Summarizer,
          Rewriter, Prompt, Translator). Deployed on Vercel.
        </p>
      </section>
    </main>
  );
}
