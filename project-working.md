# 💼 Advanced Employee Management System

A powerful, full-stack Employee Management System with role-based access control and intelligent features like face recognition attendance, real-time chat, gamification, and performance analytics. Built using **React**, **Flask**, **MongoDB**, and **Tailwind CSS**.

---

## 🚀 Live Demo

🔗 [Link to Demo (optional)](https://your-live-demo-link.com)

---

## 📸 Preview

<img src="preview-1.png" alt="Dashboard" width="700"/>
<img src="preview-2.png" alt="Employee Table" width="700"/>

---

## 🧱 Tech Stack

- **Frontend**: React, Tailwind CSS, React Router, Axios, Redux
- **Backend**: Flask, Flask-JWT-Extended, Flask-CORS, Flask-SocketIO
- **Database**: MongoDB (MongoDB Atlas)
- **Authentication**: JWT (Role-based: Admin, HR, Employee)
- **Extra Tools**: face-api.js, React Toastify, Chart.js, Framer Motion

---

## 🎯 Features

### ✅ Core Modules

- 👤 **Authentication**

  - Role-based (Admin, HR, Employee)
  - JWT login, registration, forgot password

- 🏢 **Employee Management**

  - Add, edit, delete, view employees
  - Department & role assignment

- 📅 **Attendance Management**

  - Daily check-in/check-out
  - Leave requests & calendar integration

- 📌 **Task Management**

  - Assign tasks with deadlines
  - Status tracking (Pending, In Progress, Completed)

- 📣 **Announcements**

  - Post announcements to all or specific teams

- 📈 **Performance Analytics**

  - Track goals, performance scores, and feedback

- 📊 **Reports & Charts**

  - Interactive dashboards, employee KPIs, productivity graphs

- 💬 **Chat System**
  - Real-time messaging between users (Socket.IO)

---

### 🌟 Unique Features

- 👁️ **Face Recognition Attendance** using `face-api.js`
- 🏆 **Gamification** with task rewards, streak bonuses
- 📆 **Calendar View** with integrated tasks & events
- 📄 **PDF Generator** for offer letters & payslips
- 🌙 **Dark Mode Toggle** using Tailwind dark mode
- 📊 **Skill Matrix** for HR skill-based employee search
- 📝 **Feedback System** (anonymous suggestions)

---

## 🗃️ Folder Structure

```bash
project-root/
├── client/ # React App
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/ # Axios API functions
│ │ ├── store/ # Redux or context
│ │ ├── utils/
│ │ └── App.jsx
│
├── server/ # Flask App
│ ├── static/
│ ├── templates/
│ ├── routes/
│ ├── models/
│ ├── utils/
│ ├── config.py
│ └── app.py
│
├── .env
├── README.md
├── requirements.txt
└── package.json
```

---

## ⚙️ Installation

### 🔧 Prerequisites

- Node.js & npm
- Python 3.10+
- MongoDB Atlas account

---

### 🖥️ Frontend Setup

```bash
cd client
npm install
npm start
```

🔙 Backend Setup

```bash
cd server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

---

### 📦 Frontend Libraries

| 📌 Feature                | 📚 Library                |
| ------------------------- | ------------------------- |
| UI & Components           | Tailwind CSS, Headless UI |
| Form Handling             | Formik, Yup               |
| API Requests              | Axios                     |
| Charts & Analytics        | Chart.js, Recharts        |
| Calendar Integration      | react-calendar            |
| Face Recognition          | face-api.js               |
| Notifications             | react-toastify            |
| Animations                | Framer Motion             |
| Routing                   | React Router DOM          |
| PDF Generator             | react-to-pdf, jspdf       |
| Speech-to-Text (Optional) | react-speech-recognition  |

---

### 🔥 Backend Libraries

| 📌 Feature            | 📚 Library               |
| --------------------- | ------------------------ |
| Web Framework         | Flask                    |
| Cross-Origin Requests | Flask-CORS               |
| JWT Authentication    | Flask-JWT-Extended       |
| Real-time Chat        | Flask-SocketIO           |
| File Uploads          | Werkzeug                 |
| Face Detection        | face_recognition, OpenCV |
| Scheduling            | APScheduler              |
| PDF Generation        | reportlab, pdfkit        |
| Mailing Support       | Flask-Mail               |
| Data Serialization    | Marshmallow              |

---

### 🚀 Deployment Guide

| 📦 Component   | 🚀 Recommended Platform   |
| -------------- | ------------------------- |
| Frontend       | Vercel / Netlify          |
| Backend        | Render / Railway / Fly.io |
| Database       | MongoDB Atlas             |
| File Uploads   | Cloudinary / AWS S3       |
| CI/CD Workflow | GitHub Actions / Docker   |

---

### 🧪 Testing Tools

| 🧪 Area    | 🔧 Tool                     |
| ---------- | --------------------------- |
| Frontend   | Jest, React Testing Library |
| Backend    | PyTest, Postman             |
| End-to-End | Cypress (optional)          |

---
