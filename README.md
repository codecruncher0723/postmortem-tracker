PostMortem Tracker
A high-performance, enterprise-grade Incident and Root-Cause Analysis (RCA) tracker. Designed for engineers who believe in "Extreme Ownership" and need to document, track, and resolve system failures with precision.

🚀 Features
Extreme Accountability: Track incidents from detection to resolution with clear severity levels.

Real-time Analytics: Automated dashboard metrics to monitor critical system fires.

Search & Sort: Instant filtering across your incident database as you type.

Data Portability: Seamlessly export your entire incident history to JSON and import it to new environments.

Event-Driven Architecture: Highly performant UI using Event Delegation and modern Web APIs.

Type-Safe Foundation: Built with strictly typed TypeScript to ensure zero-runtime data corruption.

🛠️ Tech Stack
Language: TypeScript

Build Tool: Vite

Logic: Native DOM API, Web Storage API (localStorage)

Architecture: Layered Architecture (Models, Services, Components, Utils)

📦 Getting Started
Prerequisites
Node.js (v18 or higher recommended)

npm (comes with Node.js)

Installation
Clone the repository:

Bash
git clone https://github.com/codecruncher0723/postmortem-tracker.git
Navigate into your project folder:

Bash
cd postmortem-tracker/Project
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
Open your browser to the URL provided in the terminal (usually http://localhost:5173).

📁 Project Structure
Plaintext
Project/
├── src/
│   ├── components/      # UI components (Incident cards, etc.)
│   ├── models/          # TypeScript Interfaces and Types
│   ├── services/        # Business logic & Data Persistence
│   ├── utils/           # Helper functions (Analytics, Factories)
│   ├── main.ts          # Application entry point
│   └── styles/          # Global styles
├── package.json         # Project metadata and dependencies
└── tsconfig.json        # TypeScript configuration
🧠 Engineering Philosophy
This project was built following the Single Responsibility Principle (SRP) and Layered Architecture. By decoupling business logic from the UI, the application remains scalable and framework-agnostic.

📝 License
This project is open-source and available for educational purposes.
