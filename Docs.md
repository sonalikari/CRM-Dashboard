# 🏡 Real Estate CRM Dashboard  

## 📌 Overview  
The **Real Estate CRM Dashboard** is a web-based application designed to help real estate agents efficiently manage **leads** and **property listings**. The system allows users to create, edit, and organize leads and properties while providing search, filtering, and document upload capabilities using Cloudinary.  

---

## 🚀 Features  

### 🏷 Leads Management  
✅ Add a new lead (Name & Phone Number)  
✅ Edit lead details  
✅ View all leads in a **paginated list**  
✅ **Search leads** by Name or Phone Number  
✅ Upload & manage **lead-related documents** (Cloudinary)  

### 🏠 Property Management  
✅ Add properties categorized as **Residential, Commercial, or Land**  
✅ Define attributes like **size, location, budget, and availability**  
✅ Display properties with **search & filtering** options  
✅ Edit and update property details  

### 🛠️ Other Features  
✅ **Deployment on Render** (Frontend & Backend)  
✅ **Cloudinary Integration** for lead document uploads  

---

## 🛠️ Technologies Used  

### **Frontend (React.js + TypeScript + Tailwind)**  
- **React.js (TypeScript)** - Frontend framework  
- **React Router** - Navigation and routing  
- **Axios** - API requests   

### **Backend (Node.js + Express.js)**  
- **Express.js** - REST API framework  
- **MongoDB + Mongoose** - NoSQL database for storing leads & properties  
- **Cloudinary** - Cloud storage for lead document uploads  
- **Multer** - Middleware for handling file uploads  
- **Dotenv** - Managing environment variables  
- **CORS & Body-Parser** - Enabling API communication  

### **Deployment**  
- **Frontend:** [Render](https://render.com)  
- **Backend:** [Render](https://render.com)  
- **Database:** MongoDB Atlas  
- **File Storage:** Cloudinary  

---

## 📥 Installation & Running Locally  

## **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/sonalikari/CRM-Dashboard.git
cd CRM-Dashboard
```
## **2️⃣ Frontend Setup (React + TypeScript)**
### Navigate to the frontend folder & install dependencies
```sh
cd frontend
npm install
```
### Create a .env file & configure environment variables
Create a .env file inside the frontend folder and add the following:
```sh
REACT_APP_API_URL=http://localhost:5000
```
### Start the frontend server
```sh
npm run dev
```
## **3️⃣Backend Setup (Node.js + Express)**
### Navigate to the backend folder & install dependencies
```sh
cd backend
npm install
```
### Create a .env file & configure environment variables
Create a .env file inside the backend folder and add the following:
```sh
PORT=5000
MONGO_URI=your-mongodb-connection-string
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```
### Start the backend server
```sh
npm start
```

### Deployed Link: https://crm-dashboard-1.onrender.com/
