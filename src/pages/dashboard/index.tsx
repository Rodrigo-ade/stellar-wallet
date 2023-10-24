import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from '@/storage/stateStorage/stateSlice';

import { NotificationModal } from '@/components/notificationModal/NotificationModal';
import { Navbar } from '@/components/navbar/Navbar';
import { Loading } from '@/components/loading/Loading';
import { UserPanel } from '@/components/userPanel/UserPanel';

import { redirectToIndex } from '@/utils/utils';
import { logOut } from '@/storage/stateStorage/stateSlice';

import { IBalance, getAccountBalance, fundAccount } from '@/services/stellar';

export default function Dashboard(): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const account = useSelector(selectAccount);
  const [balance, setBalance] = useState<IBalance[] | null>(null);

  const [funded, setFunded] = useState(false);

  const dispatch = useDispatch();

  function handleDisconnect() {
    dispatch(logOut());
  }

  useEffect(() => {
    async function handleGetBalance(publicKey: string) {
      setLoading(true);
      const balance = await getAccountBalance(publicKey);
      setBalance(balance);
      setLoading(false);
    }

    if (account != null) {
      handleGetBalance(account.id);
    }
  }, [account, funded]);

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
          {loading ? (
            <div className="p-14">
              <Loading title="Loading your account information..." />
            </div>
          ) : (
            <UserPanel publicKey={account.id} balance={balance} fundAccount={fundAccount} setFunded={setFunded} />
          )}
        </div>
      </>
    );
  }
}
