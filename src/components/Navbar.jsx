import React from 'react';
import { usePlacement } from '../context/PlacementContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  Building2, 
  RotateCcw, 
  Download
} from 'lucide-react';
import { exportStudentsToCSV } from '../utils/exportCsv';

export const Navbar = () => {
  const { 
    activeRole, 
    setActiveRole, 
    setActiveTab, 
    resetToMockData, 
    students
  } = usePlacement();

  const handleRoleChange = (role) => {
    setActiveRole(role);
    if (role === 'admin') setActiveTab('dashboard');
    if (role === 'student') setActiveTab('student-portal');
    if (role === 'recruiter') setActiveTab('recruiter-portal');
  };

  return (
    <header className="sticky top-0 z-40 bg-gray-950/85 backdrop-blur-xl border-b border-amber-500/20 px-4 lg:px-8 py-3 transition-all">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Branding - TCET Mumbai */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleRoleChange('admin')}>
            <div className="p-2.5 bg-gradient-to-tr from-amber-500 via-amber-600 to-blue-900 rounded-xl shadow-lg shadow-amber-500/20 border border-amber-400/40">
              <GraduationCap className="w-6 h-6 text-gray-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-white tracking-wide">TCET MUMBAI</span>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  T&P CELL MIS
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium">Thakur College of Engineering & Technology</p>
            </div>
          </div>
        </div>

        {/* Center Role Switcher Pills */}
        <div className="flex items-center bg-gray-900/90 p-1.5 rounded-2xl border border-gray-800 shadow-inner">
          <button
            onClick={() => handleRoleChange('admin')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeRole === 'admin'
                ? 'bg-amber-400 text-gray-950 shadow-md shadow-amber-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            TPO Officer
          </button>

          <button
            onClick={() => handleRoleChange('student')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeRole === 'student'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Student View
          </button>

          <button
            onClick={() => handleRoleChange('recruiter')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeRole === 'recruiter'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Recruiter Hub
          </button>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-3">
          {/* Quick CSV Export */}
          <button
            onClick={() => exportStudentsToCSV(students)}
            title="Export Placement Report CSV"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-gray-900 text-gray-300 border border-gray-800 hover:border-amber-500/40 hover:text-amber-300 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Export Report</span>
          </button>

          {/* Reset Mock Data button */}
          <button
            onClick={() => {
              if (window.confirm('Reset all placement data back to TCET initial mock records?')) {
                resetToMockData();
              }
            }}
            title="Reset TCET Data"
            className="p-2 rounded-xl text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 border border-transparent hover:border-amber-500/30 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Divider */}
          <div className="h-5 w-px bg-gray-800" />

          {/* Active User Identity Badge */}
          <div className="flex items-center gap-2 pl-1">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-blue-900 flex items-center justify-center font-black text-gray-950 text-xs shadow-md border border-amber-400/30">
              {activeRole === 'admin' ? 'TPO' : activeRole === 'student' ? 'STU' : 'REC'}
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold text-gray-200">
                {activeRole === 'admin' ? 'TCET TPO Cell' : activeRole === 'student' ? 'Aarav Sharma' : 'Google HR Team'}
              </p>
              <p className="text-[10px] text-amber-400 font-semibold capitalize">{activeRole} Mode</p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

