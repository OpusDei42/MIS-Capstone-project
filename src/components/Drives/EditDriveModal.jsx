import React, { useState, useEffect } from 'react';
import { X, Building2, Save } from 'lucide-react';

export const EditDriveModal = ({ isOpen, onClose, drive, onUpdateDrive }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    jobTitle: '',
    ctc: 0,
    stipend: 0,
    minCgpa: 0,
    maxBacklogs: 0,
    allowedBranches: [],
    driveDate: '',
    deadline: '',
    location: '',
    status: 'Scheduled',
    description: ''
  });

  useEffect(() => {
    if (drive) {
      setFormData({
        companyName: drive.companyName || '',
        industry: drive.industry || 'Internet & Technology',
        jobTitle: drive.jobTitle || '',
        ctc: drive.ctc || 0,
        stipend: drive.stipend || 0,
        minCgpa: drive.minCgpa || 0,
        maxBacklogs: drive.maxBacklogs || 0,
        allowedBranches: drive.allowedBranches || ['Computer Engineering', 'Information Technology'],
        driveDate: drive.driveDate || '',
        deadline: drive.deadline || '',
        location: drive.location || 'TCET Campus',
        status: drive.status || 'Scheduled',
        description: drive.description || ''
      });
    }
  }, [drive]);

  if (!isOpen || !drive) return null;

  const handleBranchToggle = (branch) => {
    setFormData(prev => {
      const allowed = prev.allowedBranches.includes(branch)
        ? prev.allowedBranches.filter(b => b !== branch)
        : [...prev.allowedBranches, branch];
      return { ...prev, allowedBranches: allowed };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateDrive({
      ...drive,
      ...formData,
      ctc: parseFloat(formData.ctc),
      stipend: parseInt(formData.stipend, 10),
      minCgpa: parseFloat(formData.minCgpa),
      maxBacklogs: parseInt(formData.maxBacklogs, 10)
    });
    onClose();
  };

  const allBranches = ['Computer Engineering', 'Information Technology', 'AI & ML', 'Data Science', 'Electronics & Telecomm'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
      <div className="bg-gray-900 border border-amber-500/30 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 via-blue-950/40 to-gray-900">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Edit Drive: <span className="text-amber-400">{drive.companyName}</span></h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Company Name</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Industry Vertical</label>
              <input
                type="text"
                required
                value={formData.industry}
                onChange={e => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Job Designation</label>
              <input
                type="text"
                required
                value={formData.jobTitle}
                onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Drive Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-gray-900 text-amber-300 font-bold"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Ongoing">Ongoing (Live Screening)</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Offered CTC (LPA)</label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.ctc}
                onChange={e => setFormData({ ...formData, ctc: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs font-bold text-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Monthly Stipend (₹)</label>
              <input
                type="number"
                value={formData.stipend}
                onChange={e => setFormData({ ...formData, stipend: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Min Eligibility CGPA</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                required
                value={formData.minCgpa}
                onChange={e => setFormData({ ...formData, minCgpa: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Max Allowed Backlogs</label>
              <input
                type="number"
                min="0"
                value={formData.maxBacklogs}
                onChange={e => setFormData({ ...formData, maxBacklogs: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Application Deadline</label>
              <input
                type="date"
                required
                value={formData.deadline}
                onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Drive Event Date</label>
              <input
                type="date"
                required
                value={formData.driveDate}
                onChange={e => setFormData({ ...formData, driveDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Location / Venue</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>

          {/* Allowed Branches Toggle */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">Eligible Engineering Branches</label>
            <div className="flex flex-wrap gap-2">
              {allBranches.map(branch => {
                const isSelected = formData.allowedBranches.includes(branch);
                return (
                  <button
                    type="button"
                    key={branch}
                    onClick={() => handleBranchToggle(branch)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                        : 'bg-gray-800/40 text-gray-400 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    {branch}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Role Description & Requirements</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-2 pt-3 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-gray-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-500/25 transition-all"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
