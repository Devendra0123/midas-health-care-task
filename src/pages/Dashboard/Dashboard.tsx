import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Spin, InputNumber, Tooltip, Button } from 'antd';
import * as XLSX from 'xlsx';
import BreadcrumbComponent from '../../components/Breadcrumb/BreadcrumbComponent';
import FilterSection from '../../components/Filters/FilterSection';
import PatientTable from '../../components/Tables/PatientTable';
import {
  newPatients,
  nurseSeenPatients,
  doctorVisitedPatients,
  appointmentPatients,
  dummyDoctors,
} from '../../utils/dummyData';
import { Patient, FilterState } from '../../types';
import Toolbar from '../../components/Toolbar/Toolbar';
import { summaryCards } from '../../utils/summaryData';
import SummaryCard from '../../components/SummaryCards/SummaryCard';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearch } from '../../hooks/useSearch';
import SearchBar from '../../components/SearchBar/SearchBar';
import useScrollVisibility from '../../hooks/useScrollVisibility';

const { TabPane } = Tabs;

const Dashboard: React.FC = () => {
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
  const [filterVisible, setFilterVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  const tabCounts = {
    'New Patients': newPatients.length,
    'Nurse Seen': nurseSeenPatients.length,
    'Doctor Visited': doctorVisitedPatients.length,
    'Appointment': appointmentPatients.length,
  };

  const [hidden, setHidden] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  const delta = 1;

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        setHeaderHeight(height);
        document.body.style.paddingTop = `${height}px`;
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [filterVisible]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (Math.abs(lastScrollTop - scrollTop) <= delta) return;

      if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
        setHidden(true);
      } else if (scrollTop + window.innerHeight < document.body.scrollHeight) {
        setHidden(false);
      }

      setLastScrollTop(scrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop, headerHeight]);


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
      setLoading(false);
      setCurrentPage(1); // Reset to first page when tab changes
    }, 500);

    return () => clearTimeout(timeout);
  }, [activeTab]);

  // Apply filters
  useEffect(() => {
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
          p.name.toLowerCase().includes(query) ||
          p.doctor.name.toLowerCase().includes(query) ||
          p.status.toLowerCase().includes(query) ||
          p.department.name.toLowerCase().includes(query)
      );
    }

    setFilteredPatients(filtered);
  }, [filters, patients, debouncedQuery]);


  // Pagination logic
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageSizeChange = (value: number | null) => {
    if (value === null || value < 1) return;
    setPageSize(value);
    setCurrentPage(1); // Reset to first page when page size changes
  };

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

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Patients');

    // Export the workbook as a Blob
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Trigger download
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

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Components to Hide on Scroll */}
      <header
        ref={headerRef}
        className={`header ${hidden ? 'nav-up' : 'nav-down'}`}
      >
        {/* Breadcrumb */}
        <BreadcrumbComponent />

        {/* Toolbar Component */}
        <Toolbar
          title="OPD Department"
          filterVisible={filterVisible}
          onToggleFilter={() => setFilterVisible((prev) => !prev)}
          onDownload={handleDownloadExcel}
          onResetFilters={handleResetFilters}
        />

        {/* Filter Section */}
        {
          filterVisible && (
            <FilterSection
              filters={filters}
              onFilterChange={setFilters}
              activeTab={activeTab}
              doctors={dummyDoctors}
            />
          )
        }

        {/* Summary Card Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {summaryCards.map((card, index) => (
            <SummaryCard key={index} card={card} />
          ))}
        </div>

        {/* Tabs */}
        <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} className="">
          {(Object.keys(tabCounts) as Array<keyof typeof tabCounts>).map((tab) => (
            <TabPane tab={`${tab} (${tabCounts[tab]})`} key={tab} />
          ))}
        </Tabs>
      </header>


      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">
          {/* Search Bar */}
          <SearchBar
            placeholder="Search by patient name, doctor name, status, department"
            onSearch={setSearchQuery}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span>Rows per page:</span>
          <Tooltip title="Value must not be less than 1">
            <InputNumber
              min={1}
              value={pageSize}
              onChange={(value) => handlePageSizeChange(value!)}
            />
          </Tooltip>
        </div>
      </div>

      {/* Table or Loader */}
      {loading ? (
        <Spin size="large" className="flex justify-center items-center h-64" />
      ) : (
        <PatientTable
          patients={paginatedPatients}
          total={filteredPatients.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Dashboard;
