# FastTrack Dashboard — Take-Home Assignment

A modern executive dashboard built with **Next.js 16**, **React 19**, and **TypeScript**, featuring diagnostic section overviews and deep-dive insights with custom visualizations.

![React](https://img.shields.io/badge/React-19.2-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)

---

## 📋 Project Overview

This project implements three connected screens for an executive-facing diagnostic dashboard:

| Screen | Description | Route |
|--------|-------------|-------|
| **Sections List** | Landing page showing all diagnostic sections with scores, status badges, and quick navigation | `/dashboard/overviews` |
| **Section Overview** | High-level summary with score, status, benchmark comparison, and trend visualization | `/dashboard/overviews/[sectionId]` |
| **Deep Dive Insight** | Detailed insight with data blocks, mini visuals, charts, and recommendations | `/dashboard/overviews/[sectionId]/insights/[insightId]` |

### Key Features

- ✅ **Server-side rendering** with Next.js App Router
- ✅ **Real API integration** with Express backend
- ✅ **Custom SVG visualizations** (bar charts, sparklines, gauges)
- ✅ **Responsive design** (mobile + desktop)
- ✅ **Loading & error states** with skeleton loaders
- ✅ **Type-safe** end-to-end with shared TypeScript types

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ 
- **npm** 9+ (or yarn/pnpm)

### 1. Clone & Install

```bash
# Clone the repository
git clone <repository-url>
cd fasttrack-assignment

# Install frontend dependencies
cd fasttrack
npm install

# Install backend dependencies
cd ../backend/api
npm install
```

### 2. Start the Backend

```bash
# From the backend/api directory
cd backend/api
npm run dev
```

The API server will start at **http://localhost:4000**

### 3. Start the Frontend

```bash
# From the fasttrack directory (in a new terminal)
cd fasttrack
npm run dev
```

The app will be available at **http://localhost:3000**

### 4. View the Dashboard

Open your browser and navigate to:

- **Section List:** http://localhost:3000/dashboard/overviews
- **Section Overview:** http://localhost:3000/dashboard/overviews/strategy-in-action
- **Deep Dive Insight:** http://localhost:3000/dashboard/overviews/strategy-in-action/insights/clarity

---

## 📁 Project Structure

```
fasttrack-assignment/
├── backend/
│   └── api/
│       ├── src/
│       │   ├── server.ts      # Express server with REST endpoints
│       │   ├── data.ts        # Mock data for sections & insights
│       │   └── types.ts       # Shared TypeScript types
│       └── package.json
│
└── fasttrack/                  # Next.js frontend
    ├── src/
    │   ├── app/
    │   │   └── dashboard/
    │   │       └── overviews/
    │   │           ├── page.tsx                    # Section list
    │   │           └── [sectionId]/
    │   │               ├── page.tsx                # Screen A: Section Overview
    │   │               ├── loading.tsx             # Loading skeleton
    │   │               ├── error.tsx               # Error boundary
    │   │               └── insights/
    │   │                   └── [insightId]/
    │   │                       └── page.tsx        # Screen B: Deep Dive
    │   ├── components/
    │   │   ├── app-sidebar.tsx                     # Navigation sidebar
    │   │   ├── insight-visuals.tsx                 # Chart components
    │   │   └── ui/                                 # shadcn/ui primitives
    │   └── lib/
    │       ├── api.ts                              # API client
    │       ├── types.ts                            # Frontend types
    │       ├── status-utils.ts                     # Status styling utilities
    │       └── utils.ts                            # General utilities
    └── package.json
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/overview` | List all diagnostic sections |
| `GET` | `/api/v1/overview/:sectionId` | Get section details (Screen A data) |
| `GET` | `/api/v1/sections/:sectionId/insights` | List insights for a section |
| `GET` | `/api/v1/sections/:sectionId/insights/:insightId` | Get insight details (Screen B data) |

### Example Response — Section Overview

```json
{
  "id": "strategy-in-action",
  "sectionTitle": "Strategy in Action",
  "mainScore": 63,
  "status": "Average",
  "benchmarkScore": 63,
  "comparison": {
    "label": "vs. Industry Benchmark",
    "delta": -8,
    "isPositive": false
  },
  "trend": [58, 62, 60, 54, 63],
  "insights": [...]
}
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** — App Router, Server Components
- **React 19** — Latest React with Server Actions
- **TypeScript 5.7** — Type safety
- **Tailwind CSS 4** — Utility-first styling
- **shadcn/ui** — Accessible component primitives
- **Lucide React** — Icons

### Backend
- **Express 4** — REST API server
- **TypeScript** — Type-safe backend
- **tsx** — Fast TypeScript execution

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | `< 768px` | Single column, stacked cards |
| Tablet | `768px - 1024px` | 2-column grids |
| Desktop | `> 1024px` | 3-column grids, full sidebar |

---

## 🧪 Available Scripts

### Frontend (`/fasttrack`)

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run Biome linter
npm run format   # Format code with Biome
```

### Backend (`/backend/api`)

```bash
npm run dev      # Start with hot-reload (tsx watch)
npm run build    # Compile TypeScript
npm run start    # Run compiled JavaScript
```

---

## 🎨 Design Decisions

1. **Custom SVG Charts** — Built lightweight chart components instead of heavy libraries for faster load times
2. **Server Components** — Data fetching happens on the server for better performance and SEO
3. **Centralized Status Styling** — `status-utils.ts` provides consistent color mappings across all components
4. **Type Re-exports** — Single source of truth for types with re-exports for backwards compatibility
5. **Skeleton Loaders** — Proper loading states that match the final layout to prevent layout shift

---

## 📝 Notes for Reviewers

- The backend uses **in-memory mock data** (no database required)
- API responses are **cached for 60 seconds** via Next.js ISR
- All data flows through the API — no hardcoded values in components
- Error boundaries provide graceful degradation when the API is unavailable
- The sidebar collapses on mobile for better UX

---

## 🔗 Quick Links

- **Dashboard Home:** http://localhost:3000/dashboard/overviews
- **API Health Check:** http://localhost:4000/api/v1/overview

