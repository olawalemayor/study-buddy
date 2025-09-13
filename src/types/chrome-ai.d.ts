// ---------------------------
// Summarizer
// ---------------------------
interface SummarizerOptions {
  sharedContext?: string; // e.g., "scientific article"
  type?: "key-points" | "summary";
  format?: "plain-text" | "html";
  length?: "short" | "medium" | "long";
  monitor?: (monitor: EventTarget) => void; // Optional progress monitoring
}

declare class Summarizer {
  constructor(options?: SummarizerOptions);

  // Instance methods
  summarize(text: string): Promise<string>;
  summarizeStreaming(text: string): AsyncGenerator<string, void, unknown>;

  // Static methods
  static availability(): Promise<
    "available" | "unavailable" | "downloading" | "downloadable"
  >;
  static create(options?: SummarizerOptions): Promise<Summarizer>;
}

// ---------------------------
// LanguageModel
// ---------------------------
interface LanguageModelOptions {
  topK?: number;
  temperature?: number;
  monitor?: (monitor: EventTarget) => void; // Optional progress monitoring
  initialPrompt?: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>;
}

declare class LanguageModel {
  inputUsage: number;
  inputQuota: number;
  constructor(options?: LanguageModelOptions);

  // Instance methods
  prompt(text: string): Promise<string>;
  promptStreaming(text: string): AsyncGenerator<string, void, unknown>;
  destroy(): void;

  // Static methods
  static availability(): Promise<
    "available" | "unavailable" | "downloading" | "downloadable"
  >;
  static create(options?: LanguageModelOptions): Promise<LanguageModel>;
}

// ---------------------------
// Translator
// ---------------------------
interface TranslatorOptions {
  targetLanguage: string; // e.g., "en", "es", "fr"
  sourceLanguage?: string;
  monitor?: (monitor: EventTarget) => void; // Optional progress monitoring
}

declare class Translator {
  constructor();

  // Instance methods
  translate(text: string): Promise<string>;
  translateStreaming(text: string): AsyncGenerator<string, void, unknown>;

  // Static methods
  static availability(opts?: {
    sourceLanguage?: string;
    targetLanguage?: string;
  }): Promise<"available" | "unavailable" | "downloading" | "downloadable">;
  static create(opt: TranslatorOptions): Promise<Translator>;
}

// ---------------------------
// LanguageDetector
// ---------------------------

interface LanguageDetectorOptions {
  monitor?: (monitor: EventTarget) => void; // Optional progress monitoring
}

declare class LanguageDetector {
  constructor();

  // Instance methods
  detect(
    text: string
  ): Promise<{ detectedLanguage: string; confidence: number }[]>; // Returns array of language codes

  // Static methods
  static availability(): Promise<
    "available" | "unavailable" | "downloading" | "downloadable"
  >;
  static create(opt: LanguageDetectorOptions): Promise<LanguageDetector>;
}

// ---------------------------
// Optional Global Attachments
// ---------------------------
interface Window {
  chrome?: {
    ai?: {
      Summarizer?: typeof Summarizer;
      LanguageModel?: typeof LanguageModel;
      Translator?: typeof Translator;
      LanguageDetector?: typeof LanguageDetector;
    };
  };
}

interface Self {
  ai?: {
    Summarizer?: typeof Summarizer;
    LanguageModel?: typeof LanguageModel;
    Translator?: typeof Translator;
    LanguageDetector?: typeof LanguageDetector;
  };
}
