// Mock data for college analytics dashboard

export interface Student {
  id: number;
  department: string;
  year: number;
  attendancePercentage: number;
  internalMarks: number;
  labPerformance: number;
  remarks: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
}

export interface Lab {
  id: string;
  name: string;
  department: string;
  totalSystems: number;
  dailyUsageHours: number;
  status: 'Active' | 'Maintenance' | 'Inactive';
  description: string;
}

export interface Classroom {
  id: string;
  name: string;
  department: string;
  capacity: number;
  occupancy: number;
  status: 'Available' | 'Occupied' | 'Reserved';
}

export interface DepartmentInfo {
  id: string;
  name: string;
  fullName: string;
  studentCount: number;
  facultyCount: number;
  labCount: number;
  avgAttendance: number;
  avgPerformance: number;
  color: string;
}

// Departments
export const departments: DepartmentInfo[] = [
  { id: 'csf', name: 'CSF', fullName: 'Computer Science Fundamentals', studentCount: 42, facultyCount: 8, labCount: 3, avgAttendance: 87, avgPerformance: 82, color: 'dept-ai' },
  { id: 'cse-core', name: 'CSE Core', fullName: 'Computer Science & Engineering Core', studentCount: 55, facultyCount: 12, labCount: 4, avgAttendance: 84, avgPerformance: 79, color: 'dept-cse' },
  { id: 'cse-aids', name: 'CSE AIDS', fullName: 'CSE - AI & Data Science', studentCount: 38, facultyCount: 9, labCount: 3, avgAttendance: 82, avgPerformance: 76, color: 'dept-ece' },
  { id: 'cse-csbs', name: 'CSE CSBS', fullName: 'CSE - Cyber Security & Business Systems', studentCount: 35, facultyCount: 7, labCount: 2, avgAttendance: 80, avgPerformance: 74, color: 'dept-mech' },
];

// Generate students
const remarksOptions = [
  { text: 'Excellent understanding and participation', sentiment: 'Positive' as const },
  { text: 'Shows great improvement in practical work', sentiment: 'Positive' as const },
  { text: 'Very active in class discussions', sentiment: 'Positive' as const },
  { text: 'Good practical skills demonstrated', sentiment: 'Positive' as const },
  { text: 'Needs improvement in theoretical concepts', sentiment: 'Negative' as const },
  { text: 'Poor attendance affecting performance', sentiment: 'Negative' as const },
  { text: 'Struggles with lab assignments', sentiment: 'Negative' as const },
  { text: 'Average performance overall', sentiment: 'Neutral' as const },
  { text: 'Consistent work ethic observed', sentiment: 'Neutral' as const },
  { text: 'Regular attendance maintained', sentiment: 'Neutral' as const },
];

export const students: Student[] = Array.from({ length: 200 }, (_, i) => {
  const deptIndex = Math.floor(Math.random() * departments.length);
  const remarkOption = remarksOptions[Math.floor(Math.random() * remarksOptions.length)];
  return {
    id: i + 1,
    department: departments[deptIndex].name,
    year: Math.floor(Math.random() * 4) + 1,
    attendancePercentage: Math.floor(Math.random() * 40) + 60,
    internalMarks: Math.floor(Math.random() * 60) + 40,
    labPerformance: Math.floor(Math.random() * 50) + 50,
    remarks: remarkOption.text,
    sentiment: remarkOption.sentiment,
  };
});

// Labs
export const labs: Lab[] = [
  { id: 'csf-lab-1', name: 'CSF Research Lab', department: 'CSF', totalSystems: 60, dailyUsageHours: 7, status: 'Active', description: 'Advanced AI and ML research facility with GPU workstations' },
  { id: 'csf-lab-2', name: 'Data Science Lab', department: 'CSF', totalSystems: 50, dailyUsageHours: 6, status: 'Active', description: 'Big data analytics and visualization center' },
  { id: 'csf-lab-3', name: 'Deep Learning Lab', department: 'CSE Core', totalSystems: 40, dailyUsageHours: 5, status: 'Active', description: 'Neural network training and deployment facility' },
  { id: 'cse-core-lab-1', name: 'FSDL Lab', department: 'CSE Core', totalSystems: 55, dailyUsageHours: 8, status: 'Active', description: 'Full stack development Learning' },
  { id: 'cse-core-lab-2', name: 'ML Lab', department: 'CSE Core', totalSystems: 55, dailyUsageHours: 8, status: 'Active', description: 'Machine Learning learning lab' },
  { id: 'cse-core-lab-3', name: 'PBL-4 Lab', department: 'CSE Core', totalSystems: 45, dailyUsageHours: 5, status: 'Active', description: 'Project based learning lab' },
   { id: 'cse-core-lab-3', name: 'ARVR Lab', department: 'CSE Core', totalSystems: 45, dailyUsageHours: 5, status: 'Active', description: 'Augmented Reality and Virtual Reality lab' },
  { id: 'cse-core-lab-4', name: 'MPJ Lab', department: 'CSE Core', totalSystems: 40, dailyUsageHours: 4, status: 'Maintenance', description: 'Mini Project Using Java' },
  { id: 'cse-aids-lab-1', name: 'AI & DS Lab', department: 'CSE AIDS', totalSystems: 40, dailyUsageHours: 6, status: 'Active', description: 'Artificial Intelligence and Data Science lab' },
  { id: 'cse-aids-lab-2', name: 'ML Research Lab', department: 'CSE AIDS', totalSystems: 35, dailyUsageHours: 4, status: 'Active', description: 'Machine Learning research facility' },
  { id: 'cse-csbs-lab-1', name: 'Cyber Security Lab', department: 'CSE CSBS', totalSystems: 45, dailyUsageHours: 6, status: 'Active', description: 'Cyber security and ethical hacking lab' },
  { id: 'cse-csbs-lab-2', name: 'Business Systems Lab', department: 'CSE CSBS', totalSystems: 30, dailyUsageHours: 3, status: 'Maintenance', description: 'Business analytics and systems lab' },
];

// Classrooms
export const classrooms: Classroom[] = [
  
  { id: 'Vyas-201', name: 'Panel-A(DL-1)', department: 'CSE Core', capacity: 59, occupancy: 42, status: 'Occupied' },
  { id: 'Vyas-202', name: 'Panel-B(DL-2)', department: 'CSE Core', capacity: 59, occupancy: 45, status: 'Occupied' },
  { id: 'Vyas-203', name: 'Panel-C(DL-3)', department: 'CSE Core', capacity: 59, occupancy: 12, status: 'Occupied' },
  { id: 'Vyas-204', name: 'Panel-D(DL-4)', department: 'CSE Core', capacity: 59, occupancy: 45, status: 'Available' },
  { id: 'Vyas-213', name: 'Panel-E(DL-5)', department: 'CSE Core', capacity: 59, occupancy: 38, status: 'Occupied' },
  { id: 'Vyas-214', name: 'Panel-F(DL-6)', department: 'CSE Core', capacity: 61, occupancy: 51, status: 'Occupied' },
  { id: 'Vyas-201,204', name: 'Panel-G(CLCC-1)', department: 'CSE Core', capacity: 59, occupancy: 46, status: 'Occupied' },
  { id: 'Vyas-202', name: 'Panel-H(CLCC-2)', department: 'CSE Core', capacity: 59, occupancy: 32, status: 'Occupied' },
  { id: 'Vyas-214', name: 'Panel-I(ARVR)', department: 'CSE Core', capacity: 39, occupancy: 0, status: 'Available' },
  { id: 'Vyas-301', name: 'Lecture Hall 301', department: 'CSE AIDS', capacity: 100, occupancy: 0, status: 'Reserved' },
  { id: 'Vyas-302', name: 'Lab Annex 302', department: 'CSE AIDS', capacity: 35, occupancy: 28, status: 'Occupied' },
  { id: 'Vyas-901', name: 'Lecture Hall 101', department: 'CSF', capacity: 120, occupancy: 95, status: 'Occupied' },
  { id: 'Vyas-802', name: 'Seminar Room 102', department: 'CSF', capacity: 40, occupancy: 32, status: 'Occupied' },
  { id: 'Vyas-401', name: 'Workshop Hall 401', department: 'CSE CSBS', capacity: 80, occupancy: 60, status: 'Occupied' },
];

// Weekly attendance data for charts
export const weeklyAttendanceData = [
  { day: 'Mon', CSF: 92, 'CSE Core': 88, 'CSE AIDS': 85, 'CSE CSBS': 82 },
  { day: 'Tue', CSF: 88, 'CSE Core': 90, 'CSE AIDS': 84, 'CSE CSBS': 78 },
  { day: 'Wed', CSF: 85, 'CSE Core': 86, 'CSE AIDS': 88, 'CSE CSBS': 84 },
  { day: 'Thu', CSF: 90, 'CSE Core': 82, 'CSE AIDS': 80, 'CSE CSBS': 86 },
  { day: 'Fri', CSF: 78, 'CSE Core': 75, 'CSE AIDS': 72, 'CSE CSBS': 70 },
];

// Lab usage timeline
export const labUsageTimeline = [
  { time: '8 AM', usage: 20 },
  { time: '9 AM', usage: 45 },
  { time: '10 AM', usage: 78 },
  { time: '11 AM', usage: 92 },
  { time: '12 PM', usage: 65 },
  { time: '1 PM', usage: 35 },
  { time: '2 PM', usage: 80 },
  { time: '3 PM', usage: 95 },
  { time: '4 PM', usage: 72 },
  { time: '5 PM', usage: 45 },
];

// Monthly performance trend
export const monthlyPerformance = [
  { month: 'Jan', performance: 72 },
  { month: 'Feb', performance: 75 },
  { month: 'Mar', performance: 78 },
  { month: 'Apr', performance: 74 },
  { month: 'May', performance: 80 },
  { month: 'Jun', performance: 82 },
];

// Department distribution for pie chart
export const departmentDistribution = departments.map(dept => ({
  name: dept.name,
  value: dept.studentCount,
  color: dept.color,
}));

// Sentiment distribution
export const getSentimentDistribution = (dept?: string) => {
  const filtered = dept ? students.filter(s => s.department === dept) : students;
  const positive = filtered.filter(s => s.sentiment === 'Positive').length;
  const negative = filtered.filter(s => s.sentiment === 'Negative').length;
  const neutral = filtered.filter(s => s.sentiment === 'Neutral').length;
  return [
    { name: 'Positive', value: positive, color: 'hsl(142, 55%, 55%)' },
    { name: 'Negative', value: negative, color: 'hsl(0, 65%, 60%)' },
    { name: 'Neutral', value: neutral, color: 'hsl(45, 70%, 55%)' },
  ];
};

// Attendance distribution for histogram
export const getAttendanceDistribution = () => {
  const ranges = ['60-70%', '70-80%', '80-90%', '90-100%'];
  return ranges.map(range => {
    const [min, max] = range.replace('%', '').split('-').map(Number);
    const count = students.filter(s => s.attendancePercentage >= min && s.attendancePercentage < (max === 100 ? 101 : max)).length;
    return { range, count };
  });
};

// Teacher remarks
export const teacherRemarks = [
{ id: 1, teacher: 'Dr. Prashant Lahane', remark: 'Students excelling in practical lab sessions', timestamp: '2 days ago', department: 'CSE Core' },
{ id: 2, teacher: 'Dr. Anjali Mehta', remark: 'Need to improve attendance in theoretical classes', timestamp: '5 days ago', department: 'CSF' },
{ id: 3, teacher: 'Dr. Ramesh Kumar', remark: 'Great improvement in project work this semester', timestamp: '1 week ago', department: 'CSE AIDS' },
{ id: 4, teacher: 'DR. Sneha Patel', remark: 'Some students struggling with lab assignments', timestamp: '3 days ago', department: 'CSE CSBS' },
];
