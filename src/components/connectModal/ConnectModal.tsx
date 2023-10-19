import { ActionButton } from '../actionButton/ActionButton';

interface IConnectModalProps {
  setShowConnectModal: (show: boolean) => void;
  isKeyValid: boolean;
  setIsKeyValid: (isValid: boolean) => void;
  privateKey: string;
  setPrivateKey: (privateKey: string) => void;
  isSecretKeyValid: (privateKey: string) => boolean;
  getPublicKey: (privateKey: string) => string;
  redirectToDashboard: (publicKey: string) => void;
}

export function ConnectModal({
  setShowConnectModal,
  isKeyValid,
  setIsKeyValid,
  privateKey,
  setPrivateKey,
  isSecretKeyValid,
  getPublicKey,
  redirectToDashboard,
}: IConnectModalProps) {
  function handleConnect() {
    if (!isSecretKeyValid(privateKey)) {
      setIsKeyValid(false);
      return;
    }

    const publicKey = getPublicKey(privateKey);
    redirectToDashboard(publicKey);
  }

  function handleCloseConnectModal() {
    setShowConnectModal(false);
    setIsKeyValid(true);
  }

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-purple-dark bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-5 text-center sm:items-center sm:p-0">
          <div className="connect-modal relative transform overflow-hidden rounded-lg shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-purple-highlight px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h3 className="text-2xl text-slate-200">Connect with a secret key</h3>
            </div>
            <form className="bg-purple-highlight p-2">
              <div className="mb-4">
                <input
                  className="key-input w-full rounded bg-purple-highlight text-sm text-purple-500 shadow"
                  type="text"
                  placeholder="Private Key"
                  value={privateKey}
                  onChange={(e) => {
                    setPrivateKey(e.target.value);
                  }}
                />
                {!isKeyValid ? <p className="key-error mt-2 text-xl text-red-500">Invalid secret key</p> : ''}
              </div>
            </form>
            <div className="justify-between bg-purple-highlight	px-4 py-3 sm:flex sm:px-6">
              <ActionButton title="Connect" handleClick={() => handleConnect()} />
              <ActionButton title="Close" handleClick={() => handleCloseConnectModal()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
