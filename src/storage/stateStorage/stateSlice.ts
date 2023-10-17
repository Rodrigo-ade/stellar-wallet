import { createSlice } from '@reduxjs/toolkit';

import { Notification } from '@/entities/notification';
import { AccountData } from '@/entities/accountData';

interface IStorageAccountStateProps {
  accountData: AccountData | null;
  loading: boolean;
  notification: Notification | null;
}

const initialState: IStorageAccountStateProps = {
  accountData: null,
  loading: false,
  notification: null,
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    logIn: (state, action) => {
      const { id } = action.payload;
      return { ...state, loading: false, accountData: { id }, notification: null };
    },
    loading: (state) => {
      return { ...state, loading: true, accountData: null, notification: null };
    },
    notify: (state, action) => {
      const { isSuccess, message } = action.payload;
      return { ...state, loading: false, notification: { isSuccess, message } };
    },
  },
});

export const { logIn, loading, } = stateSlice.actions;

interface IAccountStateProps {
  accountState: IStorageAccountStateProps;
}

export const selectAccountData = (state: IAccountStateProps) => state.accountState.accountData;
export const selectLoading = (state: IAccountStateProps) => state.accountState.loading;
export const selectNotification = (state: IAccountStateProps) => state.accountState.notification;

export default stateSlice.reducer;
