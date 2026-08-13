export const exportStudentsToCSV = (students) => {
  if (!students || students.length === 0) {
    alert('No student records available to export.');
    return;
  }

  const headers = ['Roll No', 'Name', 'Department', 'CGPA', 'Backlogs', 'Status', 'Placed Company', 'Role', 'CTC (LPA)', 'Email', 'Phone', 'Skills'];
  
  const rows = students.map(s => [
    `"${s.rollNo || ''}"`,
    `"${s.name || ''}"`,
    `"${s.department || ''}"`,
    s.cgpa || 0,
    s.backlogs || 0,
    `"${s.status || 'Unplaced'}"`,
    `"${s.placedCompany || 'N/A'}"`,
    `"${s.placedRole || 'N/A'}"`,
    s.ctc || 0,
    `"${s.email || ''}"`,
    `"${s.phone || ''}"`,
    `"${(s.skills || []).join('; ')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Placement_Cell_Report_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
