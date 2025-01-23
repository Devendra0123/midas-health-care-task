import React, { useState, useEffect } from 'react';
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
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterVisible, setFilterVisible] = useState(true);

  const tabCounts = {
    'New Patients': newPatients.length,
    'Nurse Seen': nurseSeenPatients.length,
    'Doctor Visited': doctorVisitedPatients.length,
    'Appointment': appointmentPatients.length,
  };

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

    setFilteredPatients(filtered);
  }, [filters, patients]);

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
      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} className="mb-6">
        {(Object.keys(tabCounts) as Array<keyof typeof tabCounts>).map((tab) => (
          <TabPane tab={`${tab} (${tabCounts[tab]})`} key={tab} />
        ))}
      </Tabs>

      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">Patients</div>
        <div className="flex items-center space-x-2">
          <span>Rows per page:</span>
          <Tooltip title="Value must not be less than 1">
            <InputNumber
              min={1}
              value={pageSize}
              onChange={(value) => handlePageSizeChange(value!)}
            />
          </Tooltip>
          <Button type="primary" onClick={handleDownloadExcel}>
            Download Excel
          </Button>
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
