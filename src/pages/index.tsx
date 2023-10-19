import type { NextPage } from 'next';
import { useState } from 'react';

import { ActionButton } from '@/components/actionButton/ActionButton';
import { KeyPairModal } from '@/components/keyPairModal/KeyPairModal';
import { ConnectModal } from '@/components/connectModal/ConnectModal';

import { getRandomKeyPair, isSecretKeyValid, getPublicKey } from '@/services/stellar';

import { redirectToDashboard } from '@/utils/utils';

const Home: NextPage = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [showKeys, setShowKeys] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [isKeyValid, setIsKeyValid] = useState(true);

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
        <ActionButton title="Generate new keys" handleClick={() => handleGenerateKeys()} />
        <ActionButton title="Connect with secret key" handleClick={() => handleLogIn()} />
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
          isKeyValid={isKeyValid}
          setIsKeyValid={setIsKeyValid}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
          isSecretKeyValid={isSecretKeyValid}
          getPublicKey={getPublicKey}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Home;
