import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  INITIAL_STUDENTS, 
  INITIAL_DRIVES, 
  INITIAL_ANNOUNCEMENTS,
  DEPARTMENT_STATS_MOCK,
  PACKAGE_DISTRIBUTION_MOCK,
  PLACEMENT_TREND_MOCK
} from '../mock/initialData';

const PlacementContext = createContext();

const STORAGE_KEY = 'PLACEMENT_MIS_STATE_V1';

export const PlacementProvider = ({ children }) => {
  // Load initial state from local storage or defaults
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_STUDENTS');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [drives, setDrives] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_DRIVES');
    return saved ? JSON.parse(saved) : INITIAL_DRIVES;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_ANNOUNCEMENTS');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  // Current User Role: 'admin' (TPO Officer), 'student', 'recruiter'
  const [activeRole, setActiveRole] = useState('admin');
  
  // Navigation active tab
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Student view selected ID
  const [selectedStudentId, setSelectedStudentId] = useState('STU001');

  // Recruiter view selected drive ID
  const [selectedRecruiterDriveId, setSelectedRecruiterDriveId] = useState('DRV001');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_STUDENTS', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_DRIVES', JSON.stringify(drives));
  }, [drives]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_ANNOUNCEMENTS', JSON.stringify(announcements));
  }, [announcements]);

  // Derived KPI metrics computed dynamically from state
  const metrics = useMemo(() => {
    const totalStudents = students.length;
    const placedStudents = students.filter(s => s.status === 'Placed');
    const placedCount = placedStudents.length;
    const placementRate = totalStudents > 0 ? ((placedCount / totalStudents) * 100).toFixed(1) : 0;
    
    const maxCtc = placedStudents.reduce((max, s) => (s.ctc > max ? s.ctc : max), 0);
    const totalCtc = placedStudents.reduce((sum, s) => sum + (s.ctc || 0), 0);
    const avgCtc = placedCount > 0 ? (totalCtc / placedCount).toFixed(2) : 0;
    
    const activeDrivesCount = drives.filter(d => d.status === 'Ongoing' || d.status === 'Scheduled').length;

    return {
      totalStudents,
      placedCount,
      unplacedCount: totalStudents - placedCount,
      placementRate,
      maxCtc: maxCtc.toFixed(1),
      avgCtc,
      totalDrives: drives.length,
      activeDrivesCount
    };
  }, [students, drives]);

  // Actions
  const addStudent = (newStudent) => {
    const id = `STU${String(students.length + 1).padStart(3, '0')}`;
    const studentWithId = {
      ...newStudent,
      id,
      status: newStudent.status || 'Unplaced',
      appliedDriveIds: [],
      ctc: parseFloat(newStudent.ctc || 0),
      cgpa: parseFloat(newStudent.cgpa || 0),
      backlogs: parseInt(newStudent.backlogs || 0, 10),
      avatar: newStudent.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`
    };
    setStudents(prev => [studentWithId, ...prev]);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const addDrive = (newDrive) => {
    const id = `DRV${String(drives.length + 1).padStart(3, '0')}`;
    const driveWithId = {
      ...newDrive,
      id,
      status: newDrive.status || 'Scheduled',
      applicantsCount: 0,
      selectedCount: 0,
      ctc: parseFloat(newDrive.ctc || 0),
      minCgpa: parseFloat(newDrive.minCgpa || 0),
      logoBg: newDrive.logoBg || 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30'
    };
    setDrives(prev => [driveWithId, ...prev]);
  };

  const updateDrive = (updatedDrive) => {
    setDrives(prev => prev.map(d => d.id === updatedDrive.id ? { ...d, ...updatedDrive } : d));
  };

  const deleteDrive = (id) => {
    setDrives(prev => {
      const remaining = prev.filter(d => d.id !== id);
      if (selectedRecruiterDriveId === id) {
        setSelectedRecruiterDriveId(remaining.length > 0 ? remaining[0].id : '');
      }
      return remaining;
    });
  };

  const applyStudentToDrive = (studentId, driveId) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const applied = s.appliedDriveIds || [];
        if (!applied.includes(driveId)) {
          return { ...s, appliedDriveIds: [...applied, driveId] };
        }
      }
      return s;
    }));

    setDrives(prev => prev.map(d => {
      if (d.id === driveId) {
        return { ...d, applicantsCount: (d.applicantsCount || 0) + 1 };
      }
      return d;
    }));
  };

  const recordOffer = (studentId, companyName, role, ctc) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          status: 'Placed',
          placedCompany: companyName,
          placedRole: role,
          ctc: parseFloat(ctc)
        };
      }
      return s;
    }));
  };

  const addAnnouncement = (newAnn) => {
    const id = `ANC${String(announcements.length + 1).padStart(3, '0')}`;
    const annWithId = {
      ...newAnn,
      id,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [annWithId, ...prev]);
  };

  const resetToMockData = () => {
    setStudents(INITIAL_STUDENTS);
    setDrives(INITIAL_DRIVES);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    localStorage.removeItem(STORAGE_KEY + '_STUDENTS');
    localStorage.removeItem(STORAGE_KEY + '_DRIVES');
    localStorage.removeItem(STORAGE_KEY + '_ANNOUNCEMENTS');
  };

  return (
    <PlacementContext.Provider
      value={{
        students,
        drives,
        announcements,
        metrics,
        activeRole,
        setActiveRole,
        activeTab,
        setActiveTab,
        selectedStudentId,
        setSelectedStudentId,
        selectedRecruiterDriveId,
        setSelectedRecruiterDriveId,
        addStudent,
        updateStudent,
        deleteStudent,
        addDrive,
        updateDrive,
        deleteDrive,
        applyStudentToDrive,
        recordOffer,
        addAnnouncement,
        resetToMockData,
        DEPARTMENT_STATS_MOCK,
        PACKAGE_DISTRIBUTION_MOCK,
        PLACEMENT_TREND_MOCK
      }}
    >
      {children}
    </PlacementContext.Provider>
  );
};

export const usePlacement = () => {
  const context = useContext(PlacementContext);
  if (!context) {
    throw new Error('usePlacement must be used within a PlacementProvider');
  }
  return context;
};
