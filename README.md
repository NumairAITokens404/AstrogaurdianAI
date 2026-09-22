# AstroGuardian AI

AstroGuardian AI is a space-mission control dashboard that combines real-time-style telemetry, crew and system monitoring, visual mission panels, and an AI copilot.

## Highlights

- Mission-control dashboard with a responsive, holographic UI
- Crew health, hazard, rover, shuttle, and mission-status panels
- AI mission copilot powered by Google Gemini
- React, TypeScript, Vite, Tailwind CSS, shadcn/ui, and Framer Motion
- Express API for health checks and AI chat requests

## Project structure

```text
frontend/  React client and interface components
backend/   Express API and Gemini integration
```

## Requirements

- Node.js 20 or later
- npm
- A Google Gemini API key for the AI chat endpoint

## Run locally

Install and start the frontend:

```bash
cd frontend
npm install
npm run dev
```

In a second terminal, install and start the backend:

```bash
cd backend
npm install
npm start
```

The frontend development server prints its local URL (usually `http://localhost:5173`). The backend listens on port `8000` by default.

## Environment variables

Create or update these local files. Never commit API keys.

`backend/.env`

```env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=8000
```

`frontend/.env`

```env
VITE_BACKEND_URL=http://localhost:8000
```

## Useful commands

From `frontend/`:

```bash
npm run dev      # start the development server
npm run build    # create a production build
npm run lint     # run ESLint
npm run preview  # preview the production build
```

The backend exposes `GET /api/health` and `POST /api/ai/chat`.

## License

No license has been specified for this repository.
