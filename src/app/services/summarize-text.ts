// app/services/summarize-text.ts
export const summarizeText = async (text: string): Promise<string> => {
  // User must have interacted with the page
  if (!navigator.userActivation.isActive) {
    console.warn("User interaction required to use the AI API.");
    return "Please interact with the page to enable AI features.";
  }

  // Check if Summarizer class exists globally
  if (typeof Summarizer === "undefined") {
    console.warn("AI Summarizer API not supported in this browser.");
    return "This is a mock summary of your text for demo purposes.";
  }

  try {
    // Check API availability
    const availability = await Summarizer.availability();
    if (availability === "unavailable") {
      console.warn("Summarizer API is unavailable.");
      return "This is a mock summary of your text for demo purposes.";
    }

    // Create Summarizer instance
    const options: SummarizerOptions = {
      sharedContext: "This is a scientific article",
      type: "key-points",
      format: "plain-text",
      length: "short",
      monitor(m) {
        m.addEventListener("downloadprogress", (e: unknown) => {
          console.log(`Downloaded ${(e as { loaded: number }).loaded * 100}%`);
        });
      },
    };

    const summarizer = await Summarizer.create(options);

    // Stream summary
    let result = "";
    for await (const chunk of summarizer.summarizeStreaming(text)) {
      result += chunk;
    }

    return result;
  } catch (err) {
    console.error("Error during summarization:", err);
    return "Error generating summary. Using mock result instead.";
  }
};
