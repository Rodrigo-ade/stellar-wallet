import type { NextPage } from 'next';
import { useState } from 'react';

import { ActionButton } from '@/components/actionButton/ActionButton';
import { KeyPairModal } from '@/components/keyPairModal/KeyPairModal';
import { getRandomKeyPair } from '@/services/stellar';

const Home: NextPage = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [showKeys, setShowKeys] = useState(false);

  function handleGenerateKeys() {
    const keys = getRandomKeyPair();
    setPublicKey(keys.publicKey);
    setPrivateKey(keys.privateKey);
    setShowKeys(true);
  }

  return (
    <div className="grid h-screen items-center text-center">
      <h1 className="text-6xl text-slate-400">Stellar Wallet</h1>
      <div>
        <ActionButton title="Generate new keys" handleClick={handleGenerateKeys} />
      </div>
      {showKeys ? <KeyPairModal setShowKeys={setShowKeys} privateKey={privateKey} publicKey={publicKey} /> : ''}
    </div>
  );
};

export default Home;
