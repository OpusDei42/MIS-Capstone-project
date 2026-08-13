import React from 'react';
import { usePlacement } from '../context/PlacementContext';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Megaphone, 
  UserCheck, 
  Briefcase, 
  FileSpreadsheet
} from 'lucide-react';
import { exportStudentsToCSV } from '../utils/exportCsv';

export const Sidebar = () => {
  const { activeTab, setActiveTab, students } = usePlacement();

  const mainNavItems = [
    { id: 'dashboard', label: 'TCET Executive MIS', icon: LayoutDashboard },
    { id: 'students', label: 'Student Directory', icon: Users },
    { id: 'drives', label: 'Placement Drives', icon: Building2 },
    { id: 'announcements', label: 'Notices & Board', icon: Megaphone },
  ];

  const portalNavItems = [
    { id: 'student-portal', label: 'Student Portal', icon: UserCheck, badge: 'Student' },
    { id: 'recruiter-portal', label: 'Recruiter Hub', icon: Briefcase, badge: 'Recruiter' },
  ];

  return (
    <aside className="w-full lg:w-64 bg-gray-950/70 backdrop-blur-md border-r border-amber-500/20 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        
        {/* Navigation Group 1: Core TPO MIS */}
        <div>
          <h3 className="text-[10px] font-black tracking-widest text-amber-400/80 uppercase px-3 mb-2">
            TCET T&P Management
          </h3>
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-400 text-gray-950 shadow-lg shadow-amber-500/20'
                      : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gray-950' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Navigation Group 2: Specialized Role Portals */}
        <div>
          <h3 className="text-[10px] font-black tracking-widest text-blue-400/80 uppercase px-3 mb-2">
            TCET Role Portals
          </h3>
          <nav className="space-y-1">
            {portalNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-900 text-gray-400'
                  }`}>
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Footer Info Box & Export Callout */}
      <div className="pt-4 border-t border-gray-800/80 space-y-3">
        <div className="p-3 rounded-xl bg-gray-900/80 border border-amber-500/20">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-400 font-medium">TCET Batch</span>
            <span className="font-bold text-amber-400">2026 Season</span>
          </div>
          <p className="text-[10px] text-gray-400">UGC Autonomous | Kandivali (E)</p>
        </div>

        <button
          onClick={() => exportStudentsToCSV(students)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Export TCET Report (CSV)
        </button>
      </div>
    </aside>
  );
};

