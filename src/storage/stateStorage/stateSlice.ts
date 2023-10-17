import { createSlice } from '@reduxjs/toolkit';

const initialState= {
  accountData: null,
  loading: false,
  notification: null,
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {},
});

export default stateSlice.reducer;
