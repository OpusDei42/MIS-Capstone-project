import React, { useState, useMemo } from 'react';
import { usePlacement } from '../../context/PlacementContext';
import { StudentModal } from './StudentModal';
import { OfferModal } from './OfferModal';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Award, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ExternalLink,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';

export const StudentDirectory = () => {
  const { students, addStudent, updateStudent, deleteStudent, recordOffer, setSelectedStudentId, setActiveRole, setActiveTab } = usePlacement();

  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [minCgpa, setMinCgpa] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [offerStudent, setOfferStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchSearch = 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
        (s.skills || []).some(sk => sk.toLowerCase().includes(search.toLowerCase()));

      const matchDept = deptFilter === 'All' || s.department === deptFilter;
      const matchStatus = statusFilter === 'All' || s.status === statusFilter;
      const matchCgpa = s.cgpa >= minCgpa;

      return matchSearch && matchDept && matchStatus && matchCgpa;
    });
  }, [students, search, deptFilter, statusFilter, minCgpa]);

  const handleEdit = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleOpenOffer = (student) => {
    setOfferStudent(student);
    setIsOfferModalOpen(true);
  };

  const handleViewAsStudent = (studentId) => {
    setSelectedStudentId(studentId);
    setActiveRole('student');
    setActiveTab('student-portal');
  };

  return (
    <div className="space-y-4">
      
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-4 rounded-2xl">
        <div>
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            Student Placement Directory
          </h2>
          <p className="text-xs text-gray-400">Total {filteredStudents.length} candidates match criteria</p>
        </div>

        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Student Record
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 glass-card p-4 rounded-2xl">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Name, Roll No, Skill..."
            className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>

        {/* Dept Filter */}
        <div>
          <select
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-gray-900"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Tech">Information Tech</option>
            <option value="Electronics & Comm">Electronics & Comm</option>
            <option value="Electrical">Electrical</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-gray-900"
          >
            <option value="All">All Placement Statuses</option>
            <option value="Placed">Placed</option>
            <option value="In Progress">In Progress</option>
            <option value="Unplaced">Unplaced</option>
            <option value="Opted Out">Opted Out</option>
          </select>
        </div>

        {/* CGPA Slider Filter */}
        <div className="flex items-center gap-3 px-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
          <div className="w-full">
            <div className="flex justify-between text-[11px] text-gray-400 mb-1">
              <span>Min CGPA:</span>
              <span className="font-bold text-indigo-400">{minCgpa.toFixed(1)}+</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={minCgpa}
              onChange={e => setMinCgpa(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 h-1 bg-gray-700 rounded-lg cursor-pointer"
            />
          </div>
        </div>

      </div>

      {/* Directory Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-gray-800/80">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-gray-950/80 uppercase text-[10px] tracking-wider text-gray-400 border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Roll & Dept</th>
                <th className="py-3 px-4">CGPA / Backlogs</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Placed Company / Role</th>
                <th className="py-3 px-4">CTC (LPA)</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No student records found matching the specified filters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-800/40 transition-colors">
                    
                    {/* Student Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={student.avatar} 
                          alt={student.name} 
                          className="w-8 h-8 rounded-xl object-cover border border-gray-700"
                        />
                        <div>
                          <p className="font-bold text-white hover:text-indigo-400 cursor-pointer" onClick={() => handleViewAsStudent(student.id)}>
                            {student.name}
                          </p>
                          <p className="text-[10px] text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Roll & Dept */}
                    <td className="py-3 px-4">
                      <p className="font-semibold text-gray-200">{student.rollNo}</p>
                      <p className="text-[10px] text-gray-400">{student.department}</p>
                    </td>

                    {/* CGPA */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-black px-2 py-0.5 rounded-lg ${
                          student.cgpa >= 8.5 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          student.cgpa >= 7.5 ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {student.cgpa.toFixed(2)}
                        </span>
                        {student.backlogs > 0 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            {student.backlogs} Backlog
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        student.status === 'Placed' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                        student.status === 'In Progress' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                        student.status === 'Opted Out' ? 'bg-gray-700/50 text-gray-400' :
                        'bg-gray-800 text-gray-400 border border-gray-700'
                      }`}>
                        {student.status === 'Placed' && <CheckCircle2 className="w-3 h-3" />}
                        {student.status === 'In Progress' && <Clock className="w-3 h-3 animate-spin" />}
                        {student.status}
                      </span>
                    </td>

                    {/* Company & Role */}
                    <td className="py-3 px-4">
                      {student.placedCompany ? (
                        <div>
                          <p className="font-bold text-white">{student.placedCompany}</p>
                          <p className="text-[10px] text-gray-400">{student.placedRole}</p>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-[11px]">—</span>
                      )}
                    </td>

                    {/* CTC */}
                    <td className="py-3 px-4">
                      {student.ctc > 0 ? (
                        <span className="font-black text-amber-400 text-xs">{student.ctc} LPA</span>
                      ) : (
                        <span className="text-gray-500 text-[11px]">—</span>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        
                        {/* Record Offer button if unplaced */}
                        {student.status !== 'Placed' && (
                          <button
                            onClick={() => handleOpenOffer(student)}
                            title="Record Offer Letter"
                            className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/20 transition-all"
                          >
                            <Award className="w-4 h-4" />
                          </button>
                        )}

                        {/* View in Student Portal */}
                        <button
                          onClick={() => handleViewAsStudent(student.id)}
                          title="View Profile Portal"
                          className="p-1.5 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => handleEdit(student)}
                          title="Edit Record"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete record for ${student.name}?`)) {
                              deleteStudent(student.id);
                            }
                          }}
                          title="Delete Record"
                          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          if (editingStudent) {
            updateStudent(data);
          } else {
            addStudent(data);
          }
        }}
        studentToEdit={editingStudent}
      />

      <OfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        student={offerStudent}
        onRecordOffer={recordOffer}
      />

    </div>
  );
};
