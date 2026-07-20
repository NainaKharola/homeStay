# HomeStay

HomeStay is a full-stack MERN web application developed as part of the **AI-Assisted Full Stack Web Development Internship**. The application allows users to browse rental properties through a modern React frontend while an Express.js backend provides REST APIs. Property data is stored persistently using **MongoDB Atlas** and managed with **Mongoose ODM**.

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose ODM

## Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

# Project Structure

```text
homeStay/
│
├── assets/
│   └── DatabaseSchema.png
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   └── services/
│
├── public/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── data/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
│
├── package.json
└── README.md
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/NainaKharola/homeStay.git
```

Move into the project folder

```bash
cd homeStay
```

---

# Frontend Setup

Install frontend dependencies

```bash
npm install
```

Run the frontend

```bash
npm run dev
```

Frontend runs on

```text
http://localhost:5173
```

---

# Backend Setup

Navigate to the backend folder

```bash
cd backend
```

Install backend dependencies

```bash
npm install
```

Create a `.env` file inside the backend folder

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start the backend

```bash
npm run dev
```

or

```bash
npm start
```

Backend runs on

```text
http://localhost:5000
```

---

# Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

> **Important:** Never commit your `.env` file or database credentials to GitHub.

---

# Database

The HomeStay application uses **MongoDB Atlas** as its cloud-hosted database and **Mongoose** as the ODM (Object Data Modeling) library.

### Current Collections

- User *(planned)*
- Property
- Booking *(planned)*

### Database Features

- Persistent cloud storage
- MongoDB Atlas integration
- Mongoose schema validation
- Full CRUD operations
- Fast document queries
- Environment variable support

---

# Database Schema

The HomeStay application is designed around three primary entities.

### Collections

- User
- Property
- Booking

### Relationships

- One User can own multiple Properties.
- One User can create multiple Bookings.
- One Property can have multiple Bookings.

![Database Schema](assets/DatabaseSchema.png)

---

## AI API Integration

- **Google Gemini API (`gemini-3.5-flash` / `gemini-flash-latest`)**
- `@google/generative-ai` SDK

---

# Features

- Responsive React frontend with Tailwind CSS
- JWT Authentication (Email/Password & Google OAuth 2.0)
- Protected routes & user session state
- RESTful Express API with MongoDB Atlas persistence
- **AI Property Description Generator**: Instant, professional real estate descriptions powered by Google Gemini 3.5 Flash
- Complete Property CRUD operations
- Centralized error handling & stack trace logging
- Environment variable security & input sanitization
- CORS & rate limiting configuration

---

# AI Feature: Property Description Generator

The **AI Property Description Generator** allows property owners to create compelling, high-converting listing descriptions in seconds before publishing a property.

### Key Capabilities:
- Custom input parameters: Title, Location, Price per night, Bedrooms, Bathrooms, Property Type, Amenities, Additional Notes.
- Uses **Google Gemini 3.5 Flash** (with dynamic fallback) for rapid, natural language generation.
- Strict prompt formatting ensuring a clean, 120–180 word single paragraph without markdown artifacts.
- Copy to clipboard & direct one-click application into the Property Manager form.

### How to Obtain a Google Gemini API Key:
1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **Get API key** -> **Create API key in new project**.
4. Copy your generated API key.
5. Add it to your `backend/.env` file:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

---

# REST API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | User login |
| GET | `/api/auth/google` | Public | Initiate Google OAuth |
| GET | `/api/auth/google/callback` | Public | Google OAuth callback |
| GET | `/api/auth/me` | Private | Get authenticated user profile |
| GET | `/api/properties` | Public | Get all properties |
| GET | `/api/properties/:id` | Public | Get property by ID |
| POST | `/api/properties` | Private | Create a property |
| PUT | `/api/properties/:id` | Private | Update a property |
| DELETE | `/api/properties/:id` | Private | Delete a property |
| POST | `/api/ai/property-description` | Private | Generate AI property description |

---

# Environment Variables

Create a `.env` file inside the **backend** folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
FRONTEND_URL=https://home-stay-liard-ten.vercel.app
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALLBACK_URL=http://localhost:5000/api/auth/google/callback
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
GEMINI_API_KEY=your_google_gemini_api_key
```

> **Important:** Never commit your `.env` file or API keys to version control. Verified `.env` is ignored in `.gitignore`.

---

# Prompt Engineering Documentation

For full details on the prompt iteration versions (1, 2, and 3), example inputs, example outputs, and prompt design decisions, refer to [PROMPTS.md](PROMPTS.md).

---

# Author

Developed as part of the **AI-Assisted Full Stack Web Development Internship** using the MERN Stack.
