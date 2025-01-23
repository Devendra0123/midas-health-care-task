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
    department: dummyDepartments[Math.floor(Math.random() * dummyDepartments.length)].name,
    doctor: dummyDoctors[Math.floor(Math.random() * dummyDoctors.length)].name,
    status: index % 2 === 0 ? 'Follow Up' : 'New',
  }));

// Helper function to get a random item from an array
const getRandomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

// Helper function to generate random status
const getRandomStatus = (): 'New' | 'Follow Up' | 'Free' => {
  const statuses: ('New' | 'Follow Up' | 'Free')[] = ['New', 'Follow Up', 'Free'];
  return getRandomItem(statuses);
};

// Generate patients for a specific tab
const generatePatients = (count: number): Patient[] =>
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
    department: getRandomItem(dummyDepartments),
    doctor: getRandomItem(dummyDoctors),
    queueNumber: index + 1,
    previousRecord: Math.random() > 0.5, // Randomly decide if the patient has previous records
    previousRecords: Math.random() > 0.5 ? generatePreviousRecords(2) : [], // Generate previous records randomly
    status: getRandomStatus(),
    urgent: Math.random() > 0.7, // Randomly mark some patients as urgent
  }));

// Generate patients for each tab
export const newPatients = generatePatients(30);
export const nurseSeenPatients = generatePatients(30);
export const doctorVisitedPatients = generatePatients(30);
export const appointmentPatients = generatePatients(30);
