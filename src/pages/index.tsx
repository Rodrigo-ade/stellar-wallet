import type { NextPage } from 'next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ActionButton } from '@/components/actionButton/ActionButton';
import { KeyPairModal } from '@/components/keyPairModal/KeyPairModal';
import { ConnectModal } from '@/components/connectModal/ConnectModal';
import { NotificationModal } from '@/components/notificationModal/NotificationModal';

import { getRandomKeyPair, isSecretKeyValid, isPublicKeyValid, getPublicKey } from '@/services/stellar';

import { redirectToDashboard } from '@/utils/utils';
import { logIn, selectAccount } from '@/storage/stateStorage/stateSlice';

import { getAlbedoPublicKey } from '@/services/albedo';

const Home: NextPage = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [showKeys, setShowKeys] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [isKeyValid, setIsKeyValid] = useState(true);

  const loggedPublicKey = useSelector(selectAccount);

  const dispatch = useDispatch();

  function logInUser(publicKey: string) {
    dispatch(logIn({ id: publicKey }));
  }

  function handleGenerateKeys() {
    const { publicKey, privateKey } = getRandomKeyPair();
    setPublicKey(publicKey);
    setPrivateKey(privateKey);
    setShowKeys(true);
  }

  function handleLogIn() {
    setShowConnectModal(true);
  }

  async function handleAlbedoLogIn() {
    const publicKey = await getAlbedoPublicKey();
    if (isPublicKeyValid(publicKey)) {
      logInUser(publicKey);
    }
  }

  if (loggedPublicKey) {
    return (
      <NotificationModal
        notification={{ isSuccess: true, message: 'Logged in, you will be redirected...' }}
        redirect={redirectToDashboard}
      />
    );
  } else {
    return (
      <div className="grid h-screen items-center text-center">
        <h1 className="text-6xl text-slate-400">Stellar Wallet</h1>
        <div>
          <ActionButton title="Generate new keys" handleClick={handleGenerateKeys} />
          <ActionButton title="Connect with secret key" handleClick={handleLogIn} />
          <ActionButton title="Connect with Albedo" handleClick={handleAlbedoLogIn} />
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
            logInUser={logInUser}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
};

export default Home;
