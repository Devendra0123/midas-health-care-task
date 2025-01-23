import React, { useState } from 'react';
import { Table, Button, Tooltip, Modal, Descriptions } from 'antd';
import { Patient } from '../../types';
import { LuEye } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { formatDate } from '../../utils/formatDate';

interface PatientTableProps {
  patients: Patient[];
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  total,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const [previousRecordsModal, setPreviousRecordsModal] = useState<{
    visible: boolean;
    records: Patient['previousRecords'];
    patientName: string;
  }>({
    visible: false,
    records: [],
    patientName: '',
  });

  const [detailModal, setDetailModal] = useState<{
    visible: boolean;
    patient: Patient | null;
  }>({
    visible: false,
    patient: null,
  });

  const handleViewPreviousRecords = (patient: Patient) => {
    setPreviousRecordsModal({
      visible: true,
      records: patient.previousRecords,
      patientName: patient.name,
    });
  };

  const handleViewDetails = (patient: Patient) => {
    setDetailModal({
      visible: true,
      patient,
    });
  };

  const handleModalClose = () => {
    setPreviousRecordsModal({
      visible: false,
      records: [],
      patientName: '',
    });
  };

  const handleDetailModalClose = () => {
    setDetailModal({
      visible: false,
      patient: null,
    });
  };

  const columns = [
    { title: 'S.N.', dataIndex: 'serialNumber', key: 'serialNumber' },
    { title: 'UHID', dataIndex: 'uhid', key: 'uhid' },
    { title: 'Patient Name', dataIndex: 'name', key: 'name' },
    { title: 'Age/Gender', render: (record: Patient) => `${record.age} Yrs / ${record.gender}` },
    {
      title: 'Billing Date & Time',
      dataIndex: 'billingDateTime',
      key: 'billingDateTime',
      render: (date: string) => formatDate(date)
    },
    { title: 'Department', render: (record: Patient) => record.department.name },
    { title: 'Doctor', render: (record: Patient) => record.doctor.name },
    { title: 'Queue No.', dataIndex: 'queueNumber', key: 'queueNumber' },
    {
      title: 'Previous Record',
      key: 'previousRecord',
      render: (record: Patient) => (
        <Tooltip title="View Previous Records">
          <Button
            onClick={() => handleViewPreviousRecords(record)}
            disabled={!record.previousRecords.length}
            className="w-[70px]"
          >
            {record.previousRecords.length > 0 ? (
              <span className="flex items-center gap-2 bg-white">
                {record.previousRecords.length}
                <IoIosArrowDown />
              </span>
            ) : (
              <span>0</span>
            )}
          </Button>
        </Tooltip>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: ({ status }: Patient) => (
        <div
          className={`${status === 'New'
            ? 'border border-teal text-teal'
            : status === 'Follow Up'
              ? 'border border-orange text-orange'
              : status === 'Free'
                ? 'border border-purple text-purple'
                : 'border border-blue-500 text-blue-500'
            } flex items-center justify-center rounded-xl text-nowrap px-2 py-1`}
        >
          {status}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: Patient) => (
        <Tooltip title="View details">
          <Button onClick={() => handleViewDetails(record)}>
            <LuEye />
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={patients}
        columns={columns}
        rowKey="id"
        pagination={{
          total,
          pageSize,
          current: currentPage,
          onChange: onPageChange,
          showSizeChanger: false,
        }}
        rowClassName={(_, index) =>
          index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
        }
        className="max-w-full overflow-x-auto "
        footer={() => (
          <div className="flex justify-between items-center">
            <div>
              Showing {Math.min((currentPage - 1) * pageSize + 1, total)} to{' '}
              {Math.min(currentPage * pageSize, total)} of {total} entries
            </div>
          </div>
        )}
      />

      {/* Previous Records Modal */}
      <Modal
        open={previousRecordsModal.visible}
        title={`Previous Records - ${previousRecordsModal.patientName}`}
        onCancel={handleModalClose}
        footer={null}
      >
        <Table
          dataSource={previousRecordsModal.records.map((record, index) => ({
            key: index,
            ...record,
          }))}
          columns={[
            { title: 'Date', dataIndex: 'date', key: 'date', render: (date: string) => formatDate(date) },
            { title: 'Department', dataIndex: 'department', key: 'department' },
            { title: 'Doctor', dataIndex: 'doctor', key: 'doctor' },
            { title: 'Status', dataIndex: 'status', key: 'status' },
          ]}
          pagination={false}
        />
      </Modal>

      {/* Patient Detail Modal */}
      <Modal
        open={detailModal.visible}
        title="Patient Details"
        onCancel={handleDetailModalClose}
        footer={null}
      >
        {detailModal.patient && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="UHID">{detailModal.patient.uhid}</Descriptions.Item>
            <Descriptions.Item label="Name">{detailModal.patient.name}</Descriptions.Item>
            <Descriptions.Item label="Age / Gender">
              {`${detailModal.patient.age} / ${detailModal.patient.gender}`}
            </Descriptions.Item>
            <Descriptions.Item label="Billing Date & Time">
              {formatDate(detailModal.patient.billingDateTime)}
            </Descriptions.Item>
            <Descriptions.Item label="Department">
              {detailModal.patient.department.name}
            </Descriptions.Item>
            <Descriptions.Item label="Doctor">{detailModal.patient.doctor.name}</Descriptions.Item>
            <Descriptions.Item label="Queue Number">{detailModal.patient.queueNumber}</Descriptions.Item>
            <Descriptions.Item label="Status">{detailModal.patient.status}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
};

export default PatientTable;
