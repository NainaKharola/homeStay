# HomeStay

HomeStay is a full-stack property rental web application built as part of the **AI-Assisted Full Stack Web Development Internship**. The application allows users to browse rental properties using a React frontend, an Express.js backend, and MongoDB Atlas for data storage.

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

---

## Project Structure

```text
homeStay/
│
├── src/                 # React frontend
├── backend/             # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── data/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

## Frontend Setup

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend in development mode:

```bash
npm run dev
```

Or start it in production mode:

```bash
npm start
```

Backend runs at:

```text
http://localhost:5000
```

---

## REST API Endpoints

| Method | Endpoint                    | Description          |
| ------ | --------------------------- | -------------------- |
| GET    | `/api/properties`           | Get all properties   |
| GET    | `/api/properties/:id`       | Get a property by ID |
| POST   | `/api/properties`           | Create a property    |
| PUT    | `/api/properties/:id`       | Update a property    |
| DELETE | `/api/properties/:id`       | Delete a property    |
| GET    | `/api/properties/search?q=` | Search properties    |

---

## Features

* Responsive React frontend
* Express.js REST API
* MongoDB Atlas integration
* Mongoose ODM
* CRUD operations
* Property search
* Error handling middleware
* CORS configuration
* Environment variable support

---

## Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas
