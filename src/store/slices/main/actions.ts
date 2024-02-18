import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilterRole } from 'interfaces/interfaces';
import { EmployeesProps } from './types';

export const getEmployees = createAsyncThunk(
  'main/getEmployees',
  async ({ role, checked }: { role: FilterRole; checked?: boolean }) => {
    const roleParamsMap: { [key in FilterRole]: string } = {
      [FilterRole.All]: '',
      [FilterRole.Cook]: 'cook',
      [FilterRole.Driver]: 'driver',
      [FilterRole.Waiter]: 'waiter',
    };

    const roleParams = roleParamsMap[role] ? `role=${roleParamsMap[role]}` : '';
    const checkedParams = checked ? 'isArchive=1' : '';

    const queryParams = [roleParams, checkedParams].filter(Boolean).join('&');
    const url = `http://localhost:3004/employees?${queryParams}`;

    const response = await fetch(url);
    const data = (await response.json()) as EmployeesProps[];
    return data;
  },
);

export const createEmployees = createAsyncThunk(
  'main/createEmployees',
  async ({ employeeData }: { employeeData: EmployeesProps }) => {
    const response = await fetch('http://localhost:3004/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
    const data = await response.json();
    console.log(data);
    return data;
  },
);
