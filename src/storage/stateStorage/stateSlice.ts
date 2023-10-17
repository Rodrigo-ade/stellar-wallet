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
  },
});

interface IAccountStateProps {
  accountState: IStorageAccountStateProps;
}
export default stateSlice.reducer;
