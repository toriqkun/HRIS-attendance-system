# HRIS Attendance System 🏢

A modern, robust, and clean Employee Attendance Management System built with the Repository Pattern on both Backend and Frontend.

## 🌟 Overview
The **HRIS Attendance System** is designed to streamline the process of tracking employee attendance. It provides an intuitive interface for employees to record their check-in and check-out times, while giving administrators a clear overview of workforce presence, lateness, and reporting.

**Key Problems Solved:**
- Eliminates manual spreadsheet-based attendance tracking.
- Provides real-time visibility into who is currently present.
- Automated efficiency and lateness reporting.

---

## ✨ Features
- **Live Dashboard**: Real-time stats showing total employees, present today, late arrivals, and incomplete logs.
- **Attendance Portal**: Simple interface for employees to select their name and record "IN" or "OUT" status.
- **Detailed Reporting**: Filterable attendance logs with status indicators (On Time, Late, etc.).
- **Weekly Efficiency Graph**: Visual representation of attendance rates over the last 7 days.
- **Repository Pattern Architecture**: Clean code structure that decouples data access logic from business logic.

---

## 🛠 Tech Stack
### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL

### **Frontend**
- **Library**: React.js (Vite)
- **Styling**: Tailwind CSS (Custom Dark Theme)
- **Icons**: Lucide React
- **HTTP Client**: Axios

---

## 📂 Project Structure
```text
attendance/
├── backend/                # Express.js Server
│   ├── prisma/             # Database Schema
│   └── src/
│       ├── controllers/    # Request Handling
│       ├── middleware/     # Error Handlers & Auth
│       ├── repositories/   # Data Access Layer (Prisma)
│       ├── routes/         # API Endpoints
│       ├── services/       # Business Logic Layer
│       └── utils/          # Helpers
├── frontend/               # React Client
│   ├── public/
│   └── src/
│       ├── components/     # UI Components
│       ├── pages/          # View Containers
│       ├── repositories/   # API Abstraction Layer
│       ├── services/       # Axios Instance
│       └── assets/         # Static Files
└── README.md               # Main Documentation
```

---

## 🚀 Installation Guide

### 1. Clone the Repository
```bash
git clone https://github.com/toriqkun/HRIS-attendance-system.git
cd HRIS-attendance-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

---

## ⚙️ Environment Configuration

### **Backend (.env)**
Create a `.env` file in the `/backend` folder:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/attendance_db"
FRONTEND_URL="http://localhost:5173"
PORT=5000
```

### **Frontend (.env)**
Create a `.env` file in the `/frontend` folder:
```env
VITE_API_URL="http://localhost:5000"
```

---

## 🏃 Running the Application

### **Start Backend**
```bash
cd backend
npx prisma generate
npm run dev
```

### **Start Frontend**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173` while the API runs on `http://localhost:5000`.

---

## 📡 API Overview (Base: `/attendance`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/employees` | Get list of all registered employees |
| `POST` | `/` | Record a new attendance (IN/OUT) |
| `GET` | `/report` | Get detailed attendance report with filters |
| `GET` | `/summary` | Get dashboard overview statistics |

---

## 🗄 Database Schema
The project uses **PostgreSQL** with the following core models:

- **Employee**: Stores employee profile (Name, Department, Position).
- **Attendance**: Stores every check-in and check-out event, linked to an employee.
- **AttendanceType**: Enum for `IN` and `OUT` types.

Refer to `backend/prisma/schema.prisma` for the full technical schema.

---

**Developed with ❤️ by Toriq**
