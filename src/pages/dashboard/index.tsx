import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from '@/storage/stateStorage/stateSlice';

import { NotificationModal } from '@/components/notificationModal/NotificationModal';
import { Navbar } from '@/components/navbar/Navbar';

import { redirectToIndex } from '@/utils/utils';
import { logOut } from '@/storage/stateStorage/stateSlice';

export default function Dashboard() {
  const account = useSelector(selectAccount);
  
  const dispatch = useDispatch();

  function handleDisconnect() {
    dispatch(logOut());
  }

  if (!account) {
    return (
      <NotificationModal
        notification={{ isSuccess: false, message: 'Not logged In, you will be redirected...' }}
        redirect={redirectToIndex}
      />
    );
  } else {
      return (
        <>
          <Navbar handleDisconnect={handleDisconnect} />
          <div className="h-screen px-10 pt-5">
            <div>
              <p className="mb-3 text-3xl text-slate-200">Your Stellar Public Key</p>
              <p className="break-words text-3xl font-semibold text-slate-400">{account.id}</p>
            </div>
            <hr className=" m-5 border-violet-strong" />
          </div>
        </>
      );
    }
}
