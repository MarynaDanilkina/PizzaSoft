import { FilterRole, SortingOrder } from 'interfaces/interfaces';

export type EmployeesProps = {
  id: number;
  name: string;
  isArchive: boolean;
  role: string;
  phone: string;
  birthday: string;
};

export type TInitialState = {
  isLoading: boolean;
  employees: EmployeesProps[];
  sort: SortingOrder.Default;
  role: FilterRole;
  checked: boolean;
};
