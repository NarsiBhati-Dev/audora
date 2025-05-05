# media-backend

The `media-backend` is a core service of the **Audora** platform, responsible for managing media-related tasks such as:

- S3 multipart uploads (recordings, tracks, assets)
- REST API endpoints (e.g. sessions, rooms, user uploads)
- Database interactions via Prisma

This service is built with **Bun** and **TypeScript** for high performance and fast development.

---

## 📦 Setup

Install dependencies using [Bun](https://bun.sh):

```bash
bun install
```

⸻

🚀 Running the Server

Start the server:

bun run index.ts

⸻

📁 Project Structure

```bash
media-backend/
├── src/
│ ├── api/ # Route handlers
│ ├── services/ # Upload, DB, and business logic
│ ├── utils/ # Helpers (e.g. S3, validation)
│ └── index.ts # Entry point
├── .env # Environment variables
├── bun.lockb # Bun lockfile
├── tsconfig.json # TypeScript config
└── README.md # You're here!
```

⸻

🔐 Environment Variables

Create a .env file in the root with the following (example):

DATABASE_URL=postgresql://...
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret
S3_BUCKET_NAME=audora-recordings

⸻

🧱 Technologies
• Bun – Runtime, bundler, and package manager
• TypeScript – Type safety
• Prisma – Database ORM
• AWS S3 – Storage for recordings

⸻

🧪 TODO
• S3 multipart upload controller
• REST API for session/room management
• Prisma DB integration
• Auth middleware (JWT/session)
