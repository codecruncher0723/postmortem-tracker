📊 PostMortem Tracker

A high-performance, enterprise-grade Incident and Root Cause Analysis (RCA) tracker.

Built for engineers who value Extreme Ownership and need a structured way to document, track, and resolve system failures with clarity and precision.

🚀 Features

🔴 Incident Tracking
Track incidents from detection to resolution with severity levels and timestamps.

📊 Real-time Analytics
Automatic dashboard metrics to monitor system health and critical failures.

🔎 Smart Search
Instant filtering and search across all incidents.

💾 Data Portability
Export and import full incident history using JSON.

⚡ Event-Driven UI
Optimized UI using native DOM APIs and event delegation.

🧠 Type Safety First
Built with strict TypeScript for reliable, predictable behavior.

🛠 Tech Stack
Language: TypeScript
Build Tool: Vite
Storage: LocalStorage (Web Storage API)
Architecture: Layered Architecture (MVC-inspired separation)
Models
Services
Components
Utils
📦 Getting Started
Prerequisites
Node.js (v18+ recommended)
npm (comes with Node.js)

🔧 Installation
1. Clone the repository
git clone https://github.com/codecruncher0723/postmortem-tracker.git

2. Navigate to project
cd postmortem-tracker/Project

3. Install dependencies
npm install

4. Start development server
npm run dev

5. Open in browser
Visit:
http://localhost:5173

Project/
├── public/                # Static assets
├── src/
│   ├── components/       # UI components (Incident cards, dashboard UI)
│   ├── models/           # TypeScript interfaces & types
│   ├── services/         # Business logic + localStorage handling
│   ├── utils/            # Helper functions (analytics, factories)
│   ├── styles/           # Global styles
│   └── main.ts           # Application entry point
│
├── index.html            # App root HTML
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript config
├── package.json          # Dependencies & scripts
└── dist/                 # Production build output (auto-generated)

🧠 Engineering Philosophy

This project follows:

Single Responsibility Principle (SRP)
Layered Architecture
Separation of Concerns
Framework-agnostic design

Business logic is fully decoupled from UI components to ensure scalability and maintainability.

📦 Build for Production
npm run build

Output will be generated in:
dist/

🌐 Deployment (GitHub Pages)
npm run deploy

Make sure vite.config.ts contains:
base: '/postmortem-tracker/'

📝 License
This project is open-source and intended for educational use.
