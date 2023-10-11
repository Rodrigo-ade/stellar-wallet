import type { NextPage } from 'next';
import { useState } from 'react';

import { ActionButton } from '@/components/actionButton/ActionButton';
import { KeyPairModal } from '@/components/keyPairModal/KeyPairModal';
import { ConnectModal } from '@/components/connectModal/ConnectModal';

import { getRandomKeyPair, isValidSecretKey, getPublicKey } from '@/services/stellar';

import { redirectToDashboard } from '@/utils/utils';

const Home: NextPage = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [showKeys, setShowKeys] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [isValidKey, setIsValidKey] = useState(true);

  function handleGenerateKeys() {
    const { publicKey, privateKey } = getRandomKeyPair();
    setPublicKey(publicKey);
    setPrivateKey(privateKey);
    setShowKeys(true);
  }

  function handleLogIn() {
    setShowConnectModal(true);
  }

  return (
    <div className="grid h-screen items-center text-center">
      <h1 className="text-6xl text-slate-400">Stellar Wallet</h1>
      <div>
        <ActionButton title="Generate new keys" handleClick={() => handleGenerateKeys()} cyAttribute="keys-button" />
        <ActionButton title="Connect with secret key" handleClick={() => handleLogIn()} cyAttribute="connect-button" />
      </div>
      {showKeys ? (
        <KeyPairModal
          setShowKeys={setShowKeys}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
          setPublicKey={setPublicKey}
          publicKey={publicKey}
        />
      ) : (
        ''
      )}
      {showConnectModal ? (
        <ConnectModal
          setShowConnectModal={setShowConnectModal}
          isValidKey={isValidKey}
          setIsValidKey={setIsValidKey}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
          isValidSecretKey={isValidSecretKey}
          getPublicKey={getPublicKey}
          redirectToDashboard={redirectToDashboard}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Home;
