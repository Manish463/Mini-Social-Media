# 🌐 Mini Social Media Web App

A lightweight and elegant **social media web application** built using **React**, **Node.js**, **Express.js**, and **MongoDB**.  
Users can create posts, like content, delete their posts, and manage their profiles — all within a smooth, minimal, and responsive interface.

---

## 🚀 Features

- 👤 **User Authentication** – Register, login, and logout securely  
- 📝 **Create & Delete Posts** – Share your thoughts instantly  
- ❤️ **Like System** – Engage with others’ posts  
- 🧑‍💻 **Profile Page** – View and edit your profile and posts  
- ☁️ **Cloudinary Integration** – For image uploads and storage  
- 🎨 **Responsive UI** – Works seamlessly across all devices  
- ⚡ **Smooth Animations** – Powered by **Framer Motion**  
- 🍪 **Persistent Login** – Uses cookies for session management  

---

## 🛠️ Tech Stack

### **Frontend**
- ⚛️ React.js  
- 🎨 Tailwind CSS  
- 🌀 Framer Motion (animations)  
- 🔄 React Router DOM  
- 🧾 React Hook Form  
- 🔔 React Toastify (notifications)

### **Backend**
- 🟢 Node.js + Express.js  
- 🍃 MongoDB + Mongoose  
- ☁️ Cloudinary (image hosting)  
- 🔐 JWT Authentication  
- 📸 Multer (file uploads)

---

## 🌍 Live Demo

🔗 [Visit the App](https://mini-social-media-dt9w.vercel.app/)

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally 👇

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/mini-social.git
cd mini-social
```

### 2️⃣ Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3️⃣ Setup environment variables
Create a .env file inside your backend folder and add:
```ini
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Then, create another .env file inside your frontend folder and add:
```ini
VITE_API_URL=your_url
```

### 4️⃣ Run the app
```bash
# Start backend
npm run dev

# Start frontend
npm run dev
```