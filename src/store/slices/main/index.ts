import { createSlice } from '@reduxjs/toolkit';
import { FilterRole, SortingOrder } from 'interfaces/interfaces';
import { getEmployees } from './actions';

import type { TInitialState } from './types';

const initialState: TInitialState = {
  isLoading: true,
  employees: [],
  sort: SortingOrder.Default,
  role: FilterRole.All,
  checked: false,
};

export const mainReducer = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    setChecked(state, action) {
      state.checked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmployees.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.employees = action.payload;
      state.isLoading = false;
    });
  },
});

export const { setSort, setChecked, setRole } = mainReducer.actions;

export default mainReducer.reducer;
