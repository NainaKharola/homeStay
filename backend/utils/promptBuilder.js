/**
 * Sanitizes and truncates string input to prevent prompt injection or excessive payload.
 * @param {any} val - Input value
 * @param {number} maxLen - Maximum allowed length
 * @returns {string}
 */
const sanitizeInput = (val, maxLen = 300) => {
  if (!val || typeof val !== "string") return "";
  return val.trim().replace(/[\r\n]+/g, " ").slice(0, maxLen);
};

/**
 * Builds a structured prompt for Google Gemini API to generate a property description.
 * @param {Object} data - Input payload containing property details
 * @returns {string} Formatted prompt string for Gemini
 */
const buildPropertyPrompt = (data = {}) => {
  const title = sanitizeInput(data.title);
  const location = sanitizeInput(data.location);
  const price = sanitizeInput(data.price?.toString());
  const bedrooms = sanitizeInput(data.bedrooms?.toString(), 50);
  const bathrooms = sanitizeInput(data.bathrooms?.toString(), 50);
  const propertyType = sanitizeInput(data.propertyType, 100);
  const amenities = sanitizeInput(data.amenities);
  const additionalInfo = sanitizeInput(data.additionalInfo);

  const prompt = `
You are an expert real estate copywriter. Write a high-converting, professional, and attractive real estate listing description for a homestay property based on the following details:

Property Details:
- Title: ${title || "Charming Homestay"}
- Location: ${location || "India"}
${price ? `- Price per night: Rs. ${price}` : ""}
${propertyType ? `- Property Type: ${propertyType}` : ""}
${bedrooms ? `- Bedrooms: ${bedrooms}` : ""}
${bathrooms ? `- Bathrooms: ${bathrooms}` : ""}
${amenities ? `- Key Amenities: ${amenities}` : ""}
${additionalInfo ? `- Additional Details / Notes: ${additionalInfo}` : ""}

STRICT Output Guidelines:
1. Tone: Attractive, warm, persuasive, and professional.
2. Content: Naturally highlight the key amenities and mention typical scenic or nearby local attractions for ${location || "the area"}.
3. Word Count: Strictly between 120 and 180 words.
4. Formatting: Write ONLY ONE SINGLE CONTINUOUS PARAGRAPH.
5. NO MARKDOWN: Do NOT use any bolding (**), italics (*), bullet points, title headers, or markdown syntax. Plain text paragraph ONLY.
`.trim();

  return prompt;
};

module.exports = {
  buildPropertyPrompt,
  sanitizeInput,
};
