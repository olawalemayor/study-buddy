import { IQuizItem } from "../interfaces/quiz-item";
import { parseMarkdownJSON } from "../utils/md2json";

export const generateQuiz = async (text: string): Promise<IQuizItem[]> => {
  // User must have interacted with the page
  if (!navigator.userActivation.isActive) {
    console.warn("User interaction required to use the AI API.");
    throw "Please interact with the page to enable AI features.";
  }

  // Check if LanguageModel class exists globally
  if (typeof LanguageModel === "undefined") {
    console.warn("AI LanguageModel API not supported in this browser.");
    throw "This is a mock simplified text for demo purposes.";
  }

  try {
    // Check API availability
    const availability = await LanguageModel.availability();
    if (availability === "unavailable") {
      console.warn("LanguageModel API is unavailable.");
      throw "This is a mock simplified text for demo purposes.";
    }

    // Create LanguageModel instance
    const session = await LanguageModel.create({
      topK: 3,
      temperature: 1,
      monitor(m) {
        m.addEventListener("downloadprogress", (e: unknown) => {
          console.log(`Downloaded ${(e as { loaded: number }).loaded * 100}%`);
        });
      },
    });

    const prompt = `${text}
    
    Generate 10 quiz questions
    return in JSON string like this:
    {question:string, options: string[], answer: string}[]
    `;

    // Stream response
    let result = "";
    for await (const chunk of session.promptStreaming(prompt)) {
      result += chunk;
    }

    const json = parseMarkdownJSON<IQuizItem[]>(result);

    return json;
  } catch (err) {
    console.error("Error during simplification:", err);
    throw err;
  }
};
