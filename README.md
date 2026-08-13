# 🎓 TCET Mumbai — Training & Placement (T&P) Cell MIS Dashboard

An end-to-end, real-time Management Information System (MIS) designed for **Thakur College of Engineering & Technology (TCET), Mumbai** (UGC Autonomous, NAAC A Grade). This application streamlines campus recruitment operations, tracks student placement statistics, visualizes placement analytics, and provides role-based portals for TPO Admins, Students, and Corporate Recruiters.

---

## 🚀 Key Features

### 📊 1. Executive Analytics & Placement Intelligence
- **Real-Time KPI Tracking**: Instant metrics for total students, placement percentage, average CTC, highest CTC package, and active recruitment drives.
- **Department-wise Analytics**: Interactive bar charts comparing total vs. placed students across departments (COMP, IT, EXTC, AIML, DS, AIDS).
- **Package Distribution**: Pie/Donut charts categorizing salary brackets (< 5 LPA, 5-8 LPA, 8-12 LPA, 12+ LPA).
- **Placement Progression Trend**: Line charts visualizing month-by-month placement rate trajectory across the academic cycle.

### 👨‍🎓 2. Student Directory & Placement Management
- **Interactive Directory**: Searchable and filterable roster by department, placement status (Placed, Unplaced, In-Process), and CGPA.
- **Detailed Profiles & Modals**: View academic history, active backlogs, CGPA, applied drives, and downloaded offer letters.
- **Offer Logging**: Seamless interface for TPO officers to record student offers, company names, roles, and CTC packages.

### 💼 3. Corporate Recruitment Drive Management
- **Drive Listing & Statuses**: Manage scheduled, ongoing, and completed campus drives.
- **Eligibility Enforcement**: Automatic validation of CGPA thresholds and department criteria.
- **Drive Lifecycle Modals**: Create, edit, and view recruitment drive details including CTC breakdown, job role, and application count.

### 👥 4. Multi-Role Interactive Portals
- **TPO Admin Portal**: Full administrative command center for managing student directory, company drives, announcements, and global metrics.
- **Student Self-Service Portal**: Personal dashboard for students to discover eligible drives, apply with one click, track drive status, and view recorded offers.
- **Recruiter Portal**: Dedicated workspace for hiring partners to monitor job postings, view applicant rosters, manage interview stages, and submit selections.

### 📢 5. Announcement & Notice Board
- Priority-tagged notice distribution system (Drive Alerts, Policy Updates, Schedule Changes).
- Direct filtering by category for fast navigation.

### 💾 6. Local Storage Persistence & Data Export
- **Offline Persistence**: Automatic state synchronization with browser `localStorage` and single-click reset to mock data.
- **CSV Data Export**: Export student records and placement statistics into CSV format for offline reporting.

---

## 🛠️ Technology Stack

| Component | Technology / Library |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/) (Custom Dark Glassmorphic Design) |
| **Charts & Visuals** | [Recharts 3](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Code Quality & Linting**| [Oxlint](https://oxc.rs/) |

---

## 📁 Project Architecture

```
mis-capstone-project/
├── public/                  # Static assets and icons
├── src/
│   ├── assets/              # Branding and image assets
│   ├── components/
│   │   ├── Analytics/       # KPI cards, Department, Package, and Trend charts
│   │   ├── Announcements/   # Notice Board components
│   │   ├── Drives/          # Drive list, Create/Edit/Detail modals
│   │   ├── Portals/         # StudentPortal & RecruiterPortal views
│   │   ├── Students/        # StudentDirectory, StudentModal, OfferModal
│   │   ├── Navbar.jsx       # Header with Role Switcher & Quick Metrics
│   │   └── Sidebar.jsx      # Navigation sidebar
│   ├── context/
│   │   └── PlacementContext.jsx # Global state management & local storage sync
│   ├── mock/
│   │   └── initialData.js   # Pre-populated TCET mock dataset
│   ├── utils/
│   │   └── exportCsv.js     # Utility function for CSV generation
│   ├── App.jsx              # Main app shell and route view dispatcher
│   ├── index.css            # Custom CSS utility classes & Tailwind setup
│   └── main.jsx             # React DOM root entry
├── package.json
└── vite.config.js
```

---

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js (version 18 or higher) installed on your system.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/OpusDei42/test-repo.git
   cd "MIS Capstone project"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for Production**
   ```bash
   npm run build
   ```

5. **Run Linter**
   ```bash
   npm run lint
   ```

---

## 🔄 User Role Workflow

The application supports switching between three primary personas via the top navigation bar:

1. **TPO Officer (Admin)**: Full system access for overseeing college-wide analytics, adding/editing student data, posting company drives, and broadcasting notices.
2. **Student**: View personalized dashboard, explore drives matching CGPA/department criteria, apply to companies, and access logged offers.
3. **Recruiter**: Manage company job listings, review applied candidates, filter student profiles, and update hiring statuses.

---

## 📝 License

This project is open-source under the [MIT License](LICENSE).

