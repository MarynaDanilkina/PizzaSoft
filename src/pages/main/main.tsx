import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import Loading from 'components/common/Loading';
import {
  SortingOrder,
  useAppDispatch,
  useAppSelector,
} from 'interfaces/interfaces';
import React, { useEffect, useState } from 'react';
import { getEmployees } from 'store/slices/main/actions';
import { EmployeesProps } from 'store/slices/main/types';
import SortForm from 'components/common/SortForm';
import { ROUTES } from 'data/Routes';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, employees, sort, role, checked } = useAppSelector(
    (state) => state.main,
  );
  const [sortEmployees, setSortEmployees] = useState(employees);

  const columns: TableColumnsType<EmployeesProps> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
  ];

  const sortedAsc = (a: string, b: string) => {
    const dateA = new Date(a.split('.').reverse().join('-'));
    const dateB = new Date(b.split('.').reverse().join('-'));
    return dateA.getTime() - dateB.getTime();
  };

  const sortedDesc = (a: string, b: string) => {
    const dateA = new Date(a.split('.').reverse().join('-'));
    const dateB = new Date(b.split('.').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  };

  useEffect(() => {
    dispatch(getEmployees({ role, checked }));
  }, [dispatch, role, checked]);

  const sortFunctions = {
    [SortingOrder.Default]: (employees: EmployeesProps[]) => employees,
    [SortingOrder.NameAsc]: (employees: EmployeesProps[]) =>
      [...employees].sort((a, b) => a.name.localeCompare(b.name)),
    [SortingOrder.NameDesc]: (employees: EmployeesProps[]) =>
      [...employees].sort((a, b) => b.name.localeCompare(a.name)),
    [SortingOrder.BirthdayAsc]: (employees: EmployeesProps[]) =>
      [...employees].sort((a, b) => sortedAsc(a.birthday, b.birthday)),
    [SortingOrder.BirthdayDesc]: (employees: EmployeesProps[]) =>
      [...employees].sort((a, b) => sortedDesc(a.birthday, b.birthday)),
  };

  const goToCreate = () => {
    navigate(ROUTES.CREATE);
  };

  useEffect(() => {
    setSortEmployees(sortFunctions[sort](employees));
  }, [sort, employees]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <button onClick={goToCreate}>Create Employees</button>
      <SortForm />
      <Table
        pagination={false}
        rowKey="id"
        columns={columns}
        dataSource={sortEmployees}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`${ROUTES.EDIT}/${record.id}`);
            },
          };
        }}
      />
    </div>
  );
};

export default MainPage;
