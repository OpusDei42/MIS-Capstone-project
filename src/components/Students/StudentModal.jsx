import React, { useState, useEffect } from 'react';
import { X, UserPlus, Save, Check } from 'lucide-react';

export const StudentModal = ({ isOpen, onClose, onSave, studentToEdit = null }) => {
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    department: 'Computer Science',
    cgpa: 8.0,
    backlogs: 0,
    email: '',
    phone: '',
    status: 'Unplaced',
    placedCompany: '',
    placedRole: '',
    ctc: 0,
    skills: ''
  });

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        ...studentToEdit,
        skills: (studentToEdit.skills || []).join(', ')
      });
    } else {
      setFormData({
        rollNo: `2022CSE${Math.floor(100 + Math.random() * 800)}`,
        name: '',
        department: 'Computer Science',
        cgpa: 8.0,
        backlogs: 0,
        email: '',
        phone: '+91 ',
        status: 'Unplaced',
        placedCompany: '',
        placedRole: '',
        ctc: 0,
        skills: 'React, Node.js, C++'
      });
    }
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
    onSave({
      ...formData,
      skills: skillsArray,
      cgpa: parseFloat(formData.cgpa),
      backlogs: parseInt(formData.backlogs, 10),
      ctc: parseFloat(formData.ctc || 0)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-gray-900 border border-gray-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              {studentToEdit ? 'Edit Student Record' : 'Register New Student'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Roll Number</label>
              <input
                type="text"
                required
                value={formData.rollNo}
                onChange={e => setFormData({ ...formData, rollNo: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                placeholder="2022CSE001"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                placeholder="Student Name"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-gray-900"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Information Tech">Information Tech</option>
                <option value="Electronics & Comm">Electronics & Comm</option>
                <option value="Electrical">Electrical</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">CGPA (0 - 10)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="10"
                required
                value={formData.cgpa}
                onChange={e => setFormData({ ...formData, cgpa: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Active Backlogs</label>
              <input
                type="number"
                min="0"
                value={formData.backlogs}
                onChange={e => setFormData({ ...formData, backlogs: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Placement Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-gray-900"
              >
                <option value="Unplaced">Unplaced</option>
                <option value="In Progress">In Progress</option>
                <option value="Placed">Placed</option>
                <option value="Opted Out">Opted Out</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                placeholder="student@college.edu"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          {formData.status === 'Placed' && (
            <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Placement Offer Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.placedCompany}
                    onChange={e => setFormData({ ...formData, placedCompany: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs"
                    placeholder="e.g. Google"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">Role</label>
                  <input
                    type="text"
                    value={formData.placedRole}
                    onChange={e => setFormData({ ...formData, placedRole: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs"
                    placeholder="e.g. SDE-1"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">CTC (LPA)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.ctc}
                    onChange={e => setFormData({ ...formData, ctc: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg glass-input text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">Key Technical Skills (comma separated)</label>
            <input
              type="text"
              value={formData.skills}
              onChange={e => setFormData({ ...formData, skills: e.target.value })}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              placeholder="React, C++, Python, AWS"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30"
            >
              <Save className="w-4 h-4" />
              {studentToEdit ? 'Save Changes' : 'Create Student'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
