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
    const result = await sendPayment(senderPrivateKey, receiverPublicKey, amount);

    if (result === true) {
      setPaymentNotification({ isSuccess: true, message: 'Success!' });
    } else {
      setPaymentNotification({ isSuccess: false, message: result });
    }
  }

  return (
    <div className="payments grid text-center">
      <div>
        <input
          value={senderPrivateKey}
          onChange={(e) => setSenderPrivateKey(e.target.value)}
          className="sender-private-key mt-2 w-2/3 bg-transparent text-sm text-white"
          placeholder="Your private key"
        ></input>
        <input
          value={receiverPublicKey}
          onChange={(e) => setReceiverPublicKey(e.target.value)}
          className="receiver-public-key mt-2 w-2/3 bg-transparent text-sm text-white"
          placeholder="Receiver public key"
        ></input>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="amount mt-2 w-2/3 bg-transparent text-sm text-white"
          type="number"
          placeholder="Amount to send"
        ></input>
      </div>
      <div>
        {paymentNotification && (
          <p
            className={`notification mt-2 text-xl font-bold ${
              paymentNotification.isSuccess ? 'text-green-500' : 'text-red-500'
            }`}
          >
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
