import { FC, useState } from 'react';

import { ActionButton } from '../actionButton/ActionButton';
import { Notification } from '@/entities/Notification';

interface IPaymentsProps {
  senderPublicKey: string;
  sendPayment: (senderPrivateKey: string, receiverPublicKey: string, amount: string) => Promise<void | string>;
  createXDRTransaction: (senderPublicKey: string, receiverPublicKey: string, amount: string) => Promise<string>;
  signTransaction: (xdr: string) => Promise<string>;
}

export const Payments: FC<IPaymentsProps> = ({
  sendPayment,
  senderPublicKey,
  createXDRTransaction,
  signTransaction,
}) => {
  const [amount, setAmount] = useState('');
  const [senderPrivateKey, setSenderPrivateKey] = useState('');
  const [receiverPublicKey, setReceiverPublicKey] = useState('');
  const [paymentNotification, setPaymentNotification] = useState<Notification>();

  function clearPaymentFields() {
    setSenderPrivateKey('');
    setReceiverPublicKey('');
    setAmount('')
  };

  async function handlePayment() {
    setPaymentNotification({ isSuccess: true, message: 'Loading...' });
    const result = await sendPayment(senderPrivateKey, receiverPublicKey, amount);

    if (result) {
      setPaymentNotification({ isSuccess: false, message: result });
    } else {
      setPaymentNotification({ isSuccess: true, message: 'Success!' });
      clearPaymentFields();
    }
  }

  async function handleAlbedoPayment() {
    setPaymentNotification({ isSuccess: true, message: 'Loading...' });
    const xdr = await createXDRTransaction(senderPublicKey, receiverPublicKey, amount);
    const signed_envelope_xdr = await signTransaction(xdr);

    if (signed_envelope_xdr) {
      setPaymentNotification({ isSuccess: true, message: 'Success!' });
      clearPaymentFields();
    } else {
      setPaymentNotification({ isSuccess: false, message: 'Error' });
    }

  }

  return (
    <div className="payments grid text-center">
      <div>
        <input
          value={senderPrivateKey}
          onChange={(e) => setSenderPrivateKey(e.target.value)}
          className="sender-private-key mt-2 w-2/3 bg-transparent text-sm text-white"
          placeholder="Your private key (If using Albedo, do not complete this field)"
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
          <>
            <ActionButton title="Send" handleClick={handlePayment}></ActionButton>
            <ActionButton title="Send with Albedo" handleClick={handleAlbedoPayment}></ActionButton>
          </>
        )}
      </div>
    </div>
  );
};
