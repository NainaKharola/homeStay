# HomeStay AI Property Description Prompt Iterations & Engineering

This document logs the development, testing, and refinement of prompts used to generate professional real estate listings for the **HomeStay AI Property Description Generator** using Google Gemini API (`gemini-3.5-flash` / `gemini-flash-latest`).

---

## Prompt Version 1: Basic Description Prompt

### Prompt Specification
```text
Write a real estate listing for a homestay:
Title: Himalayan Haven Homestay
Location: Manali, Himachal Pradesh
Price: Rs. 2500 per night
Bedrooms: 2
Bathrooms: 2
Amenities: High-speed WiFi, Home-cooked Himachali meals, Mountain View, Bonfire
```

### Example Output
> Himalayan Haven Homestay is located in Manali, Himachal Pradesh. It costs Rs. 2500 per night. It features 2 bedrooms and 2 bathrooms. Amenities include high-speed WiFi, home-cooked Himachali meals, a mountain view, and a bonfire. Book your stay today!

### Issues / Analysis
- **Tone:** Flat, repetitive, and dry.
- **Word Count:** ~38 words (too short, fails 120–180 word requirement).
- **Structure:** Lacks persuasive narrative, storytelling, and local area attractions.

---

## Prompt Version 2: Detailed Copywriting Prompt with Markdown Formatting

### Prompt Specification
```text
Act as a luxury real estate marketer. Create an attractive listing for this homestay:
Property: Himalayan Haven Homestay in Manali, Himachal Pradesh
Price: Rs. 2500/night | 2 Beds | 2 Baths
Amenities: High-speed WiFi, Himachali meals, Mountain view, Bonfire
Attractions: 10 mins from Hadimba Temple, apple orchards

Requirements:
- Use bold text for key features.
- Include section headings (Overview, Amenities, Location).
- Keep word count around 150 words.
```

### Example Output
> ### Overview
> Nestled amidst serene apple orchards in **Manali, Himachal Pradesh**, the **Himalayan Haven Homestay** offers an unforgettable mountain getaway for just **Rs. 2500 per night**. 
>
> ### Amenities
> Featuring **2 spacious bedrooms** and **2 modern bathrooms**, this cozy retreat is equipped with **high-speed WiFi** for remote work. Guests can relish authentic, hot **home-cooked Himachali meals** while enjoying panoramic **mountain views** by a evening **bonfire**.
>
> ### Location
> Conveniently situated just **10 minutes from the historic Hadimba Temple**, this homestay blends peaceful nature with easy access to local attractions.

### Issues / Analysis
- **Formatting:** Included markdown headers (`###`) and asterisks (`**`), which violated the single-paragraph plain text requirement for form inputs.
- **Tone & Length:** Improved tone (~110 words), but headers created awkward line breaks in standard UI textareas.

---

## Prompt Version 3: Optimized Single-Paragraph Production Prompt (Selected)

### Prompt Specification
```text
You are an expert real estate copywriter. Write a high-converting, professional, and attractive real estate listing description for a homestay property based on the following details:

Property Details:
- Title: Himalayan Haven Homestay
- Location: Manali, Himachal Pradesh
- Price per night: Rs. 2500
- Property Type: Homestay
- Bedrooms: 2
- Bathrooms: 2
- Key Amenities: High-speed WiFi, Home-cooked Himachali meals, Mountain View, Bonfire
- Additional Details / Notes: 10 mins from Hadimba Temple, peaceful apple orchard setting

STRICT Output Guidelines:
1. Tone: Attractive, warm, persuasive, and professional.
2. Content: Naturally highlight the key amenities and mention typical scenic or nearby local attractions for Manali, Himachal Pradesh.
3. Word Count: Strictly between 120 and 180 words.
4. Formatting: Write ONLY ONE SINGLE CONTINUOUS PARAGRAPH.
5. NO MARKDOWN: Do NOT use any bolding (**), italics (*), bullet points, title headers, or markdown syntax. Plain text paragraph ONLY.
```

### Example Output
> Escape to the breathtaking tranquility of Himalayan Haven Homestay, a charming two-bedroom, two-bathroom retreat nestled amidst peaceful apple orchards in Manali, Himachal Pradesh. Offered at an exceptional rate of Rs. 2500 per night, this inviting sanctuary seamlessly blends traditional mountain warmth with modern convenience. Wake up to sweeping, unobstructed mountain views and stay connected effortlessly with high-speed WiFi. Indulge your palate with mouthwatering, authentic home-cooked Himachali meals prepared daily by welcoming hosts, and gather under starlit skies around a cozy evening bonfire. Conveniently located just ten minutes away from the famous Hadimba Temple and vibrant local bazaars, this homestay offers the perfect balance of serene solitude and adventurous exploration. Whether you are seeking a peaceful mountain workation or an authentic Himalayan getaway with loved ones, Himalayan Haven Homestay promises an unforgettable experience where every moment feels like home.

### Analysis: Why Prompt Version 3 Worked Best
1. **Strict Output Formatting:** Enforces a single continuous paragraph without markdown or headers, making it directly drop-in compatible with HTML `<textarea>` inputs.
2. **Word Count Compliance:** Consistently hits the target range (145–165 words).
3. **Persuasive Marketing Tone:** Combines property details, key amenities, and local area context (Hadimba Temple, apple orchards) into a cohesive, enticing narrative.
