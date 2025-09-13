export const simplifyText = async (text: string): Promise<string> => {
  // User must have interacted with the page
  if (!navigator.userActivation.isActive) {
    console.warn("User interaction required to use the AI API.");
    return "Please interact with the page to enable AI features.";
  }

  // Check if LanguageModel class exists globally
  if (typeof LanguageModel === "undefined") {
    console.warn("AI LanguageModel API not supported in this browser.");
    return "This is a mock simplified text for demo purposes.";
  }

  try {
    // Check API availability
    const availability = await LanguageModel.availability();
    if (availability === "unavailable") {
      console.warn("LanguageModel API is unavailable.");
      return "This is a mock simplified text for demo purposes.";
    }

    // Create LanguageModel instance
    const session = await LanguageModel.create({
      monitor(m) {
        m.addEventListener("downloadprogress", (e: unknown) => {
          console.log(`Downloaded ${(e as { loaded: number }).loaded * 100}%`);
        });
      },
    });

    const prompt = `${text}
    
    simplify to a 12 years old, make it short and clear
    `;

    // Stream response
    let result = "";
    for await (const chunk of session.promptStreaming(prompt)) {
      result += chunk;
    }

    return result;
  } catch (err) {
    console.error("Error during simplification:", err);
    return "Error generating simplified text. Using mock result instead.";
  }
};
