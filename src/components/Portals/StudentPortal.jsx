import React from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { 
  UserCheck, 
  CheckCircle2, 
  Building2, 
  Clock, 
  Briefcase
} from 'lucide-react';

export const StudentPortal = () => {
  const { students, selectedStudentId, setSelectedStudentId, drives, applyStudentToDrive } = usePlacement();

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  if (!currentStudent) return null;

  // Filter drives student is eligible for
  const eligibleDrives = drives.filter(d => {
    const meetCgpa = currentStudent.cgpa >= d.minCgpa;
    const meetBacklogs = currentStudent.backlogs <= d.maxBacklogs;
    const meetBranch = (d.allowedBranches || []).length === 0 || d.allowedBranches.includes(currentStudent.department);
    return meetCgpa && meetBacklogs && meetBranch;
  });

  const appliedDrivesList = drives.filter(d => (currentStudent.appliedDriveIds || []).includes(d.id));

  return (
    <div className="space-y-6">
      
      {/* Student Identity Header Card */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/25 relative overflow-hidden bg-gradient-to-r from-gray-950 via-blue-950/40 to-gray-950">
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img 
              src={currentStudent.avatar} 
              alt={currentStudent.name} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/50 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">{currentStudent.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {currentStudent.department}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium">Roll No: {currentStudent.rollNo} • {currentStudent.email}</p>

              {/* Skills list */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {(currentStudent.skills || []).map(skill => (
                  <span key={skill} className="text-[10px] px-2 py-0.5 rounded-md bg-gray-800 text-gray-300 font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Placement Outcome Card */}
          <div className="w-full md:w-auto p-4 rounded-xl bg-gray-950/80 border border-gray-800 min-w-[240px]">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Current Placement Status</p>
            {currentStudent.status === 'Placed' ? (
              <div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Placed at {currentStudent.placedCompany}
                </div>
                <p className="text-xs text-gray-300">{currentStudent.placedRole}</p>
                <p className="text-sm font-black text-amber-400 mt-1">{currentStudent.ctc} LPA Package</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
                  <Clock className="w-4 h-4 animate-spin" />
                  Actively Seeking Offers
                </div>
                <p className="text-xs text-gray-400 mt-1">CGPA: <strong className="text-white">{currentStudent.cgpa.toFixed(2)}</strong> | Backlogs: {currentStudent.backlogs}</p>
              </div>
            )}
          </div>
        </div>

        {/* Switch Student selector for demo */}
        <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
          <span>Viewing TCET portal for student:</span>
          <select
            value={selectedStudentId}
            onChange={e => setSelectedStudentId(e.target.value)}
            className="px-3 py-1 rounded-xl glass-input text-xs bg-gray-900"
          >
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.department} - CGPA {s.cgpa})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Applied Drives Status Grid */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-amber-400" />
          My TCET Applications Tracker ({appliedDrivesList.length})
        </h3>

        {appliedDrivesList.length === 0 ? (
          <div className="glass-panel p-6 rounded-2xl text-center text-gray-500 text-xs">
            You have not submitted applications to any campus drives yet. Browse eligible drives below to apply!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {appliedDrivesList.map(drive => (
              <div key={drive.id} className="glass-card p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                      {drive.companyName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{drive.companyName}</h4>
                      <p className="text-[10px] text-gray-400">{drive.jobTitle}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-400">{drive.ctc} LPA</span>
                </div>

                {/* Simulated Pipeline Steps */}
                <div className="p-2.5 rounded-xl bg-gray-950/60 border border-gray-800 space-y-1.5">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Application Stage</p>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Application Submitted & Under Review</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Eligible Drives Available for 1-Click Apply */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-400" />
          Eligible Hiring Drives ({eligibleDrives.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eligibleDrives.map(drive => {
            const hasApplied = (currentStudent.appliedDriveIds || []).includes(drive.id);

            return (
              <div key={drive.id} className="glass-panel p-5 rounded-2xl border border-gray-800 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{drive.companyName}</h4>
                      <p className="text-xs text-gray-400">{drive.jobTitle} • {drive.industry}</p>
                    </div>
                    <span className="text-sm font-black text-amber-400">{drive.ctc} LPA</span>
                  </div>

                  <p className="text-xs text-gray-300 my-2 line-clamp-2">{drive.description}</p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400">
                    <span>Min CGPA: <strong className="text-white">{drive.minCgpa}</strong></span>
                    <span>Deadline: <strong className="text-amber-400">{drive.deadline}</strong></span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">Location: {drive.location}</span>
                  
                  <button
                    disabled={hasApplied}
                    onClick={() => applyStudentToDrive(currentStudent.id, drive.id)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      hasApplied
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        : 'bg-amber-400 hover:bg-amber-300 text-gray-950 shadow-md shadow-amber-500/25'
                    }`}
                  >
                    {hasApplied ? 'Applied ✓' : '1-Click Apply'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

