# ============================
# Backend Dockerfile (Bun)
# ============================

FROM oven/bun:1.2.9@sha256:7eb9c0438a42438d884891f5460d6f5b89c20797cb58062b6d28ccba725a8c42

WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Copy necessary files for dependency installation
COPY ../package.json ./package.json
COPY ../bun.lock ./bun.lock
COPY ../turbo.json ./turbo.json
COPY ../packages ./packages
COPY ../apps/audora-api ./apps/audora-api

# Install deps
RUN bun install

# Expose backend port
EXPOSE 9000

# Run the server with database deployment
CMD ["bun", "run", "start:api"]