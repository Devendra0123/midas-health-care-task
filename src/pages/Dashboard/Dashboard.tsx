
import React, { useRef } from 'react';
import { Spin, Tabs } from 'antd';
import Toolbar from '../../components/Toolbar/Toolbar';
import FilterSection from '../../components/Filters/FilterSection';
import FilterModalForSmallScreen from '../../components/Modals/FilterModalForSmallScreen';
import PatientTable from '../../components/Tables/PatientTable';
import SummaryCard from '../../components/SummaryCards/SummaryCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import ScrollToTopButton from '../../components/ScrollTopBottom';
import { GiStethoscope } from 'react-icons/gi';
import { useDashboard } from '../../hooks/useDashboard';
import { summaryCards } from '../../utils/summaryData';
import { dummyDoctors } from '../../utils/dummyData';
import { FilterState } from '../../types';
import { Tooltip, InputNumber } from 'antd';

const Dashboard: React.FC = () => {
  const {
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
    setSearchQuery,
    handleDownloadExcel,
    handleResetFilters,
    tabCounts
  } = useDashboard();

  const [isFilterModalDisplaying, setIsFilterModalDisplaying] = React.useState(false);
  const [filterOptions, setFilterOptions] = React.useState<string[]>(['date', 'doctor']);
  const [filterVisible, setFilterVisible] = React.useState(true);

  const tabsRef = useRef<HTMLDivElement>(null);

  // Scroll to tabs when filters are changed via modal (small screen)
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);

    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative container mx-auto md:px-4 pt-3 pb-[100px]">
      {/* Header Section */}
      <div className="bg-slate-100 pb-2 md:pb-4">

        {/* Toolbar */}
        <Toolbar
          title="OPD Department"
          titleIcon={<GiStethoscope />}
          filterVisible={filterVisible}
          onToggleFilter={() => setFilterVisible((prev) => !prev)}
          onDownload={handleDownloadExcel}
          onResetFilters={handleResetFilters}
          setFilterOptions={setFilterOptions}
          setFilterModalDisplay={() => setIsFilterModalDisplaying((prev) => !prev)}
        />

        {/* Filter Modal for Small Devices */}
        <FilterModalForSmallScreen
          isModalOpen={isFilterModalDisplaying}
          handleCancel={() => setIsFilterModalDisplaying(false)}
          handleOk={() => setIsFilterModalDisplaying(false)}
          onResetFilters={handleResetFilters}
          setFilterOptions={setFilterOptions}
          filters={filters}
          onFilterChange={handleFilterChange}
          activeTab={activeTab}
          doctors={dummyDoctors}
          filterOptions={filterOptions}
        />

        {/* Filter Section */}
        <div className="hidden lg:flex">
          {filterVisible && (
            <FilterSection
              filters={filters}
              onFilterChange={handleFilterChange}
              activeTab={activeTab}
              doctors={dummyDoctors}
              filterOptions={filterOptions}
            />
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-4">
          {summaryCards.map((card, index) => (
            <SummaryCard key={index} card={card} />
          ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div ref={tabsRef}>


        <Tabs
          type='card'
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          items={(Object.keys(tabCounts) as Array<keyof typeof tabCounts>).map((tab) => ({
            key: tab,
            label: (
              <div className={`${activeTab === tab ? 'text-white' : 'text-black'} px-2 py-1 rounded-md text-md xl:text-lg`}>
                {`${tab} (${tabCounts[tab]})`}
              </div>
            ),
            children: (
              <>
                {/* Top Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                  <div className="text-lg w-full md:w-[370px]">
                    {/* Search Bar */}
                    <SearchBar
                      placeholder="Search by name, status, department"
                      onSearch={setSearchQuery}
                    />
                  </div>
                  <div className="w-full md:w-max flex justify-end items-center space-x-2">
                    <span>Rows per page:</span>
                    <Tooltip title="Value must not be less than 1">
                      <InputNumber
                        min={1}
                        value={pageSize}
                        onChange={(value) => setPageSize(value || 1)}
                      />
                    </Tooltip>
                  </div>
                </div>
                {loading || filterLoading ? (
                  <Spin size="large" className="flex justify-center items-center h-64" />
                ) : (
                  <PatientTable
                    patients={filteredPatients.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                    total={filteredPatients.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            ),
          }))}
        />
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default Dashboard;
