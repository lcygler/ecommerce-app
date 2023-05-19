import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './extraReducers';
import { getInitialState } from './initialState';
import * as reducers from './reducers';

const slice = createSlice({
  name: 'slice',
  initialState: getInitialState(),
  reducers: reducers,
  extraReducers: extraReducers,
});

export const { actions } = slice;

export default slice.reducer;
