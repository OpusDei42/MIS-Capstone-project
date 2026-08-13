import React, { useState } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { 
  Building2, 
  Users, 
  CheckCircle, 
  Search
} from 'lucide-react';

export const RecruiterPortal = () => {
  const { 
    drives, 
    students, 
    selectedRecruiterDriveId, 
    setSelectedRecruiterDriveId,
    recordOffer
  } = usePlacement();

  const [search, setSearch] = useState('');
  const [minCgpaFilter] = useState(0);

  const activeDrive = drives.find(d => d.id === selectedRecruiterDriveId) || drives[0];

  if (!activeDrive) return null;

  // Applicants for this drive
  const driveApplicants = students.filter(s => (s.appliedDriveIds || []).includes(activeDrive.id));

  const filteredApplicants = driveApplicants.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchCgpa = s.cgpa >= minCgpaFilter;
    return matchSearch && matchCgpa;
  });

  return (
    <div className="space-y-6">
      
      {/* Recruiter Banner & Drive Switcher */}
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/25 bg-gradient-to-r from-gray-950 via-blue-950/40 to-gray-950">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl border ${activeDrive.logoBg || 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
              {activeDrive.companyName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">{activeDrive.companyName} TCET Recruiter Portal</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Recruiter Hub
                </span>
              </div>
              <p className="text-xs text-gray-400">{activeDrive.jobTitle} • Package: <strong className="text-amber-400">{activeDrive.ctc} LPA</strong></p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-semibold">Select TCET Visit:</span>
            <select
              value={selectedRecruiterDriveId}
              onChange={e => setSelectedRecruiterDriveId(e.target.value)}
              className="px-3 py-1.5 rounded-xl glass-input text-xs bg-gray-900"
            >
              {drives.map(d => (
                <option key={d.id} value={d.id}>
                  {d.companyName} - {d.jobTitle} ({d.ctc} LPA)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-2xl">
          <p className="text-[11px] text-gray-400 font-semibold uppercase">Total Applications</p>
          <h4 className="text-2xl font-black text-white mt-1">{driveApplicants.length}</h4>
        </div>
        <div className="glass-card p-4 rounded-2xl">
          <p className="text-[11px] text-gray-400 font-semibold uppercase">Shortlisted Candidates</p>
          <h4 className="text-2xl font-black text-amber-400 mt-1">
            {driveApplicants.filter(s => s.cgpa >= activeDrive.minCgpa).length}
          </h4>
        </div>
        <div className="glass-card p-4 rounded-2xl">
          <p className="text-[11px] text-gray-400 font-semibold uppercase">Offers Issued</p>
          <h4 className="text-2xl font-black text-emerald-400 mt-1">
            {driveApplicants.filter(s => s.placedCompany === activeDrive.companyName).length}
          </h4>
        </div>
      </div>

      {/* Applicant Screening & Shortlisting Table */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 glass-card p-4 rounded-2xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            TCET Candidate Screening ({filteredApplicants.length})
          </h3>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search candidates..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl glass-input text-xs"
              />
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden border border-gray-800/80">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-gray-950/80 uppercase text-[10px] tracking-wider text-gray-400 border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Dept & CGPA</th>
                  <th className="py-3 px-4">Eligibility Status</th>
                  <th className="py-3 px-4">Skills</th>
                  <th className="py-3 px-4 text-right">Recruiter Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filteredApplicants.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No TCET candidates found matching criteria for {activeDrive.companyName}.
                    </td>
                  </tr>
                ) : (
                  filteredApplicants.map(student => {
                    const isEligible = student.cgpa >= activeDrive.minCgpa && student.backlogs <= activeDrive.maxBacklogs;
                    const isAlreadyOffered = student.placedCompany === activeDrive.companyName;

                    return (
                      <tr key={student.id} className="hover:bg-gray-800/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-xl object-cover" />
                            <div>
                              <p className="font-bold text-white">{student.name}</p>
                              <p className="text-[10px] text-gray-500">{student.rollNo} • {student.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <p className="font-semibold text-gray-200">{student.department}</p>
                          <span className={`font-bold ${student.cgpa >= activeDrive.minCgpa ? 'text-emerald-400' : 'text-rose-400'}`}>
                            CGPA: {student.cgpa.toFixed(2)}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            isAlreadyOffered ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                            isEligible ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}>
                            {isAlreadyOffered ? 'Offer Extended ✓' : isEligible ? 'Eligible Candidate' : 'Below Cutoff'}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {(student.skills || []).map(skill => (
                              <span key={skill} className="text-[9px] px-1.5 py-0.5 bg-gray-800 rounded text-gray-300 font-medium">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right">
                          {isAlreadyOffered ? (
                            <span className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1">
                              <CheckCircle className="w-4 h-4" /> Offered
                            </span>
                          ) : (
                            <button
                              onClick={() => recordOffer(student.id, activeDrive.companyName, activeDrive.jobTitle, activeDrive.ctc)}
                              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all"
                            >
                              Extend Offer ({activeDrive.ctc} LPA)
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

