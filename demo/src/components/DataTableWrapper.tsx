import React from 'react';
import { DataTable } from '../../../src';

interface DataTableWrapperProps {
  props: Record<string, any>;
  setProps: (props: Record<string, any>) => void;
}

export const DataTableWrapper: React.FC<DataTableWrapperProps> = ({ props, setProps }) => {
  const defaultData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  ];

  const defaultColumns = [
    { key: 'name', header: 'Name', accessor: (row: any) => row.name, sortable: true },
    { key: 'email', header: 'Email', accessor: (row: any) => row.email, filterable: true },
    { key: 'role', header: 'Role', accessor: (row: any) => row.role, sortable: true },
  ];

  return (
    <DataTable
      {...props}
      data={props.data || defaultData}
      columns={props.columns || defaultColumns}
    />
  );
};

