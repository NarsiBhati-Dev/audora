# Frontend Directory Structure

This directory contains the frontend application code for Audora. The structure is organized as follows:

```
src/
├── app/                    # Next.js app directory (pages and layouts)
├── components/            # Reusable UI components
│   ├── common/           # Shared components used across features
│   ├── features/         # Feature-specific components
│   └── layouts/          # Layout components
├── lib/                  # Core utilities and configurations
│   ├── api/             # API client and endpoints
│   ├── auth/            # Authentication related code
│   └── utils/           # Utility functions
├── hooks/               # Custom React hooks
├── store/              # State management (Zustand/Redux)
├── types/              # TypeScript type definitions
├── styles/             # Global styles and theme
└── config/             # Application configuration

## Best Practices

1. Keep components small and focused on a single responsibility
2. Use feature-based organization for larger components
3. Share common utilities through the lib directory
4. Maintain type safety with proper TypeScript definitions
5. Follow the atomic design pattern for component organization
```

## Component Organization

- **Common Components**: Reusable UI elements like buttons, inputs, cards
- **Feature Components**: Components specific to features like meetings, chat, etc.
- **Layout Components**: Page layouts and structural components

## State Management

- Use Zustand for global state management
- Keep feature-specific state close to the feature
- Use React Query for server state management

## Styling

- Use Tailwind CSS for styling
- Follow the utility-first approach
- Maintain consistent spacing and design tokens
