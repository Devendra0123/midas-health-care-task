import { useMemo } from 'react';
import { Patient } from '../types';

export const useSearch = (data: Patient[], query: string) => {
  const filteredData = useMemo(() => {
    if (!query.trim()) return data; // Return all data if query is empty

    const lowerQuery = query.toLowerCase();

    return data.filter(
      (patient) =>
        patient.name.toLowerCase().includes(lowerQuery) ||
        patient.doctor.name.toLowerCase().includes(lowerQuery) ||
        patient.status.toLowerCase().includes(lowerQuery) ||
        patient.department.name.toLowerCase().includes(lowerQuery)
    );
  }, [data, query]);

  return filteredData;
};
