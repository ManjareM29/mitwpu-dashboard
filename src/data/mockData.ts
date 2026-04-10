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
  { id: 'vy-027', name: 'Gen AI Laboratory', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 7, status: 'Active', description: 'Apple MAC Gen AI Lab' },
  { id: 'vy-028', name: 'OOPL Laboratory', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 6, status: 'Active', description: 'Object Oriented Programming Lab' },
  { id: 'vy-029', name: 'DSF Laboratory', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 6, status: 'Active', description: 'Data Structures Foundation Lab' },
  { id: 'vy-030', name: 'Metaverse Laboratory', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 5, status: 'Active', description: 'Metaverse Lab' },

  { id: 'vy-112', name: 'Microprocessor Lab', department: 'CSE Core', totalSystems: 30, dailyUsageHours: 5, status: 'Active', description: 'Microprocessor Lab' },
  { id: 'vy-113', name: 'Digital Electronics Lab', department: 'CSE Core', totalSystems: 35, dailyUsageHours: 5, status: 'Active', description: 'Digital Electronics Lab' },
  { id: 'vy-123', name: 'Embedded Systems Lab', department: 'CSE Core', totalSystems: 30, dailyUsageHours: 5, status: 'Active', description: 'Embedded Systems Lab' },
  { id: 'vy-126', name: 'SDL Laboratory', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 6, status: 'Active', description: 'Software Development Lab' },
  { id: 'vy-127', name: 'Cloud Computing Lab', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 6, status: 'Active', description: 'Cloud Lab' },
  { id: 'vy-128', name: 'Big Data Lab', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 6, status: 'Active', description: 'Big Data Lab' },
  { id: 'vy-129', name: 'System Software Lab', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 6, status: 'Active', description: 'System Software Lab' },

  { id: 'vy-206', name: 'AI/ML Lab', department: 'CSE AIDS', totalSystems: 32, dailyUsageHours: 6, status: 'Active', description: 'AI ML Lab' },
  { id: 'vy-212', name: 'ARVR Lab', department: 'CSE Core', totalSystems: 32, dailyUsageHours: 5, status: 'Active', description: 'AR VR Lab' },
  { id: 'vy-222', name: 'Robotics Automation Lab', department: 'CSE Core', totalSystems: 30, dailyUsageHours: 5, status: 'Active', description: 'Robotics Lab' },
  { id: 'vy-225', name: 'Web Technology Lab', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 6, status: 'Active', description: 'Web Tech Lab' },
  { id: 'vy-226', name: 'HCI Laboratory', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 6, status: 'Active', description: 'Human Computer Interaction Lab' },
  { id: 'vy-227', name: 'Blockchain Lab', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 6, status: 'Active', description: 'Blockchain Lab' },
  { id: 'vy-228', name: 'Industrial IoT Lab', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 6, status: 'Active', description: 'IoT Lab' },

  { id: 'vy-314', name: 'Database Lab', department: 'CSE Core', totalSystems: 34, dailyUsageHours: 5, status: 'Active', description: 'Database Lab' },
  { id: 'vy-324', name: 'Deep Learning Lab', department: 'CSE Core', totalSystems: 30, dailyUsageHours: 5, status: 'Active', description: 'Deep Learning Lab' },
  { id: 'vy-327', name: 'Wireless Network Lab', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 6, status: 'Active', description: 'Wireless Lab' },
  { id: 'vy-328', name: 'Digital Forensics Lab', department: 'CSE CSBS', totalSystems: 62, dailyUsageHours: 6, status: 'Active', description: 'Forensics Lab' },
  { id: 'vy-329', name: 'Image Processing Lab', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 6, status: 'Active', description: 'Image Processing Lab' },
  { id: 'vy-330', name: 'Operating System Lab', department: 'CSE Core', totalSystems: 62, dailyUsageHours: 6, status: 'Active', description: 'OS Lab' },
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
{ id: 2, teacher: 'Dr. Swati Jadhav', remark: 'Need to improve attendance in theoretical classes', timestamp: '5 days ago', department: 'CSF' },
{ id: 3, teacher: 'Dr. Ramesh Kumar', remark: 'Great improvement in project work this semester', timestamp: '1 week ago', department: 'CSE AIDS' },
{ id: 4, teacher: 'DR. Sneha Patel', remark: 'Some students struggling with lab assignments', timestamp: '3 days ago', department: 'CSE CSBS' },
];
