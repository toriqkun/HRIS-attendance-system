# HRIS Attendance System – Advanced Blueprint

## 1. Overview

HRIS Attendance System adalah aplikasi berbasis web untuk mengelola **absensi karyawan secara digital**.

Sistem ini memungkinkan:

* Karyawan melakukan **check-in (IN)** dan **check-out (OUT)**
* HR melihat **laporan kehadiran**
* Sistem menentukan **status kehadiran otomatis**
* Admin mengelola **data karyawan**

Aplikasi dibangun menggunakan **arsitektur modern fullstack JavaScript**.

Tujuan sistem:

* Digitalisasi absensi
* Monitoring kedisiplinan karyawan
* Penyediaan laporan attendance otomatis
* Fondasi untuk HRIS yang lebih lengkap

---

# 2. Technology Stack

## Backend

* Node.js
* Express.js
* Prisma ORM
* PostgreSQL (Neon)
* REST API

## Frontend

* React.js
* Axios
* Vite
* CSS / Tailwind

## Dev Tools

* Prisma Migration
* Prisma Seed
* Postman / Thunder Client
* Git

---

# 3. System Architecture

```
React Frontend
      |
      | HTTP Request
      v
Express.js API Server
      |
      | Prisma ORM
      v
PostgreSQL (Neon DB)
```

### Flow

1. User melakukan request dari React
2. Request dikirim ke Express API
3. API memproses business logic
4. Prisma melakukan query ke database
5. Data dikembalikan ke frontend

---

# 4. Database Design (ERD)

## Entity Relationship Diagram

```
Employees
---------
id (PK)
name
department
position
createdAt

        |
        | 1:N
        v

Attendance
----------
id (PK)
employeeId (FK)
type (IN/OUT)
timestamp
createdAt
```

Relasi:

```
Employee (1) ---- (N) Attendance
```

---

# 5. Prisma Schema

File:

```
prisma/schema.prisma
```

```prisma
generator client {
 provider = "prisma-client-js"
}

datasource db {
 provider = "postgresql"
 url      = env("DATABASE_URL")
}

model Employee {
 id          Int          @id @default(autoincrement())
 name        String
 department  String?
 position    String?
 createdAt   DateTime     @default(now())

 attendance  Attendance[]
}

model Attendance {
 id          Int        @id @default(autoincrement())
 employeeId  Int
 type        AttendanceType
 timestamp   DateTime   @default(now())

 employee    Employee   @relation(fields: [employeeId], references: [id])
}

enum AttendanceType {
 IN
 OUT
}
```

---

# 6. Database Migration

```
npx prisma migrate dev --name init
```

Fungsi:

* membuat tabel database
* membuat migration history
* generate prisma client

---

# 7. Seed Data

Seed digunakan untuk membuat **data awal karyawan**.

File:

```
prisma/seed.js
```

```javascript
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {

 await prisma.employee.createMany({
  data: [
   {
    name: "Toriq Abdul Rosyid",
    department: "IT",
    position: "Junior Fullstack Developer"
   },
   {
    name: "Siti Rahma",
    department: "HR",
    position: "HR Manager"
   },
   {
    name: "M.Hasbianur",
    department: "Finance",
    position: "Accountant"
   }
  ]
 })

 console.log("Seed data inserted")
}

main()
 .catch(console.error)
 .finally(() => prisma.$disconnect())
```

Run seed:

```
npx prisma db seed
```

---

# 8. Backend Folder Structure

```
backend
│
├── prisma
│   ├── schema.prisma
│   └── seed.js
│
├── src
│
│   ├── controllers
│   │   └── attendanceController.js
│
│   ├── services
│   │   └── attendanceService.js
│
│   ├── routes
│   │   └── attendanceRoutes.js
│
│   ├── utils
│   │   └── attendanceStatus.js
│
│   ├── middleware
│   │   └── errorHandler.js
│
│   └── app.js
│
└── package.json
```

---

# 9. API Contract

## POST /attendance

Mencatat absensi.

### Request

```
POST /attendance
```

Body:

```
{
 "employee_id": 1,
 "type": "IN"
}
```

### Validation Rules

1. hanya boleh 1 IN per hari
2. hanya boleh 1 OUT per hari
3. OUT tidak boleh jika belum ada IN

---

## GET /attendance/report

Mengambil laporan attendance.

```
GET /attendance/report?startDate=&endDate=
```

Response:

```
[
 {
  "employee_id": 1,
  "date": "2026-03-10",
  "check_in": "09:01",
  "check_out": "17:02",
  "status": "On Time"
 }
]
```

---

# 10. Attendance Rule Engine

File:

```
utils/attendanceStatus.js
```

```javascript
function getAttendanceStatus(checkIn, checkOut) {

 const lateLimit = "09:15"

 if (!checkOut) return "Incomplete"

 if (checkIn > lateLimit)
  return "Late"

 return "On Time"
}

module.exports = getAttendanceStatus
```

---

# 11. Query Examples

## Karyawan yang belum absen hari ini

```
SELECT e.id, e.name
FROM employees e
LEFT JOIN attendance a
ON e.id = a.employeeId
AND DATE(a.timestamp) = CURRENT_DATE
WHERE a.id IS NULL;
```

---

## Total hadir per bulan

```
SELECT employeeId, COUNT(*) as total
FROM attendance
WHERE type = 'IN'
AND DATE_TRUNC('month', timestamp) =
DATE_TRUNC('month', CURRENT_DATE)
GROUP BY employeeId;
```

---

# 12. Frontend Architecture

React menggunakan **component based architecture**.

## Folder Structure

```
frontend
│
├── src
│
├── components
│   ├── AttendanceForm.jsx
│   ├── AttendanceTable.jsx
│
├── pages
│   ├── Dashboard.jsx
│   └── AttendancePage.jsx
│
├── services
│   └── attendanceApi.js
│
├── App.jsx
└── main.jsx
```

---

# 13. UI Pages

## Login Page

Autentikasi user.

## Dashboard

Menampilkan summary:

* total employee
* present today
* late
* incomplete

---

## Attendance Page

Komponen:

* Input employee ID
* Tombol IN
* Tombol OUT

---

## Attendance Report Page

Menampilkan:

* filter tanggal
* table report

---

# 14. Development Workflow

### Step 1

Setup Neon Database

---

### Step 2

Setup backend

```
npm install
```

---

### Step 3

Run migration

```
npx prisma migrate dev
```

---

### Step 4

Seed database

```
npx prisma db seed
```

---

### Step 5

Run backend

```
npm run dev
```

---

### Step 6

Run frontend

```
npm run dev
```

---

# 15. Security & Validation

Backend validation:

* valid employee id
* valid attendance type
* attendance rule validation

Frontend validation:

* employee id required
* type required

---

# 16. Future Enhancement

### QR Attendance

Scan QR untuk check-in.

---

### Face Recognition

Absensi menggunakan kamera.

---

### Geolocation

Absensi hanya bisa di kantor.

---

### Payroll Integration

Attendance terhubung dengan payroll.

---

# 17. Roadmap

## Phase 1

Core system

* employee CRUD
* attendance API
* attendance rules

---

## Phase 2

Reporting

* attendance report
* attendance status

---

## Phase 3

Dashboard

* statistik
* grafik attendance

---

## Phase 4

Enterprise features

* authentication
* role based access
* export report
* mobile responsive

