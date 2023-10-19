import { createSlice } from '@reduxjs/toolkit';

import { Account } from '@/entities/Account';

interface IStorageAccountStateProps {
  account: Account | null;
  loading: boolean;
}

interface IAccountStateProps {
  accountState: IStorageAccountStateProps;
}

const initialState: IStorageAccountStateProps = {
  account: null,
  loading: false,
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    logIn: (state, action) => {
      const { id } = action.payload;
      return { ...state, loading: false, account: { id }, notification: null };
    },
    logOut: (state) => {
      return { ...state, loading: false, account: null, notification: null };
    },
    loading: (state) => {
      return { ...state, loading: true, account: null, notification: null };
    },
  },
});

export const { logIn, logOut, loading } = stateSlice.actions;

export const selectAccount = (state: IAccountStateProps) => state.accountState.account;
export const selectLoading = (state: IAccountStateProps) => state.accountState.loading;

export default stateSlice.reducer;
