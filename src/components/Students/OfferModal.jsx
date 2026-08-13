import React, { useState } from 'react';
import { X, Award, CheckCircle } from 'lucide-react';

export const OfferModal = ({ isOpen, onClose, student, onRecordOffer }) => {
  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('Software Development Engineer');
  const [ctc, setCtc] = useState('12.0');

  if (!isOpen || !student) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRecordOffer(student.id, companyName, role, parseFloat(ctc));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
      <div className="bg-gray-900 border border-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Record Official Placement Offer</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
              {student.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-white">{student.name}</p>
              <p className="text-[11px] text-gray-400">{student.rollNo} • {student.department}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Company Name</label>
            <input
              type="text"
              required
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="e.g. Amazon, Google, Deloitte"
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Designation / Role</label>
            <input
              type="text"
              required
              value={role}
              onChange={e => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Offered Package (CTC in LPA)</label>
            <input
              type="number"
              step="0.1"
              required
              value={ctc}
              onChange={e => setCtc(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30"
            >
              <CheckCircle className="w-4 h-4" />
              Confirm Placement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
