import { useState } from 'react';

import { ActionButton } from '../actionButton/ActionButton';
import { Notification } from '@/entities/Notification';

interface IPaymentsProps {
  sendPayment: (senderPrivateKey: string, receiverPublicKey: string, amount: string) => Promise<boolean | string>;
}

export function Payments({ sendPayment }: IPaymentsProps): React.ReactElement {
  const [amount, setAmount] = useState('');
  const [senderPrivateKey, setSenderPrivateKey] = useState('');
  const [receiverPublicKey, setReceiverPublicKey] = useState('');
  const [paymentNotification, setPaymentNotification] = useState<Notification>();

  async function handlePayment() {
    setPaymentNotification({ isSuccess: true, message: 'Loading...' });
  }

  return (
    <div className="grid text-center">
      <div>
        <input
          value={senderPrivateKey}
          onChange={(e) => setSenderPrivateKey(e.target.value)}
          className="mt-2 w-2/3 bg-transparent text-sm text-white"
          placeholder="Your private key"
        ></input>
        <input
          value={receiverPublicKey}
          onChange={(e) => setReceiverPublicKey(e.target.value)}
          className="mt-2 w-2/3 bg-transparent text-sm text-white"
          placeholder="Receiver public key"
        ></input>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 w-2/3 bg-transparent text-sm text-white"
          type="number"
          placeholder="Amount to send"
        ></input>
      </div>
      <div>
        {paymentNotification && (
          <p className={`mt-2 text-xl font-bold ${paymentNotification.isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {paymentNotification.message}
          </p>
        )}
        {paymentNotification && paymentNotification.message === 'Loading...' ? (
          ''
        ) : (
          <ActionButton title="Send" handleClick={handlePayment}></ActionButton>
        )}
      </div>
    </div>
  );
}
