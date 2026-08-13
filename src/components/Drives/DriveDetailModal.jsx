import React from 'react';
import { X, Building2, Calendar, MapPin, Award, Users, CheckCircle, Clock } from 'lucide-react';
import { usePlacement } from '../../context/PlacementContext';

export const DriveDetailModal = ({ isOpen, onClose, drive }) => {
  const { students } = usePlacement();

  if (!isOpen || !drive) return null;

  // Filter students who have applied for this drive
  const appliedStudents = students.filter(s => (s.appliedDriveIds || []).includes(drive.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-gray-900 border border-amber-500/30 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Top Header Banner */}
        <div className="px-6 py-5 bg-gradient-to-r from-gray-900 via-blue-950/50 to-gray-900 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl border ${drive.logoBg || 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
              {drive.companyName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">{drive.companyName}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {drive.industry}
                </span>
              </div>
              <p className="text-xs text-gray-300 font-medium">{drive.jobTitle} • Package: <span className="text-amber-400 font-black">{drive.ctc} LPA</span></p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Key Quick Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-gray-950/70 border border-gray-800">
              <p className="text-[10px] text-gray-500 font-medium uppercase">Min CGPA</p>
              <p className="text-sm font-black text-white">{drive.minCgpa}+</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-950/70 border border-gray-800">
              <p className="text-[10px] text-gray-500 font-medium uppercase">Max Backlogs</p>
              <p className="text-sm font-black text-white">{drive.maxBacklogs} allowed</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-950/70 border border-gray-800">
              <p className="text-[10px] text-gray-500 font-medium uppercase">Drive Date</p>
              <p className="text-sm font-black text-amber-400">{drive.driveDate}</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-950/70 border border-gray-800">
              <p className="text-[10px] text-gray-500 font-medium uppercase">Total Applicants</p>
              <p className="text-sm font-black text-emerald-400">{appliedStudents.length}</p>
            </div>
          </div>

          {/* Location / Venue */}
          <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 flex items-center justify-between text-xs text-gray-300">
            <span className="text-gray-400 font-medium">Campus Location / Venue:</span>
            <span className="font-bold text-blue-300">{drive.location || 'TCET Main Auditorium'}</span>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Job Overview</h4>
            <p className="text-xs text-gray-400 leading-relaxed bg-gray-950/40 p-3 rounded-xl border border-gray-800">
              {drive.description}
            </p>
          </div>

          {/* Selection Rounds Pipeline */}
          <div>
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Selection Process Pipeline</h4>
            <div className="flex flex-wrap items-center gap-2">
              {(drive.rounds || []).map((round, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-gray-800 text-amber-300 border border-amber-500/20">
                    Round {idx + 1}: {round}
                  </span>
                  {idx < (drive.rounds || []).length - 1 && <span className="text-gray-600 font-bold">→</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Applied Student Applicants List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Applied Candidates ({appliedStudents.length})
              </h4>
            </div>

            <div className="space-y-2">
              {appliedStudents.length === 0 ? (
                <p className="text-xs text-gray-500 py-3 text-center bg-gray-950/30 rounded-xl">
                  No candidate applications recorded yet for this drive.
                </p>
              ) : (
                appliedStudents.map(student => (
                  <div key={student.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-950/60 border border-gray-800 hover:border-gray-700">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-xl object-cover" />
                      <div>
                        <p className="text-xs font-bold text-white">{student.name}</p>
                        <p className="text-[10px] text-gray-400">{student.rollNo} • {student.department}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-semibold text-amber-400">CGPA {student.cgpa.toFixed(2)}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        student.status === 'Placed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-800 text-gray-400'
                      }`}>
                        {student.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
