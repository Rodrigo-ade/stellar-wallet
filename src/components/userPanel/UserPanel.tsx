import { FC, useState } from 'react';

import { ActionButton } from '../actionButton/ActionButton';
import { Payments } from '../payments/Payments';
import { NotificationModal } from '../notificationModal/NotificationModal';

import { Notification } from '@/entities/Notification';
import { IPayment, IBalance } from '@/utils/utils';

interface IUserPanelProps {
  publicKey: string;
  fundAccount: (publicKey: string) => Promise<boolean>;
  balance: IBalance[] | null;
  payments: IPayment[] | null;
  setIsFunded: (isFunding: boolean) => void;
  sendPayment: (senderPrivateKey: string, receiverPublicKey: string, amount: string) => Promise<void | string>;
  createXDRTransaction: (senderPublicKey: string, receiverPublicKey: string, amount: string) => Promise<string>;
  signTransaction: (xdr: string) => Promise<{ success: boolean; message: any }>;
}

export const UserPanel: FC<IUserPanelProps> = ({
  fundAccount,
  balance,
  payments,
  publicKey,
  setIsFunded,
  sendPayment,
  createXDRTransaction,
  signTransaction,
}) => {
  const [accountExists, setAccountExists] = useState(true);
  const [notification, setNotification] = useState<Notification | null>(null);

  const listedPayments = payments?.map(({ type, asset_code, amount, to, date }, index) => {
    
    return (
      <div
        key={`payment-${index}`}
        className="payment m-3 justify-center break-words border-violet-strong bg-violet-strong bg-opacity-20 p-1 text-center text-white"
      >
        <p>
          <span className="text-slate-400">{type}</span>: (
          <span className="text-yellow-400">{asset_code ? asset_code : 'XML'}</span> -{' '}
          <span className="text-green-400"> {amount}</span>)
        </p>
        <p>
          <span className="text-slate-400">To:</span> {to}
        </p>
        <span className="text-slate-400"> Date:</span> {date.split('T')[0]}
      </div>
    );
  });

  const listedBalance = balance?.map(({balance, asset}, index) => {
    const userBalance = Number(balance).toFixed(2);
    const userAsset = asset === 'native' ? 'Lumens (XLM)' : asset;
    const EMPTY_BALANCE = '0.00';
    if (accountExists && userAsset === 'XLM' && userBalance === EMPTY_BALANCE) {
      setAccountExists(false);
    }

    return (
      <p className={`balance-${index} balance text-3xl font-semibold text-slate-200`} key={userAsset}>
        {userBalance} {userAsset}
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
      setIsFunded(true);
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

      <div>
        <p className="mb-3 text-3xl text-slate-200">Transfer</p>
        {accountExists ? (
          <Payments
            sendPayment={sendPayment}
            senderPublicKey={publicKey}
            createXDRTransaction={createXDRTransaction}
            signTransaction={signTransaction}
          />
        ) : (
          <div className="hidden-payments-message m-2 text-xl text-slate-400">
            To send asset, fund your account first...
          </div>
        )}
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
      <div className="mt-3">
        <p className="mb-3 text-3xl text-slate-200">Your Payments</p>
        {listedPayments && listedPayments?.length > 0 ? (
          listedPayments
        ) : (
          <p className="no-payments text-xl text-slate-400">No Payments found...</p>
        )}
      </div>
    </>
  );
};
