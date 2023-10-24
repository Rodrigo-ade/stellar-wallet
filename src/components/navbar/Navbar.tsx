import { ActionButton } from '../actionButton/ActionButton';

interface INavbarProps {
  handleDisconnect: () => void;
}

export function Navbar({ handleDisconnect }: INavbarProps): React.ReactElement {
  return (
    <nav className="flex h-40 justify-between bg-purple-slight-dark p-10 text-slate-400">
      <div>
        <p className="text-xl font-medium">
          Stellar <span className="rounded-md bg-violet-strong p-1 text-xs text-white">Account Viewer</span>
        </p>
      </div>
      <div>
        <ActionButton title="Disconnect" handleClick={() => handleDisconnect()} />
      </div>
    </nav>
  );
}
