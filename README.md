# 💼 ApplyMate

**ApplyMate** is a full-stack job application tracker built using the MERN stack. It helps students and recruiters manage job/internship applications with role-based access, resume uploads, and a clean, customizable interface.

## 🚀 Features

- 🔐 Role-based Authentication: Student & Recruiter login/signup
- 📄 Resume Uploads: Students can upload resumes
- 📊 Recruiter Dashboard:
  - View applications with resumes
  - Accept / Reject based on resume
- 📝 Student Dashboard:
  - Track applications

## 🛠 Tech Stack

- **Frontend**: React.js, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Auth**: JWT + Role-based access (Student / Recruiter)
- **Extras**: dotenv, multer (for file uploads), secure cookies

## 📁 Folder Structure

ApplyMate/
├── Backend/        → Node.js backend (API, DB, Auth)
├── Frontend/       → React frontend (UI, Axios)
├── .gitignore      → Ignoring .env, node_modules, .vscode, etc.
├── README.md       → This file

## ⚙️ Getting Started

```bash
git clone https://github.com/jyoti2716/ApplyMate.git
cd ApplyMate

# Setup Backend
cd Backend
npm install
# Create .env with:
# MONGO_URI=your_mongo_uri
# JWT_SECRET=your_secret_key
npm start

# Setup Frontend
cd ../Frontend
npm install
npm start
```

## 💡 Future Features

- 🔔 Notifications when application status changes
- 📬 Contact Form: Users can send messages from the site
- 🎨 Improved UI/UX and animations
- 📊 Recruiter analytics dashboard
- 🔍 Filter/search by status, name, date

