# Audora.xyz 🎙️

![Audora Logo](https://via.placeholder.com/150x150.png?text=Audora)

## **High-Quality Podcast Recording Platform**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Code of Conduct](https://img.shields.io/badge/Code%20of%20Conduct-v2.0-ff69b4.svg)](CODE_OF_CONDUCT.md)

## 🎬 Audora Demo

[![Watch the Audora Demo](https://img.youtube.com/vi/placeholder/maxresdefault.jpg)](https://www.youtube.com/watch?v=placeholder)

## Code of Conduct

Please read and follow our [Code of Conduct](./CODE_OF_CONDUCT.md) to help keep **Audora** a welcoming and inclusive space for everyone.

## License

This project is licensed under the [MIT License](./LICENSE.md).

## 🏗 Project Structure

This monorepo is managed using **Turborepo** and is structured as follows:

```sh
audora/
├── apps/ # Contains independent applications
│   ├── audora-frontend/        # Next.js app for the UI
│   ├── audora-backend/         # Fastify backend for API handling
│   ├── audora-signal/       # WebSocket server for real-time communication
├── packages/ # Shared code across apps
│   ├── database/        # Prisma & PostgreSQL setup
│   ├── types/           # Shared TypeScript types
# │   ├── backend-common/  # Common utilities for backend services
├── docker/              # Docker configuration
│   ├── backend.prod.Dockerfile    # Production Dockerfile for backend
│   ├── frontend.prod.Dockerfile   # Production Dockerfile for frontend
│   ├── signal.prod.Dockerfile  # Production Dockerfile for WebSocket
│   ├── db.docker-compose.yml         # Docker Compose configuration
├── .github/workflows/    # GitHub Actions CI/CD pipelines
│   ├── cd_api.yml    # CI/CD pipeline for backend
│   ├── cd_frontend.yml   # CI/CD pipeline for frontend
│   ├── cd_signal.yml  # CI/CD pipeline for WebSocket
├── turbo.json           # Turborepo config file
├── package.json         # Root package.json for Bun & Turborepo setup
└── README.md            # Project documentation
```

## 🧩 Features

Audora offers a comprehensive set of features for professional podcast recording:

- 🎥 **High-Quality Recording**
  - Studio-grade audio and video recording
  - Multiple input device support
  - Customizable recording settings

- 🌐 **Real-Time Communication**
  - WebRTC-based peer-to-peer connections
  - Low-latency audio/video streaming
  - Multi-participant support

- 📤 **Reliable Uploads**
  - S3 multipart uploads with automatic retry
  - Progress tracking and resume capability
  - Secure file transfer

- 🎬 **Professional Processing**
  - Video transcoding pipeline
  - Audio normalization and enhancement
  - Custom overlays and branding

- 🔒 **Security & Privacy**
  - End-to-end encryption
  - Secure room management
  - Privacy-focused design

## 🚀 Getting Started

### Prerequisites

- **Bun** (v1.2.5 or later)
- **Node.js** (v18 or later)
- **PostgreSQL** (v14 or later)
- **FFmpeg**
- **AWS Account** (for S3)
- **Docker** and **Docker Compose**

### Install Dependencies

```sh
bun install
```

### Configure Environment Variables

Create environment files for each app:

1. Copy the example environment files
2. Rename them to `.env` in each app directory
3. Fill in the required values like `DATABASE_URL`, `AWS_CREDENTIALS`, etc.

### Database Setup

Start the PostgreSQL database using Docker:

```sh
bun run db:up
```

### Generate Prisma Client

```sh
bun run generate
```

### Deploy Database Migrations

```sh
bun run db:deploy
```

### Run the Application

#### Development Mode

```sh
bun run dev
```

#### Production Mode

```sh
bun run build
bun run start
```

Or use the combined command:

```sh
bun run server:start
```

### Start Individual Apps

```sh
# Start frontend only
bun run start:frontend

# Start backend API only
bun run start:backend

# Start WebSocket server only
bun run start:websocket
```

## 📦 Tech Stack

- **Turborepo** → Monorepo management
- **Bun** → Fast JavaScript package manager & runtime
- **Next.js 14** → Frontend framework
- **Fastify** → Backend API
- **WebRTC** → Real-time communication
- **PostgreSQL** → Database
- **Prisma** → ORM for database management
- **AWS S3** → File storage
- **FFmpeg** → Media processing
- **Docker** → Containerization
- **GitHub Actions** → CI/CD pipelines

## 🗄 Database Setup

### Start PostgreSQL with Docker

```sh
bun db:up
```

### Stop PostgreSQL

```sh
bun db:down
```

### Run Database Migrations

```sh
bun run db:deploy
```

## 🚢 Deployment

The project includes production Docker configurations and GitHub Actions workflows for continuous deployment:

### Docker Production Setup

The `/docker` directory contains production Dockerfiles for each service:

- `backend.prod.Dockerfile` - Production container for the backend API
- `frontend.prod.Dockerfile` - Production container for the Next.js frontend
- `websocket.prod.Dockerfile` - Production container for the WebSocket server

### CI/CD Pipelines

GitHub Actions workflows in the `.github/workflows` directory automate the deployment process:

- `cd_backend.yml` - Deploys the backend service
- `cd_frontend.yml` - Deploys the frontend application
- `cd_websocket.yml` - Deploys the WebSocket server

## 📜 Available Scripts

```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "start": "turbo run start",
    "start:frontend": "turbo run start:frontend --filter=audora-frontend",
    "start:backend": "turbo run start:backend --filter=audora-backend",
    "start:websocket": "turbo run start:websocket --filter=audora-websocket",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "check-types": "turbo run check-types",
    "db:up": "docker-compose -f docker/docker-compose.yml up -d",
    "db:down": "docker-compose -f docker/docker-compose.yml down",
    "infra:build": "docker-compose -f docker-compose.yml build",
    "infra:up": "docker-compose -f docker-compose.yml up -d",
    "infra:down": "docker-compose -f docker-compose.yml down",
    "db:deploy": "turbo run db:deploy",
    "server:start": "bun run db:deploy && bun run start",
    "generate": "turbo run generate"
  }
}
```

## Development Tools

```sh
# Run linting across all packages
bun run lint

# Format code with Prettier
bun run format

# Type checking
bun run check-types
```

## 📞 Support

- **Documentation**: [docs.audora.xyz](https://docs.audora.xyz)
- **Email**: support@audora.xyz
- **Discord**: [Join our community](https://discord.gg/audora)

## 🙏 Acknowledgments

- [WebRTC](https://webrtc.org/) for real-time communication
- [FFmpeg](https://ffmpeg.org/) for media processing
- [Prisma](https://www.prisma.io/) for database management
- All our contributors and supporters

---

<div align="center">
Made with ❤️ by the Audora Team
</div>
