import { useState } from 'react';

import { ActionButton } from '../actionButton/ActionButton';
import { NotificationModal } from '../notificationModal/NotificationModal';

import { Notification } from '@/entities/Notification';
import { IPayment, IBalance } from '@/utils/utils';

interface IUserPanelProps {
  publicKey: string;
  fundAccount: (publicKey: string) => Promise<boolean>;
  balance: IBalance[] | null;
  payments: IPayment[] | null;
  setFunded: (isFunding: boolean) => void;
}

export function UserPanel({ fundAccount, balance, payments, publicKey, setFunded }: IUserPanelProps): React.ReactElement {
  const [accountExists, setAccountExists] = useState(true);
  const [notification, setNotification] = useState<Notification | null>(null);

  const listedPayments = payments?.map((tempPayment, index) => {
    return (
      <div key={`payment-${index}`} className='text-white m-3 text-center border-violet-strong bg-violet-strong bg-opacity-20 p-1 justify-center break-words'>
        <p>
          <span className='text-slate-400'>{tempPayment.type}</span>: 
          (<span className='text-yellow-400'>{tempPayment.asset_code}</span> - <span className='text-green-400'> {tempPayment.ammount}</span>)
        </p>
        <p><span className='text-slate-400'>To:</span> {tempPayment.to}</p>
        <span className='text-slate-400'> Date:</span> {tempPayment.date.split('T')[0]}
      </div>
    );
  });

  const listedBalance = balance?.map((tempBalance, index) => {
    const balance = Number(tempBalance.balance).toFixed(2);
    const asset = tempBalance.asset === 'native' ? 'Lumens (XLM)' : tempBalance.asset;
    const EMPTY_BALANCE = "0.00";
    if (accountExists && asset === 'XLM' && balance === EMPTY_BALANCE) {
      setAccountExists(false);
    }

    return (
      <p className={`balance-${index} text-3xl font-semibold text-slate-200`} key={asset}>
        {balance} {asset}
      </p>
    );
  });

  async function handleFundAccount(publicKey: string, fundAccount: (publicKey: string) => Promise<boolean>) {
    const NOTIFICATION_DELAY = 2000;

    setNotification({ isSuccess: true, message: 'Funding your account... please wait.' });
    const fundSuccess = await fundAccount(publicKey);
    if (fundSuccess) {
      setNotification({ isSuccess: true, message: 'Your account was funded succesfully!' });
    } else {
      setNotification({ isSuccess: false, message: 'Error funding your account... try again later' });
    }

    setTimeout(() => {
      setNotification(null);
      setFunded(true);
    }, NOTIFICATION_DELAY);
  }

  return (
    <>
      {notification ? <NotificationModal notification={notification}></NotificationModal> : ''}

      <div>
        <p className="mb-3 text-3xl text-slate-200">Your balance</p>
        {listedBalance}
      </div>
      <hr className=" m-5 border-violet-strong" />
      {accountExists ? (
        ''
      ) : (
        <div className="inactive-account text-center">
          <div className="flex justify-center border border-violet-strong bg-violet-strong bg-opacity-20 p-5">
            <p className="flex font-semibold text-red-500 ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </span>
              This account is currently inactive. To activate it, fund your account for the first time
            </p>
          </div>
          <ActionButton
            title="Fund Account"
            handleClick={() => handleFundAccount(publicKey, fundAccount)}
          ></ActionButton>
        </div>
      )}
      <div className='mt-3'>
        <p className="mb-3 text-3xl text-slate-200">Your Payments</p>
        {listedPayments && listedPayments?.length > 0 ? listedPayments : <p className='text-slate-400 text-xl'>No Payments found...</p>}
      </div>
    </>
  );
}
