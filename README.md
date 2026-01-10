# 🤖 LearnAI: AI Learning Assistant Application

LearnAI is a full-stack learning platform that leverages the power of Artificial Intelligence to transform static study materials into interactive learning experiences. Built using the **MERN (MongoDB, Express, React, Node.js)** stack, it provides students with AI-driven tools like document summarization, automated quiz generation, and context-aware chat assistants.

---

## 🛠️ Tech Stack

### Frontend
- **React** (Functional Components & Hooks)
- **Tailwind CSS** (Modern, responsive UI)
- **Axios** (API communication)

### Backend
- **Node.js & Express.js** (RESTful API)
- **MongoDB & Mongoose** (Database & Schema modeling)
- **Google Gemini API** (AI Engine)
- **Multer** (Document & Image storage)

  ---

## 📋 Installation & Setup

### 1. Prerequisites

- Node.js (LTS or higher)
- MongoDB account (Atlas or local)
- AI API Key (Gemini)

### 2. Clone the Repository

```bash
git clone https://github.com/Gowrisankar24/AI-Learning-Application.git
cd AI-Learning-Application
```
### 3. Backend Configuration

  ### 3.1 Navigate to the ```backend``` directory and install dependencies:

```bash
cd backend
npm install
```
Create a ```.env```file in the server folder:

```bash
GEMINI_API_KEY= <your-gemini-api-key>
JWT_EXPIRE=<token expiry limit(in days)>
JWT_SECRET=<jwt-secret-token>
MAX_FILE_SIZE=<max-file-size>
MONGODB_URI=<your-mongo-uri>
NODE_ENV=<environment>
PORT=<your-localhost-url>
BLOB_READ_WRITE_TOKEN=<vercel-blob-token>
CLIENT_URL=<frontend-url>
```

  ### 3.2. Start the server:

     npm run dev

### 4. Frontend Configuration
  ### 4.1 Navigate to the ```frontend``` directory and install dependencies:
  ```
    cd ../client
    npm install
```
  ### 4.2 Start the development server:
 
  ```
  npm run dev
  ```

---
## 📐 Architecture Overview:

The application follows a standard Client-Server-Database architecture. The React frontend communicates with the Express backend via REST APIs. When a user requests an AI feature (like summarization), the backend sends the relevant document context to the AI model and returns the processed insights to the frontend.

---

## 📂 Project Structure

```bash
├── backend/             # Express backend 
│   ├── config/          # mongoose config
│   ├── controllers/     # Route logic & AI prompts
│   ├── middleware/      # auth
│   ├── model/           # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── utils/           # AI API configurations
├── frontend/            # React  frontend
│   ├── public/          # images and favicon.ico
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Reusable UI components
│   │   ├──pages/        # Dashboard, Home, Chat
│   │   ├── services/    # Api call
│   │   └── utils/       # Reusable funcition logic
└── README.md
```

    
