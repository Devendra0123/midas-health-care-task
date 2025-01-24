import { useState, useEffect, useRef } from 'react';
import { Patient, FilterState } from '../types';
import {
    newPatients,
    nurseSeenPatients,
    doctorVisitedPatients,
    appointmentPatients,
} from '../utils/dummyData';
import { useDebounce } from './useDebounce';
import * as XLSX from 'xlsx';

interface UseDashboardReturn {
    patients: Patient[];
    filteredPatients: Patient[];
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    loading: boolean;
    filterLoading: boolean;
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    pageSize: number;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    handleDownloadExcel: () => void;
    handleResetFilters: () => void;
 tabCounts: {
        'New Patients': number;
        'Nurse Seen': number;
        'Doctor Visited': number;
        Appointment: number;
    }
}


export const useDashboard = (): UseDashboardReturn => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
    const [filters, setFilters] = useState<FilterState>({
        fromDate: undefined,
        toDate: undefined,
        doctorId: undefined,
    });

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('New Patients');
    const [pageSize, setPageSize] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedQuery = useDebounce(searchQuery, 300);
    const [filterLoading, setFilterLoading] = useState(false);
    const tabCounts = {
        'New Patients': 30,
        'Nurse Seen': 30,
        'Doctor Visited': 35,
        'Appointment': 30,
      };
    

    const previousFiltersRef = useRef<FilterState>(filters);

    // Load data for the active tab
    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => {
            switch (activeTab) {
                case 'New Patients':
                    setPatients(newPatients);
                    break;
                case 'Nurse Seen':
                    setPatients(nurseSeenPatients);
                    break;
                case 'Doctor Visited':
                    setPatients(doctorVisitedPatients);
                    break;
                case 'Appointment':
                    setPatients(appointmentPatients);
                    break;
                default:
                    setPatients([]);
            }
            setTimeout(() => setLoading(false), 700);
            setCurrentPage(1);
        }, 500);

        return () => clearTimeout(timeout);
    }, [activeTab]);

    // Apply filters
    useEffect(() => {
        const applyFilters = () => {
            const filtersChanged =
                previousFiltersRef.current.fromDate !== filters.fromDate ||
                previousFiltersRef.current.toDate !== filters.toDate ||
                previousFiltersRef.current.doctorId !== filters.doctorId;

            if (filtersChanged) {
                setFilterLoading(true);
            }

            const timeout = setTimeout(() => {
                let filtered = [...patients];

                // Filter by date
                if (filters.fromDate) {
                    filtered = filtered.filter(
                        (p) => new Date(p.billingDateTime) >= new Date(filters.fromDate!)
                    );
                }
                if (filters.toDate) {
                    filtered = filtered.filter(
                        (p) => new Date(p.billingDateTime) <= new Date(filters.toDate!)
                    );
                }

                // Filter by doctor
                if (filters.doctorId) {
                    filtered = filtered.filter((p) => p.doctor.id === filters.doctorId);
                }

                // Apply search query
                if (debouncedQuery) {
                    const query = debouncedQuery.toLowerCase();
                    filtered = filtered.filter(
                        (p) =>
                            p.uhid.toLowerCase().includes(query) ||
                            p.name.toLowerCase().includes(query) ||
                            p.doctor.name.toLowerCase().includes(query) ||
                            p.status.toLowerCase().includes(query) ||
                            p.department.name.toLowerCase().includes(query)
                    );
                }

                setFilteredPatients(filtered);
                setFilterLoading(false);
                previousFiltersRef.current = filters;
            }, 500);

            return () => clearTimeout(timeout);
        };

        applyFilters();
    }, [filters, patients, debouncedQuery]);


    // Download Excel
    const handleDownloadExcel = () => {
        const data = filteredPatients.map((p) => ({
            'S.N.': p.serialNumber,
            'UHID': p.uhid,
            'Patient Name': p.name,
            'Age/Gender': `${p.age} / ${p.gender}`,
            'Billing Date & Time': new Date(p.billingDateTime).toLocaleString(),
            'Department': p.department.name,
            'Doctor': p.doctor.name,
            'Status': p.status,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Patients');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        const url = window.URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${activeTab}_Patients.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleResetFilters = () => {
        setFilters({
            fromDate: undefined,
            toDate: undefined,
            doctorId: undefined,
        });
    };

    return {
        patients,
        filteredPatients,
        filters,
        setFilters,
        loading,
        filterLoading,
        activeTab,
        setActiveTab,
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        searchQuery,
        setSearchQuery,
        handleDownloadExcel,
        handleResetFilters,
        tabCounts
    };
};
