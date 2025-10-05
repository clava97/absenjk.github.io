/**
 * Mock data for demonstration
 */

export interface Employee {
  id: string;
  nik: string;
  name: string;
  division: string;
  position: string;
  status: 'active' | 'inactive';
  enrolledFaces: number;
  lastCheckIn?: Date;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeNik: string;
  timestamp: Date;
  type: 'in' | 'out';
  deviceId: string;
  confidence: number;
  isLate?: boolean;
  photo?: string;
}

export interface Device {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  lastSeen: Date;
  ipAddress: string;
}

export interface DashboardStats {
  present: number;
  late: number;
  leave: number;
  absent: number;
}

// Mock Employees
export const mockEmployees: Employee[] = [
  {
    id: '1',
    nik: 'EMP001',
    name: 'Budi Santoso',
    division: 'IT',
    position: 'Software Engineer',
    status: 'active',
    enrolledFaces: 8,
    lastCheckIn: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    nik: 'EMP002',
    name: 'Siti Nurhaliza',
    division: 'HR',
    position: 'HR Manager',
    status: 'active',
    enrolledFaces: 10,
    lastCheckIn: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: '3',
    nik: 'EMP003',
    name: 'Ahmad Rifai',
    division: 'Finance',
    position: 'Accountant',
    status: 'active',
    enrolledFaces: 7,
    lastCheckIn: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: '4',
    nik: 'EMP004',
    name: 'Dewi Lestari',
    division: 'Marketing',
    position: 'Marketing Specialist',
    status: 'active',
    enrolledFaces: 9,
  },
  {
    id: '5',
    nik: 'EMP005',
    name: 'Rudi Hartono',
    division: 'IT',
    position: 'DevOps Engineer',
    status: 'inactive',
    enrolledFaces: 5,
  },
];

// Mock Devices
export const mockDevices: Device[] = [
  {
    id: 'dev001',
    name: 'ESP32-CAM Lobby',
    location: 'Lobby Utama',
    status: 'online',
    lastSeen: new Date(),
    ipAddress: '192.168.1.101',
  },
  {
    id: 'dev002',
    name: 'ESP32-CAM Lantai 2',
    location: 'Ruang Meeting Lt.2',
    status: 'online',
    lastSeen: new Date(Date.now() - 5 * 60 * 1000),
    ipAddress: '192.168.1.102',
  },
  {
    id: 'dev003',
    name: 'ESP32-CAM Parkir',
    location: 'Area Parkir',
    status: 'offline',
    lastSeen: new Date(Date.now() - 3 * 60 * 60 * 1000),
    ipAddress: '192.168.1.103',
  },
];

// Mock Attendance Records
export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'att001',
    employeeId: '1',
    employeeName: 'Budi Santoso',
    employeeNik: 'EMP001',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: 'in',
    deviceId: 'dev001',
    confidence: 0.95,
    isLate: false,
  },
  {
    id: 'att002',
    employeeId: '2',
    employeeName: 'Siti Nurhaliza',
    employeeNik: 'EMP002',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    type: 'in',
    deviceId: 'dev001',
    confidence: 0.92,
    isLate: true,
  },
  {
    id: 'att003',
    employeeId: '3',
    employeeName: 'Ahmad Rifai',
    employeeNik: 'EMP003',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    type: 'in',
    deviceId: 'dev002',
    confidence: 0.88,
    isLate: false,
  },
  {
    id: 'att004',
    employeeId: '1',
    employeeName: 'Budi Santoso',
    employeeNik: 'EMP001',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    type: 'out',
    deviceId: 'dev001',
    confidence: 0.94,
  },
];

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  present: 42,
  late: 8,
  leave: 3,
  absent: 5,
};

// Generate chart data for last 30 days
export const generateAttendanceChartData = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
      hadir: Math.floor(Math.random() * 10) + 35,
      terlambat: Math.floor(Math.random() * 8) + 2,
      izin: Math.floor(Math.random() * 3),
      absen: Math.floor(Math.random() * 5),
    });
  }
  return data;
};

// Generate late chart data by division
export const generateLateByDivisionData = () => {
  return [
    { division: 'IT', count: 12 },
    { division: 'HR', count: 5 },
    { division: 'Finance', count: 8 },
    { division: 'Marketing', count: 15 },
    { division: 'Operations', count: 6 },
  ];
};
