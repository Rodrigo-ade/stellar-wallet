import { useState } from 'react';
import { ActionButton } from '../actionButton/ActionButton';

export interface IKeyPairModalProps {
  setShowKeys: (show: boolean) => void;
  privateKey: string;
  setPrivateKey: (privateKey: string) => void;
  publicKey: string;
  setPublicKey: (publicKey: string) => void;
}

export function KeyPairModal({
  setShowKeys,
  privateKey,
  setPrivateKey,
  publicKey,
  setPublicKey,
}: IKeyPairModalProps): React.ReactElement {
  const [copyKeysButtonText, setCopyKeysButtonText] = useState<'Copy Keys' | 'Copied!'>('Copy Keys');

  function handleCopyKeys() {
    const BUTTON_TEXT_DELAY = 3000;
    navigator.clipboard.writeText(`Public Key: ${publicKey} Private Key: ${privateKey}`).then(() => {
      setCopyKeysButtonText('Copied!');
      setTimeout(() => {
        setCopyKeysButtonText('Copy Keys');
      }, BUTTON_TEXT_DELAY);
    });
  }

  function handleCloseKeyPairModal() {
    setShowKeys(false);
    setPrivateKey('');
    setPublicKey('');
  }

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-purple-dark bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-5 text-center sm:items-center sm:p-0">
          <div className="key-modal relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-purple-highlight px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-red-500" id="modal-title">
                    ATTENTION: Secret key wallets are not safe
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-red-400">- Pasting your secret key makes you vulnerable to accidents.</p>
                    <p className="text-sm text-red-400">
                      - It is safer to create an account using methods that do not share your secret key with websites.
                    </p>
                    <div className="pt-2 text-left">
                      <p className="text-purple-200">Public Key:</p>
                      <code className="public-key break-all text-purple-500">{publicKey}</code>
                      <p className="mt-5 text-purple-200">Private Key:</p>
                      <code className="private-key break-all text-purple-500">{privateKey}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="justify-between bg-purple-highlight	px-4 py-3 sm:flex sm:px-6">
              <ActionButton title={copyKeysButtonText} handleClick={handleCopyKeys} />
              <ActionButton title="Close" handleClick={handleCloseKeyPairModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
