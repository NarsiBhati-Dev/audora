# 🎙️ Audora Backend API

This repository contains the **backend API** for Audora, a high-quality podcast recording platform. Built with **Fastify** and **Bun**, it manages **user authentication, podcast rooms, recording sessions, and media processing** within a **Turborepo monorepo** setup.

---

## 🚀 Features

✅ **JWT-based Authentication (Signup, Signin, User Info)**  
✅ **Podcast Room Management (Create, Join, Leave, List)**  
✅ **Real-time WebRTC Signaling**  
✅ **Secure Password Hashing with Bcrypt**  
✅ **Role-Based Access Control (Middleware)**  
✅ **RESTful API Architecture**  
✅ **PostgreSQL Database with Prisma ORM**  
✅ **AWS S3 Integration for Media Storage**  
✅ **FFmpeg Media Processing Pipeline**  
✅ **Turborepo-powered Monorepo Setup**

---

## 💂️ Folder Structure

```sh
audora-api/
├── src/                    # Source code
│   ├── config/            # Configuration (env variables, database setup)
│   ├── controllers/       # Business logic for API endpoints
│   ├── middleware/        # Authentication & security middleware
│   ├── routes/           # API route handlers
│   ├── services/         # Business services (media processing, S3)
│   ├── utils/            # Utility functions (JWT, hashing, HTTP status)
│   ├── server.ts         # Entry point for the backend API
├── prisma/               # Database schema and migrations
├── tests/               # Test files
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies & scripts
└── README.md            # Documentation (this file)
```

---

## ⚙️ Tech Stack

| **Category**         | **Technology**          |
| -------------------- | ----------------------- |
| **Backend**          | Fastify + Bun           |
| **Database**         | PostgreSQL (via Docker) |
| **Auth**             | JWT (JSON Web Tokens)   |
| **ORM**              | Prisma                  |
| **Storage**          | AWS S3                  |
| **Media Processing** | FFmpeg                  |
| **Package Manager**  | Bun                     |
| **Monorepo**         | Turborepo               |
| **Security**         | Bcrypt, CORS            |

---

## 🔧 Setup & Installation

### 1️⃣ Prerequisites

- **Bun** (v1.2.5 or later)
- **PostgreSQL** (v14 or later)
- **FFmpeg**
- **AWS Account** (for S3)
- **Docker** and **Docker Compose**

### 2️⃣ Install Dependencies

```sh
bun install
```

### 3️⃣ Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/audora"

# JWT
JWT_SECRET="your-jwt-secret"
JWT_EXPIRES_IN="7d"

# AWS
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="your-region"
AWS_BUCKET_NAME="your-bucket"

# Server
PORT=4000
NODE_ENV=development
```

### 4️⃣ Database Setup

Start PostgreSQL using Docker:

```sh
bun run db:up
```

Generate Prisma client:

```sh
bun run generate
```

Run migrations:

```sh
bun run db:deploy
```

### 5️⃣ Start the Server

Development mode:

```sh
bun run dev
```

Production mode:

```sh
bun run start:api
```

The server will start at `http://localhost:8000`.

---

## 📝 API Endpoints

### **Authentication Routes (`/api/auth`)**

| Method | Endpoint  | Description                                |
| ------ | --------- | ------------------------------------------ |
| `POST` | `/signup` | Register a new user                        |
| `POST` | `/signin` | Login and get a JWT token                  |
| `GET`  | `/me`     | Get authenticated user details (protected) |

### **Podcast Room Routes (`/api/rooms`)**

| Method | Endpoint              | Description                                   |
| ------ | --------------------- | --------------------------------------------- |
| `POST` | `/create-room`        | Create a new podcast room (protected)         |
| `POST` | `/join-room/:roomId`  | Join a specific room (protected)              |
| `POST` | `/leave-room/:roomId` | Leave a specific room (protected)             |
| `GET`  | `/rooms`              | Get a list of all available rooms (protected) |

### **Recording Routes (`/api/recordings`)**

| Method | Endpoint               | Description                                 |
| ------ | ---------------------- | ------------------------------------------- |
| `POST` | `/start`               | Start a new recording session               |
| `POST` | `/stop/:sessionId`     | Stop an active recording session            |
| `GET`  | `/sessions`            | List all recording sessions                 |
| `GET`  | `/sessions/:sessionId` | Get details of a specific recording session |

### **Media Routes (`/api/media`)**

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| `POST` | `/upload`           | Upload media files to S3          |
| `GET`  | `/download/:fileId` | Get download URL for a media file |
| `POST` | `/process`          | Process media files using FFmpeg  |

---

## 🔧 Available Scripts

```json
{
  "scripts": {
    "dev": "bun run src/server.ts",
    "start": "bun run src/server.ts",
    "build": "bun build ./src/server.ts --outdir ./dist",
    "test": "bun test",
    "db:up": "docker-compose -f ../docker/docker-compose.yml up -d",
    "db:down": "docker-compose -f ../docker/docker-compose.yml down",
    "db:deploy": "prisma migrate deploy",
    "generate": "prisma generate"
  }
}
```

---

## 🛡️ Security & Best Practices

🔹 **JWT Authentication**: Uses secure HTTP-only cookies to store tokens.  
🔹 **Password Hashing**: Bcrypt is used to hash and securely store passwords.  
🔹 **CORS Protection**: API requests are restricted to trusted frontend origins.  
🔹 **Environment Variables**: All sensitive data is stored in `.env` files.  
🔹 **Input Validation**: All API inputs are validated using Zod schemas.  
🔹 **Rate Limiting**: API endpoints are protected against abuse.  
🔹 **Media Security**: Secure S3 uploads with signed URLs and access control.

---

## 🌟 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature-name`)
3. **Commit your changes** (`git commit -m "Add new feature"`)
4. **Push to the branch** (`git push origin feature-name`)
5. **Open a Pull Request**

---

## 📝 License

This project is licensed under the **MIT License**.

---

🎙️ **"Record, Collaborate, and Share Your Voice with the World!"**
