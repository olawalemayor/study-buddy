/**
 * Converts a JSON block formatted in Markdown into a JSON object/array.
 * @param markdown - The Markdown string containing JSON (```json ... ```)
 * @returns The parsed JSON object/array
 */
export function parseMarkdownJSON<T>(markdown: string): T {
  // Remove the ```json and ``` fences
  const cleaned = markdown
    .replace(/```json\s*/, "") // remove opening ```json
    .replace(/```$/, ""); // remove closing ```

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    throw err;
  }
}
