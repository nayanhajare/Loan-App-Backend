# 📝 Loan Application System - Backend

A robust backend server built with **Node.js**, **Express**, and **MongoDB**, providing secure RESTful APIs for user authentication, loan management, KYC, admin analytics, and audit logging.

> *Powering a modern loan management platform with JWT authentication, RBAC, and advanced analytics.*

---

## 🛠 Features
* **User authentication** (JWT, role-based)
* **Loan application, approval, and repayment management**
* **Document upload and KYC management**
* **Admin panel:** user/loan management, analytics, audit logs
* **RESTful API endpoints**

---

## 🔌 API Overview
* `/api/auth` - Auth routes (register, login)
* `/api/loans` - Loan application and management
* `/api/loan-products` - Loan product catalog
* `/api/documents` - Document upload and KYC
* `/api/users` - User management (admin)
* `/api/audit-logs` - Audit log (admin)

---

## 📁 Project Structure

```
backend/
├── models/         # Mongoose models
├── controllers/    # Route controllers
├── routes/         # Express routes
├── middlewares/    # Auth and other middleware
├── utils/          # Utility functions
├── index.js        # Main server entry
├── package.json    # Dependencies
└── README.md       # This file
```

---

## 🧠 Concepts Demonstrated
* **JWT authentication & RBAC**
* **RESTful API design**
* **Mongoose data modeling**
* **Middleware for auth and validation**
* **Audit logging**
* **Admin analytics endpoints**

---

## 🧪 How to Run Locally

### Prerequisites
* Node.js (v16+ recommended)
* npm
* MongoDB (local or Atlas)

### Setup Steps
```bash
cd backend
npm install
```

### Environment Variables
Create a `.env` file in the backend directory with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Running the Server
```bash
npm start
```
The server will run at [http://localhost:8080](http://localhost:8080)

---

## 🧱 Tech Stack
* **Node.js**
* **Express**
* **MongoDB**
* **Mongoose**
* **JWT**
* **bcrypt**

---

## 🐛 Troubleshooting
* Ensure MongoDB is running and accessible
* Check `.env` for correct variables
* Check server logs for errors
* Verify API endpoints

---

## 📄 License
MIT

---

## 👤 Author
**Nayan Hajare**

---

## 🙏 Acknowledgments
* Masai School
* Node.js & Express communities
* MongoDB & Mongoose docs
* Stack Overflow

---

> *For frontend setup and usage, see the frontend/README.md* 