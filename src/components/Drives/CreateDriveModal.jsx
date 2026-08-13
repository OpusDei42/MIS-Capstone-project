import React, { useState } from 'react';
import { X, Building2, Plus, Save } from 'lucide-react';

export const CreateDriveModal = ({ isOpen, onClose, onAddDrive }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'Internet & Technology',
    jobTitle: 'Software Engineer',
    ctc: 12.0,
    stipend: 30000,
    minCgpa: 7.5,
    maxBacklogs: 0,
    allowedBranches: ['Computer Science', 'Information Tech'],
    driveDate: '2026-09-15',
    deadline: '2026-09-05',
    location: 'On-Campus (Auditorium)',
    status: 'Scheduled',
    description: 'Looking for enthusiastic software engineers.',
    rounds: ['Online Assessment', 'Technical Interview 1', 'HR Round']
  });

  if (!isOpen) return null;

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
    onAddDrive({
      ...formData,
      ctc: parseFloat(formData.ctc),
      stipend: parseInt(formData.stipend, 10),
      minCgpa: parseFloat(formData.minCgpa),
      maxBacklogs: parseInt(formData.maxBacklogs, 10)
    });
    onClose();
  };

  const allBranches = ['Computer Science', 'Information Tech', 'Electronics & Comm', 'Electrical', 'Mechanical', 'Civil'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
      <div className="bg-gray-900 border border-gray-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Schedule New Company Placement Drive</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Company Name</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Google, Microsoft, Qualcomm"
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
                placeholder="e.g. Cloud & Tech, Finance"
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
                placeholder="e.g. Software Engineer"
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Offered CTC (LPA)</label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.ctc}
                onChange={e => setFormData({ ...formData, ctc: e.target.value })}
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
                        ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500'
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
            <label className="block text-xs font-semibold text-gray-300 mb-1">Role Description & Expectations</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              placeholder="Key responsibilities and qualifications..."
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 shadow-lg shadow-cyan-600/30"
            >
              <Save className="w-4 h-4" />
              Publish Drive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
