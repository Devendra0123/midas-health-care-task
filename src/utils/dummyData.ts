import { Patient, Doctor, Department } from '../types';

// Doctors
export const dummyDoctors: Doctor[] = [
  { id: 1, name: 'Dr. John Doe' },
  { id: 2, name: 'Dr. Jane Smith' },
  { id: 3, name: 'Dr. Emily White' },
];

// Departments
export const dummyDepartments: Department[] = [
  { id: 1, name: 'Cardiology' },
  { id: 2, name: 'Neurology' },
  { id: 3, name: 'Orthopedics' },
  { id: 4, name: 'Dermatology' },
];

// Helper function to generate previous records
const generatePreviousRecords = (count: number): Patient['previousRecords'] =>
  Array.from({ length: count }).map((_, index) => ({
    date: `2024-12-${12 - index}`,
    department: dummyDepartments[index % dummyDepartments.length].name,
    doctor: dummyDoctors[index % dummyDoctors.length].name,
    status: index % 2 === 0 ? 'Follow Up' : 'New',
  }));

// Generate patients for a specific tab
const generatePatients = (
  count: number,
  status: 'New' | 'Follow Up' | 'Free',
  departmentIndex: number,
  doctorIndex: number
): Patient[] =>
  Array.from({ length: count }).map((_, index) => ({
    id: index + 1,
    serialNumber: index + 1,
    uhid: `UHID${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
    name: `Patient ${index + 1}`,
    age: Math.floor(Math.random() * 50) + 20,
    gender: index % 2 === 0 ? 'M' : 'F',
    billingDateTime: `2025-01-${Math.floor(Math.random() * 30) + 1}T${
      Math.floor(Math.random() * 10) + 8
    }:30:00Z`,
    department: dummyDepartments[departmentIndex % dummyDepartments.length],
    doctor: dummyDoctors[doctorIndex % dummyDoctors.length],
    queueNumber: index + 1,
    previousRecord: index % 2 === 0, // Some patients have previous records
    previousRecords: index % 2 === 0 ? generatePreviousRecords(2) : [], // Generate 2 records if previousRecord is true
    status,
    urgent: index % 3 === 0, // Some patients are marked as urgent
  }));

// New Patients
export const newPatients = generatePatients(10, 'New', 0, 0);

// Nurse Seen
export const nurseSeenPatients = generatePatients(10, 'Follow Up', 1, 1);

// Doctor Visited
export const doctorVisitedPatients = generatePatients(10, 'New', 2, 2);

// Appointment
export const appointmentPatients = generatePatients(10, 'Free', 3, 0);
