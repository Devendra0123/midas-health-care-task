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
  date: string;
  department: string; 
  doctor: string;
  status: string;
}

export interface Patient {
  id: number;
  serialNumber: number; 
  uhid: string;
  name: string; 
  age: number; 
  gender: 'M' | 'F'; 
  billingDateTime: string;
  department: Department;
  doctor: Doctor;
  queueNumber: number; 
  previousRecord: boolean;
  previousRecords: PreviousRecord[];
  status: 'Follow Up' | 'New' | 'Free';
  urgent: boolean;
}

export interface PreviousRecord {
  date: string;
  department: string;
  doctor: string;
  status: string;
}

export interface FilterState {
  fromDate?: string; 
  toDate?: string; 
  doctorId?: number; 
}
 
  export interface RouteConfig {
    path: string;
    breadcrumb: string | ((params: Record<string, string>) => string); 
    element: React.ReactNode;
  }
  
  export interface FilterState {
    fromDate?: string;
    toDate?: string;  
    doctorId?: number;
  }

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
  
  
  