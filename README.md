# 💬 Real-Time Chat Application

A modern real-time chat application that allows users to communicate instantly using WebSockets. The app supports live messaging, user presence, and responsive UI for seamless conversations.

[Live Demo Link](https://quick-chat-frontend-jet.vercel.app/)

---

## 🚀 Features

- ⚡ Real-time messaging
- 🔐 Custom JWT Authentication (no 3rd-party auth)
- ⚡ Real-time Messaging via Socket.io
- 🟢 Online/Offline Presence Indicators
- 🗂️ Image Uploads (Cloudinary)
- 🧰 REST API with Node.js & Express
- 🧱 MongoDB for Data Persistence
- 🎨 Beautiful UI with React, Tailwind CSS & DaisyUI
- 🧠 Zustand for State Management

---

## 🛠️ Tech Stack

**Frontend**
- React.js (Vite)
- Tailwind CSS & DaisyUI
- Zustand
- Socket.io-client

**Backend**
- Node.js
- Express.js
- Socket.IO
- Cloudinary (Image Hosting)

**Database**
- MongoDB

**Authentication**
- JWT (JSON Web Token)

---

## 🧠 Technical Highlights (What I Learned)

**WebSocket Handshaking:** Engineered connection lifecycle management to accurately map Socket IDs to MongoDB User IDs, ensuring reliable message delivery.

**Optimistic UI:** Implemented UI updates that happen before the server confirms the message, making the app feel "instant."

**Security Best Practices:** Implemented password hashing with bcryptjs and secure cookie handling for JWTs.

**Database Aggregation:** Optimized message history fetching to ensure fast initial load times even with many active chats.

---

## ⚙️ Installation & Setup

### Clone the repo

```bash
git clone https://github.com/Piyush495/quick-chat.git
```

## 🧪 .env Setup

### Backend (`/backend`)

```bash
PORT=3000
MONGO_URI=your_mongo_uri_here

NODE_ENV=development

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 🔧 Run the Backend

```bash
cd backend
npm install
npm run dev
```

## 💻 Run the Frontend

```bash
cd frontend
npm install
npm run dev
```