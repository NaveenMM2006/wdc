# Admin Panel Backend

This is the **backend API** for the Admin Panel / Faculty Management System. It is built using **Node.js**, **Express**, and **MySQL**, and provides RESTful endpoints for managing faculties, authentication, notices, and more.  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
 

---

## Features

- Admin can manage faculties:
  - Get all faculties (with pagination and search)
  - Update faculty details
  - Delete faculty
  - Reset faculty password
- Role-based authentication (`SUPER_ADMIN`, `FACULTY`)
- JWT-based authentication
- Secure password hashing with **bcrypt**
- Notice management 

---

## Tech Stack

- **Node.js**  
- **Express.js**  
- **MySQL**  
- **bcrypt** (password hashing)  
- **CORS** (cross-origin resource sharing)  
- **dotenv** (environment variables)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/backend-repo.git
cd backend

npm install

set up .env variables
npm run dev
