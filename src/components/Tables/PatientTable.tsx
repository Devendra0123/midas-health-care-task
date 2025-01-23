import React, { useState } from 'react';
import { Table, Button, Tooltip, Modal } from 'antd';
import { Patient } from '../../types';

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

  const handleViewPreviousRecords = (patient: Patient) => {
    setPreviousRecordsModal({
      visible: true,
      records: patient.previousRecords,
      patientName: patient.name,
    });
  };

  const handleModalClose = () => {
    setPreviousRecordsModal({
      visible: false,
      records: [],
      patientName: '',
    });
  };

  const columns = [
    { title: 'S.N.', dataIndex: 'serialNumber', key: 'serialNumber' },
    { title: 'UHID', dataIndex: 'uhid', key: 'uhid' },
    { title: 'Patient Name', dataIndex: 'name', key: 'name' },
    { title: 'Age/Gender', render: (record: Patient) => `${record.age} / ${record.gender}` },
    { title: 'Billing Date & Time', dataIndex: 'billingDateTime', key: 'billingDateTime' },
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
            type="link"
            disabled={!record.previousRecords.length}
          >
            {record.previousRecords.length > 0
              ? `View (${record.previousRecords.length})`
              : 'None'}
          </Button>
        </Tooltip>
      ),
    },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (record: Patient) => (
        <Button type="link" onClick={() => console.log(`View details for ${record.name}`)}>
          View Details
        </Button>
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
      />

      {/* Previous Records Modal */}
      <Modal
        visible={previousRecordsModal.visible}
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
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Department', dataIndex: 'department', key: 'department' },
            { title: 'Doctor', dataIndex: 'doctor', key: 'doctor' },
            { title: 'Status', dataIndex: 'status', key: 'status' },
          ]}
          pagination={false}
        />
      </Modal>
    </>
  );
};

export default PatientTable;
