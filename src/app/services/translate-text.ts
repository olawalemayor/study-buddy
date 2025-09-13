// app/services/summarize-text.ts
export const translateText = async (
  text: string,
  toLang: string
): Promise<string> => {
  // User must have interacted with the page
  if (!navigator.userActivation.isActive) {
    console.warn("User interaction required to use the AI API.");
    return text;
  }

  // Check if Summarizer class exists globally
  if (
    typeof Translator === "undefined" ||
    typeof LanguageDetector === "undefined"
  ) {
    console.warn("AI Summarizer API not supported in this browser.");
    return text;
  }

  const detector = await LanguageDetector.create({
    monitor(m) {
      m.addEventListener("downloadprogress", (e: unknown) => {
        console.log(`Downloaded ${(e as { loaded: number }).loaded * 100}%`);
      });
    },
  });

  const detections = await detector.detect(text);

  const sorted = detections.sort((a, b) => b.confidence - a.confidence);

  if (sorted[0].confidence < 0.8) return text;

  try {
    // Check API availability
    const translatorCapabilities = await Translator.availability({
      sourceLanguage: sorted[0].detectedLanguage,
      targetLanguage: toLang,
    });

    if (translatorCapabilities === "unavailable") {
      console.warn("Summarizer API is unavailable.");
      return text;
    }

    const translate = await Translator.create({
      sourceLanguage: sorted[0].detectedLanguage,
      targetLanguage: toLang,
      monitor(m) {
        m.addEventListener("downloadprogress", (e: unknown) => {
          console.log(`Downloaded ${(e as { loaded: number }).loaded * 100}%`);
        });
      },
    });

    // Stream summary
    let result = "";
    for await (const chunk of translate.translateStreaming(text)) {
      result += chunk;
    }

    return result;
  } catch (err) {
    console.error("Error during summarization:", err);
    return text;
  }
};
