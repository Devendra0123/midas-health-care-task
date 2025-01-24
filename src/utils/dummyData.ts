import { Patient, Doctor, Department } from '../types';

// Doctors
export const dummyDoctors: Doctor[] = [
  { id: 1, name: 'Dr. Ram Prakash' },
  { id: 2, name: 'Dr. Shyam Prasad' },
  { id: 3, name: 'Dr. Abhinay Prasad' },
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
    date: new Date(
      2024,
      11, 
      12 - index, 
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60)
    ).toISOString(),
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

// Helper function to generate random valid ISO date
const getRandomDate = (): string => {
  const year = 2025;
  const month = 0;
  const day = Math.floor(Math.random() * 30) + 1; 
  const hour = Math.floor(Math.random() * 24); 
  const minute = Math.floor(Math.random() * 60); 
  const second = Math.floor(Math.random() * 60); 
  return new Date(year, month, day, hour, minute, second).toISOString();
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
    billingDateTime: getRandomDate(), 
    department: getRandomItem(dummyDepartments),
    doctor: getRandomItem(dummyDoctors),
    queueNumber: index + 1,
    previousRecord: Math.random() > 0.5,
    previousRecords: Math.random() > 0.5 ? generatePreviousRecords(2) : [],
    status: getRandomStatus(),
    urgent: Math.random() > 0.7, 
  }));

// Generate patients for each tab
export const newPatients = generatePatients(30);
export const nurseSeenPatients = generatePatients(30);
export const doctorVisitedPatients = generatePatients(30);
export const appointmentPatients = generatePatients(30);
