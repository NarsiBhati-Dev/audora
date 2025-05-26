export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:3000';
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() || 'http://localhost:8000';
export const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL?.trim() || 'ws://localhost:8000';

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID?.trim();
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET?.trim();

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET?.trim();
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL?.trim();
