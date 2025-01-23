import type { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon"


export interface Doctor {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface PreviousRecord {
  date: string; // Date of the previous record
  department: string; // Department name
  doctor: string; // Doctor's name
  status: string; // Status (e.g., Follow Up, New, Free)
}

export interface Patient {
  id: number; // Unique ID for the patient
  serialNumber: number; // Serial number
  uhid: string; // Unique Health Identification Number
  name: string; // Patient's name
  age: number; // Patient's age
  gender: 'M' | 'F'; // Gender
  billingDateTime: string; // Billing date and time
  department: Department; // Department object
  doctor: Doctor; // Doctor object
  queueNumber: number; // Queue number
  previousRecord: boolean; // Whether the patient has previous records
  previousRecords: PreviousRecord[]; // Array of previous records
  status: 'Follow Up' | 'New' | 'Free'; // Patient's current status
  urgent: boolean; // Whether the case is urgent
}

export interface PreviousRecord {
  date: string;
  department: string;
  doctor: string;
  status: string;
}

export interface FilterState {
  fromDate?: string; // ISO date string
  toDate?: string; // ISO date string
  doctorId?: number; // Doctor ID for filtering
}
 
  // Route Configuration Type
  export interface RouteConfig {
    path: string;
    breadcrumb: string | ((params: Record<string, string>) => string); 
    element: React.ReactNode;
  }
  
  export interface FilterState {
    fromDate?: string; // ISO date string
    toDate?: string;   // ISO date string
    doctorId?: number; // Doctor ID for filtering
  }
  // Doctor Option Type for Select Dropdown
  export interface DoctorOption {
    label: string;
    value: number;
  }

  export interface SummaryCardData {
    title1: string
    value1: string | number
    title2?: string
    value2?: string | number
    icon1: React.ComponentType<AntdIconProps> | null
    icon2?: React.ComponentType<AntdIconProps> | null
    additionalInfo?: string | number
    tooltip?: string
  }
  
  
  