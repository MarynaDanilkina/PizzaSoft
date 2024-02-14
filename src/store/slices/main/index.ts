import { createSlice } from '@reduxjs/toolkit';

import type { TInitialState } from './types';

const initialState: TInitialState = {
  main: [],
};

export const mainReducer = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const {} = mainReducer.actions;

export default mainReducer.reducer;
