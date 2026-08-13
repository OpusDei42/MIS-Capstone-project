import React from 'react';
import { PlacementProvider, usePlacement } from './context/PlacementContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { KpiCards } from './components/Analytics/KpiCards';
import { DeptPlacementChart } from './components/Analytics/DeptPlacementChart';
import { PackageDistributionChart } from './components/Analytics/PackageDistributionChart';
import { PlacementTrendChart } from './components/Analytics/PlacementTrendChart';
import { StudentDirectory } from './components/Students/StudentDirectory';
import { CompanyDrivesList } from './components/Drives/CompanyDrivesList';
import { NoticeBoard } from './components/Announcements/NoticeBoard';
import { StudentPortal } from './components/Portals/StudentPortal';
import { RecruiterPortal } from './components/Portals/RecruiterPortal';
import { Sparkles, Award } from 'lucide-react';

const DashboardView = () => {
  return (
    <div className="space-y-6">
      
      {/* TCET Mumbai Welcome Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/25 bg-gradient-to-r from-gray-950 via-blue-950/60 to-gray-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              TCET MUMBAI
            </span>
            <span className="text-xs text-gray-400 font-medium">UGC Autonomous | Batch 2026</span>
          </div>
          <h1 className="text-xl font-black text-white mt-1">
            Thakur College of Engineering & Technology — T&P Cell MIS Dashboard
          </h1>
          <p className="text-xs text-gray-300 mt-0.5">
            Real-time statistics on TCET campus placement drives, student package distribution, and recruiter drives.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 shrink-0">
          <Award className="w-4 h-4 text-amber-400" />
          <span>NAAC A Grade Accredited</span>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <KpiCards />

      {/* Analytics Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeptPlacementChart />
        <PackageDistributionChart />
      </div>

      {/* Cumulative Placement Progression Trend */}
      <PlacementTrendChart />

    </div>
  );
};

const MainContent = () => {
  const { activeTab } = usePlacement();

  return (
    <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-6">
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'students' && <StudentDirectory />}
      {activeTab === 'drives' && <CompanyDrivesList />}
      {activeTab === 'announcements' && <NoticeBoard />}
      {activeTab === 'student-portal' && <StudentPortal />}
      {activeTab === 'recruiter-portal' && <RecruiterPortal />}
    </main>
  );
};

export default function App() {
  return (
    <PlacementProvider>
      <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans selection:bg-amber-500 selection:text-gray-950">
        <Navbar />
        <div className="flex-1 flex flex-col lg:flex-row">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </PlacementProvider>
  );
}

