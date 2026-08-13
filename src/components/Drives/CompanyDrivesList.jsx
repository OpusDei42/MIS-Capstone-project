import React, { useState, useMemo } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { CreateDriveModal } from './CreateDriveModal';
import { EditDriveModal } from './EditDriveModal';
import { DriveDetailModal } from './DriveDetailModal';
import { 
  Building2, 
  Plus, 
  Search, 
  Calendar, 
  Users, 
  Award, 
  ChevronRight,
  Edit2,
  Trash2
} from 'lucide-react';

export const CompanyDrivesList = () => {
  const { 
    drives, 
    addDrive, 
    updateDrive, 
    deleteDrive, 
    setSelectedRecruiterDriveId, 
    setActiveRole, 
    setActiveTab 
  } = usePlacement();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [driveToEdit, setDriveToEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const filteredDrives = useMemo(() => {
    return drives.filter(d => {
      const matchSearch = 
        d.companyName.toLowerCase().includes(search.toLowerCase()) ||
        d.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
        d.industry.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === 'All' || d.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [drives, search, statusFilter]);

  const handleOpenDetail = (drive) => {
    setSelectedDrive(drive);
    setIsDetailModalOpen(true);
  };

  const handleOpenEdit = (drive, e) => {
    e.stopPropagation();
    setDriveToEdit(drive);
    setIsEditModalOpen(true);
  };

  const handleDeleteDrive = (driveId, companyName, e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete the placement drive for "${companyName}"? This action cannot be undone.`)) {
      deleteDrive(driveId);
    }
  };

  const handleSwitchToRecruiter = (driveId) => {
    setSelectedRecruiterDriveId(driveId);
    setActiveRole('recruiter');
    setActiveTab('recruiter-portal');
  };

  return (
    <div className="space-y-4">
      
      {/* Header & New Drive Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-gray-950 via-blue-950/40 to-gray-950">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              TCET T&P Portal
            </span>
            <span className="text-xs text-gray-400 font-medium">Batch 2026</span>
          </div>
          <h2 className="text-lg font-black text-white mt-1 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            TCET Placement Drives & Campus Recruitment Visits
          </h2>
          <p className="text-xs text-gray-400">{filteredDrives.length} campus recruitment visits scheduled</p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Schedule New Drive
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 glass-card p-4 rounded-2xl">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Company, Industry, Role..."
            className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-gray-900"
          >
            <option value="All">All Drive Statuses</option>
            <option value="Ongoing">Ongoing Drives</option>
            <option value="Scheduled">Scheduled Drives</option>
            <option value="Completed">Completed Drives</option>
          </select>
        </div>
      </div>

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredDrives.map(drive => (
          <div 
            key={drive.id} 
            className="glass-card p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all group"
          >
            
            <div>
              {/* Card Top Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-lg border shadow-md ${drive.logoBg || 'bg-amber-500/20 text-amber-300 border-amber-500/30'}`}>
                    {drive.companyName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">
                      {drive.companyName}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-medium">{drive.industry}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    drive.status === 'Ongoing' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 animate-pulse' :
                    drive.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    'bg-gray-800 text-gray-400'
                  }`}>
                    {drive.status}
                  </span>

                  {/* Edit & Delete Action Buttons */}
                  <button
                    onClick={(e) => handleOpenEdit(drive, e)}
                    title="Edit Drive Details"
                    className="p-1 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => handleDeleteDrive(drive.id, drive.companyName, e)}
                    title="Delete Drive"
                    className="p-1 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Job Title & CTC Highlight */}
              <div className="p-3 rounded-xl bg-gray-950/70 border border-gray-800/80 mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-semibold">Role Offered</p>
                  <p className="text-xs font-bold text-gray-200">{drive.jobTitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase font-semibold">Package</p>
                  <p className="text-sm font-black text-amber-400">{drive.ctc} LPA</p>
                </div>
              </div>

              {/* Eligibility Criteria Tags */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Award className="w-3.5 h-3.5 text-blue-400" />
                  <span>Min CGPA: <strong className="text-white">{drive.minCgpa}+</strong> | Max Backlogs: <strong className="text-white">{drive.maxBacklogs}</strong></span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Drive Date: <strong className="text-white">{drive.driveDate}</strong></span>
                </div>
              </div>

              {/* Allowed Branches Pill Tags */}
              <div className="flex flex-wrap gap-1">
                {(drive.allowedBranches || []).map(b => (
                  <span key={b} className="text-[9px] px-2 py-0.5 rounded-md bg-gray-800 text-gray-300 font-medium">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                {drive.applicantsCount || 0} Applied
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSwitchToRecruiter(drive.id)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-gray-800 hover:bg-gray-700 text-gray-300 transition-all"
                >
                  Recruiter Hub
                </button>
                
                <button
                  onClick={() => handleOpenDetail(drive)}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-semibold bg-amber-500/20 hover:bg-amber-400 text-amber-300 hover:text-gray-950 border border-amber-500/30 transition-all"
                >
                  Details
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Modals */}
      <CreateDriveModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddDrive={addDrive}
      />

      <EditDriveModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        drive={driveToEdit}
        onUpdateDrive={updateDrive}
      />

      <DriveDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        drive={selectedDrive}
      />

    </div>
  );
};

