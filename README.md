# GiTravel: Travel Planning SPA

## Key Technical Highlights

- **Advanced State Architecture** — Redux Toolkit + RTK Query with smart caching & invalidation  
- **Complex Multi-Step Wizard** — Persistent, dynamic, and fully typed (7-step flow)  
- **Full Firebase Integration** — Auth, Firestore, Storage with real-time sync  
- **Scalable Codebase** — Feature-based structure + path aliases  
- **Performance Optimized** — Debouncing, lazy loading, memoization  
- **Production UX** — Upload progress tracking, error boundaries, responsive UI  
- **TypeScript Strict Mode** — Zero runtime surprises  

---

## Simplified App Preview

To demonstrate the application's responsiveness and complex workflows, here is a few screenshots.

<p align="center">
  <img src="https://github.com/user-attachments/assets/65271697-cb2e-4953-bd7f-667b8f64738d" width="90%" alt="Main Dashboard"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/609e5eeb-4bcc-4089-b59e-5e99ac7f9b65" width="48%" alt="Wizard Step Overview"/>
  <img src="https://github.com/user-attachments/assets/9f56c44e-163f-487c-8f6f-03b6547cd36a" width="48%" alt="Expenses & Orchestration"/>
</p>

<br />

<details>
  <summary><b>🔍 View more screenshots (Desktop & Mobile)</b></summary>
  <br />
  
  ### 🖥️ Desktop Workflow
  <p align="center">
    <img src="https://github.com/user-attachments/assets/03e108e8-a7f8-4100-a159-7062d0b782ea" width="30%" />
    <img src="https://github.com/user-attachments/assets/609e5eeb-4bcc-4089-b59e-5e99ac7f9b65" width="30%" />
    <img src="https://github.com/user-attachments/assets/214816dc-bdf6-49ee-8499-97b68dc8ddc0" width="30%" />
  </p>
  <p align="center">
    <img src="https://github.com/user-attachments/assets/f73f087d-ef05-407c-8e94-99f6d03d3cfd" width="30%" />
    <img src="https://github.com/user-attachments/assets/ac248e12-e594-4b85-9374-ccbbe7894cf9" width="30%" />
    <img src="https://github.com/user-attachments/assets/d8a4ec75-87cd-407a-aafe-6d9f1f57833f" width="30%" />
  </p>

  ### 📱 Mobile Responsiveness
  <p align="center">
    <img src="https://github.com/user-attachments/assets/1bc58c81-e052-4a55-aade-e80a9bc3f2bd" width="22%" alt="Mobile UI 1"/> 
    <img src="https://github.com/user-attachments/assets/83d0ac81-8b6b-4d74-8952-a45c73d75d95" width="22%" alt="Mobile UI 2"/>
    <img src="https://github.com/user-attachments/assets/53d50e86-81d3-406c-b73f-3ffa7ed3d2ed" width="22%" alt="Mobile UI 3"/>
    <img src="https://github.com/user-attachments/assets/e05f8737-da42-4562-bf19-15421d513f65" width="22%" alt="Mobile UI 4"/>
  </p>
</details>

---

## Some Features

### Trip Management & Wizard (Highlight Feature)
- **7-Step Guided Flow:** Travel Info ➔ Destinations ➔ Places ➔ Expenses ➔ Documents ➔ Packing Lists ➔ Photos.
- **Persistent State:** Fully persisted wizard state survives browser refreshes and accidental navigations.
- **Complex Forms:** Dynamic step rendering with nested form array handling.

### Financial & Media Hub
- **Expense Tracking:** Categorized expenses with real-time budget calculations and visual category UI.
- **Asset Vault:** Upload documents and photos with real-time 0-100% progress tracking via Firebase Storage.

### Auth & Dashboard
- **Security:** Firebase Auth (email/password) with persistent sessions and protected React routes.
- **Dashboard:** Recent trips overview, featured trip preview, and empty-state UX.

---

## Client-Side Architecture & Data Flow

This pipeline is deliberately designed to minimize unnecessary network requests by utilizing an intelligent caching layer and optimistic UI updates.

```text
[User Interaction / UI Component]
      |
      ▼
[React Hook Form] ───────────── (Strict Validation & Debouncing)
      |
      ▼
[Redux Toolkit State Engine] ── (Local State & Persistence Layer)
      |
      ▼
[RTK Query API Slice] ───────── (Cache Invalidation & Request Deduping)
      |
      ▼
[Service Layer] ─────────────── (Firebase SDK Wrappers & fakeBaseQuery)
      |
      ▼
[Cloud Infrastructure] ──────── (Firestore DB & Firebase Storage)
```

---

## Engineering Patterns

### RTK Query Smart Caching
- **Tag-based invalidation:** Modifying a trip automatically triggers targeted refetches without manual state manipulation.
- **Network Bypass:** Integrated Firebase seamlessly into RTK Query using `fakeBaseQuery`.

### Resumable File Upload System
- Custom `useStorage` hook wraps Firebase tasks to handle parallel file uploads using `Promise.allSettled`.
- Includes per-file progress tracking and failure handling without blocking the main UI thread.

### Performance & UX Optimizations
- **Efficiency:** Debounced form updates, lazy-loaded routes, and memoized computations.
- **Design:** Fully responsive (mobile-first), animated drawer navigation, and clean Material UI theming.
- **Fault Tolerance:** Global RTK error middleware, React ErrorBoundary, and Firebase error mapping.

---

## Technology Stack

* **Frontend:** React 18, TypeScript (strict mode), Vite 5  
* **State Management:** Redux Toolkit, RTK Query, Redux Persist  
* **UI & Forms:** Material UI (MUI 6), Emotion (CSS-in-JS), React Hook Form  
* **Backend (BaaS):** Firebase Authentication, Firestore, Firebase Storage  
* **Utilities:** DayJS, Lodash (debounce, deep equality), UUID  

---

## Architectural Structure

>  **Architectural Note:** The directory tree below is a high-level, simplified abstraction for readability. The actual codebase contains significantly deeper nesting, more granular component separation, and numerous utility files to support the application's complex state and routing.

The codebase is strictly organized using a modular, feature-based architecture to ensure scalability, clean separation of concerns, and maintainability.

```text
GiTravel/
├── .github/workflows/        # CI/CD pipelines (Automated Firebase Hosting deployments)
├── src/
│   ├── app/                  # Core initialization
│   │   └── config/           # Global routing logic (AppRouter, ProtectedRoute, ErrorBoundary)
│   ├── features/             # Isolated business domains
│   │   ├── auth/             # Authentication logic & state
│   │   ├── dashboard/        # Main landing logic (Hero, FeaturedTripCard)
│   │   └── trip/             # Complex Trip domain
│   │       ├── add-trip/     # 7-step wizard orchestration logic
│   │       ├── edit/         # Post-creation management (Tabs: Expenses, Documents, Photos)
│   │       ├── store/        # Isolated Redux slices for trip state
│   │       └── utils/        # Domain-specific helpers (e.g., getTripTotalBudget.ts)
│   ├── services/             # External Integrations & Data Layer
│   │   ├── api/              # RTK Query endpoints (auth.ts, trip.ts)
│   │   ├── firebase/         # Firebase SDK initialization & wrappers
│   │   └── date/             # Global date manipulation services
│   ├── ui/                   # Reusable Atomic UI Kit
│   │   ├── layout/           # App shells (AccountLayout, AuthLayout, Sidebar)
│   │   └── form/             # Controlled input components (DateSelectInput)
│   └── hooks/                # Shared application-level custom hooks
├── firebase.json             # Firebase project configuration
├── vercel.json               # Vercel deployment rules (SPA fallback routing)
├── eslint.config.js          # Strict linting rules
└── vite.config.ts            # Build configuration & path aliasing
```
---

## Local Development Setup

To run this project locally, you will need `Node.js` installed and an active Firebase project for the backend services.

1. **Clone the repository:**
```bash
git clone https://github.com/IgorBaranow/travel.git
cd travel
```

2. **Install dependencies** (Yarn is recommended):
```bash
yarn install
```

3. **Configure Environment Variables:**
Create a `.env` file in the root directory and add your Firebase configuration keys:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Start the development server:**
```bash
yarn dev
```

---

## 🔗 Links & Deployment

* **Live Demo:** [GiTravel Production App](https://gitravel.vercel.app) *(Deployed on Vercel)*
* **Design Inspiration:** Built referencing modern travel UI kits from Figma.

---

## 🙏 Acknowledgments & Mentorship

This project serves as the capstone of my comprehensive learning journey, and I owe a massive thank you to my mentor, **[Andrii Matviichuk](https://github.com/andrii-matviichuk)** (Senior Full-Stack Developer). 

He has guided me not just through the development of GiTravel, but throughout my entire path in software engineering. His rigorous code reviews, architectural guidance, and willingness to share enterprise-level insights were instrumental in transforming my foundational knowledge into the ability to build scalable, production-grade systems.

---
 **My LinkedIn:** [linkedin.com/in/igor-baranow](https://www.linkedin.com/in/igor-baranow/)

> "GiTravel represents the culmination of my guided learning path and my transition into engineering complex, maintainable applications. Thank you for your time and review!"
