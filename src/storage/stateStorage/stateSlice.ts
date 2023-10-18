import { createSlice } from '@reduxjs/toolkit';

import { Account } from '@/entities/Account';

interface IStorageAccountStateProps {
  accountData: Account | null;
  loading: boolean;
}

const initialState: IStorageAccountStateProps = {
  accountData: null,
  loading: false,
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    logIn: (state, action) => {
      const { id } = action.payload;
      return { ...state, loading: false, accountData: { id }, notification: null };
    },
    logOut: (state) => {
      return { ...state, loading: false, accountData: null, notification: null };
    },
    loading: (state) => {
      return { ...state, loading: true, accountData: null, notification: null };
    }
  },
});

export const { logIn, logOut, loading } = stateSlice.actions;

interface IAccountStateProps {
  accountState: IStorageAccountStateProps;
}

export const selectAccountData = (state: IAccountStateProps) => state.accountState.accountData;
export const selectLoading = (state: IAccountStateProps) => state.accountState.loading;

export default stateSlice.reducer;
