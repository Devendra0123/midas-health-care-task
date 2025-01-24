import React, { createContext, useState, useContext, useCallback, useMemo } from 'react';
import { Patient } from '../types';

interface PatientContextType {
  patients: Patient[];
  addPatients: (newPatients: Patient[]) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useState<Patient[]>([]);

  // Add multiple patients, ensuring no duplicates
  const addPatients = useCallback((newPatients: Patient[]) => {
    setPatients((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const uniquePatients = newPatients.filter((p) => !existingIds.has(p.id));
      return [...prev, ...uniquePatients];
    });
  }, []);

  const contextValue = useMemo(() => ({ patients, addPatients }), [patients, addPatients]);

  return <PatientContext.Provider value={contextValue}>{children}</PatientContext.Provider>;
};

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};
