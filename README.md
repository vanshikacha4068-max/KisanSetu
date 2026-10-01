# 🌾 KisanSetu — Smart Procurement Slot & Live Queue Management Platform

> **"Book Smart. Wait Less. Sell Better."**  
> *Your digital bridge to smarter government agricultural procurement.*

[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Problem Statement

Every harvest season (Rabi and Kharif), millions of Indian farmers transport tractor-trolleys loaded with grain (Wheat, Paddy, Mustard, Maize) to Agricultural Produce Market Committee (APMC) procurement centres.

Farmers routinely experience:
- **Exhausting Physical Waiting Times**: 6 to 18 hours stranded in tractors outside Mandi gates.
- **Uncertainty & Lack of Schedules**: No advance appointment system or predictable arrival windows.
- **Opaque Queue Status**: No visibility into which token is being weighed or inspected inside.
- **Physical Congestion & Spoilage Risks**: Perishable crops exposed to rain and pests during extended queues.

---

## 💡 The Solution: KisanSetu

**KisanSetu** eliminates physical queue bottlenecks by allowing farmers to book guaranteed arrival slots and monitor the live Mandi queue from home:

1. **Smart Slot Booking**: Capacity-aware hourly scheduling (09:00 AM, 10:00 AM, 11:00 AM, etc.) with automatic suggestion of the next available slot when full.
2. **Real-Time Live Queue**: Live synchronization between Officer actions and Farmer screens. As the officer calls tokens, the farmer's queue advances in real time.
3. **Transparent Smart ETA**: Calculated with an explainable formula:  
   $$\text{Estimated Waiting Time} = \text{Farmers Ahead} \times \text{Average Processing Time}$$
4. **Proactive Turn Alerts**:
   - 🟡 **Turn Approaching** (when $\le 5$ farmers remain ahead)
   - 🟢 **Turn is Next** (when $\le 2$ farmers remain ahead)
5. **End-to-End Procurement Lifecycle**: Tracks Gate Arrival, Moisture & Quality Testing, Weighbridge Gross Tare, Mandi Acceptance, and Direct Benefit Transfer (DBT) to bank account.
6. **Mandi Officer Control Desk**: Clean dashboard for procurement superintendents to call next tokens, inspect loads, and trigger status updates.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite 6 |
| **Styling & UI** | Tailwind CSS 3.4, Lucide React Icons, Framer Motion |
| **Interactive Maps** | Leaflet with custom APMC congestion markers |
| **Real-Time Sync Engine** | Dual-mode: Web BroadcastChannel (instant zero-latency multi-tab sync) + Firebase Firestore `onSnapshot` |
| **Audio Synthesizer** | Web Audio API for gentle notification alerts & turn chimes |
| **Hosting & Deployment** | Vercel (configured with `vercel.json` SPA rewrites) |

---

## 🎮 Interactive Demonstration Guide

KisanSetu includes a built-in **Demo Mode Bar** at the top of the screen designed for seamless interactive evaluation.

### Demo Personas:

| Role | Persona Name | Identifier | Assigned Centre | Default State |
| :--- | :--- | :--- | :--- | :--- |
| **Farmer** | Ramesh Kumar | Token `#A-047` | Procurement Centre A (Karnal Mandi) | 9 farmers ahead (~36 min wait) |
| **Officer** | Rajesh Sharma | ID `OFFICER001` | Procurement Centre A | Serving `#A-038` |

### How to Demonstrate Live Real-Time Queue in 30 Seconds:

1. Open **Tab 1**: Navigate to `http://localhost:5173/` and click **"👨🌾 Demo Farmer"** → Opens Farmer Dashboard / Live Queue.
2. Open **Tab 2**: Navigate to `http://localhost:5173/officer` → Opens Officer Dashboard.
3. In **Tab 2 (Officer)**, click the prominent **[ CALL NEXT ]** button:
   - Current token updates from `#A-038` $\rightarrow$ `#A-039` $\rightarrow$ `#A-040`.
4. Switch back to **Tab 1 (Farmer)**:
   - Notice the current token immediately updates without refreshing!
   - Farmers ahead automatically counts down: $9 \rightarrow 8 \rightarrow 7 \rightarrow 6 \dots$
   - Smart ETA updates dynamically.
   - When $\le 5$ farmers remain: 🟡 **"Your turn is approaching"** banner and toast appear.
   - When $\le 2$ farmers remain: 🟢 **"Your turn is next"** urgent alert appears.
5. In **Tab 2 (Officer)**, click **[ Mark Arrived ]** $\rightarrow$ **[ Quality Checked ]** $\rightarrow$ **[ Weighed ]** $\rightarrow$ **[ Accepted ]** $\rightarrow$ **[ Payment Initiated ]**:
   - The farmer's procurement and DBT payment timeline updates in real time.
6. Click **[ Reset Demo ]** at any time to restore the demonstration to its initial state.

---

## 🚀 Running Locally

### Prerequisites:
- Node.js 18+ or 20+
- npm 9+

### 1. Clone & Enter Directory:
```bash
cd "c:/kisan setu"
```

### 2. Install Dependencies:
```bash
npm install
```

### 3. Start Development Server:
```bash
npm run dev
```

Open your browser at: **`http://localhost:5173/`**

### 4. Build for Production:
```bash
npm run build
```

---

## ☁️ Deployment to Vercel

The application is pre-configured with `vercel.json` for one-click deployment:

1. Push your repository to GitHub or GitLab.
2. Go to [Vercel Dashboard](https://vercel.com) and click **"Add New Project"**.
3. Import the `kisan-setu` repository.
4. Framework Preset will auto-detect as **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

---

## 📂 Project Directory Structure

```text
kisan-setu/
├── public/
│   └── favicon.svg           # Custom wheat & leaf brand favicon
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── CentreCard.tsx    # Procurement centre card with distance & congestion
│   │   ├── DemoControlBar.tsx# Sticky demo bar for judges
│   │   ├── MapView.tsx       # Leaflet interactive map with custom pins
│   │   ├── MobileBottomNav.tsx # Sticky mobile navigation
│   │   ├── Navbar.tsx        # Responsive navbar with notifications
│   │   ├── ProcurementTimeline.tsx # Verification & DBT payment timeline
│   │   ├── QueueProgress.tsx # Live progress bar, ETA, and turn alerts
│   │   ├── Sidebar.tsx       # Farmer desktop sidebar
│   │   ├── OfficerSidebar.tsx# Officer desktop sidebar
│   │   ├── SlotCard.tsx      # Slot picker with capacity validation
│   │   ├── StatCard.tsx      # Metric cards with trend indicators
│   │   ├── StatusBadge.tsx   # Congestion & queue badges
│   │   └── Toast.tsx         # Notification toast overlay
│   ├── context/
│   │   └── KisanContext.tsx  # Central state, BroadcastChannel sync, actions
│   ├── data/
│   │   └── initialData.ts    # Realistic mock data (Centres, Queue, MSP)
│   ├── layouts/
│   │   ├── FarmerLayout.tsx  # Farmer shell layout
│   │   └── OfficerLayout.tsx # Officer console layout
│   ├── pages/
│   │   ├── LandingPage.tsx   # Hero, How It Works, Benefits, Mandi Preview
│   │   ├── FarmerLoginPage.tsx # Mobile/OTP + Instant demo login
│   │   ├── OfficerLoginPage.tsx # Officer terminal login
│   │   ├── FarmerDashboard.tsx # Overview, active booking, mini-queue widget
│   │   ├── CentreSelectionPage.tsx # Mandi finder, Leaflet map, sorting
│   │   ├── SlotBookingPage.tsx # Slot booking with smart full-slot validation
│   │   ├── BookingConfirmationPage.tsx # Confetti, token slip, arrival window
│   │   ├── LiveQueuePage.tsx # Dedicated real-time queue screen (Core Feature)
│   │   ├── ProcurementStatusPage.tsx # Milestone timeline & DBT tracking
│   │   ├── NotificationCentrePage.tsx # Unread/read notification centre
│   │   ├── FarmerProfilePage.tsx # Khasra details, land records, bank link
│   │   ├── OfficerDashboardPage.tsx # CALL NEXT, queue table, stage controls
│   │   ├── OfficerQueuePage.tsx # Full roster management
│   │   ├── OfficerAppointmentsPage.tsx # Scheduled hourly slots
│   │   ├── OfficerProcurementPage.tsx # Verification sign-offs
│   │   ├── OfficerStatusPage.tsx # Weighbridge capacity & pace adjustment
│   │   └── OfficerSettingsPage.tsx # Terminal settings & demo reset
│   ├── services/
│   │   └── firebaseConfig.ts # Firebase SDK setup & demo fallbacks
│   ├── types/
│   │   └── index.ts          # TypeScript domain models
│   ├── utils/
│   │   └── audio.ts          # Web Audio API alert sound synthesizer
│   ├── App.tsx               # Route definitions
│   ├── index.css             # Tailwind base & custom scrollbars
│   └── main.tsx              # React DOM entry point
├── package.json
├── tailwind.config.js        # Theme colors (kisan-green, crop-gold, earth)
├── tsconfig.json
├── vercel.json               # SPA routing rewrite rule
└── vite.config.ts            # Vite 6 chunking optimizations
```

---

## 👥 Authors & Acknowledgments

- Agricultural Mandi Procurement Queue Optimization platform.
- Designed with farmer-first rural accessibility, high-contrast typography, and modern government digital standards.
