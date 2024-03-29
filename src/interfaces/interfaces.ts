import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store from 'store';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export enum SortingOrder {
  Default = 'default',
  NameAsc = 'nameAsc',
  NameDesc = 'nameDesc',
  BirthdayAsc = 'birthdayAsc',
  BirthdayDesc = 'birthdayDesc',
}
export enum FilterRole {
  All = 'all',
  Driver = 'driver',
  Waiter = 'waiter',
  Cook = 'cook',
}
export enum Role {
  Driver = 'driver',
  Waiter = 'waiter',
  Cook = 'cook',
}
