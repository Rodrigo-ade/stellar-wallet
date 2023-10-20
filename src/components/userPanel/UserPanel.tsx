import { ActionButton } from '../actionButton/ActionButton';

interface IUserPanelProps {
  lummensAmmount: number;
  fundAccount: () => void;
}

export function UserPanel({ lummensAmmount, fundAccount }: IUserPanelProps) {
  return (
    <>
      <div>
        <p className="mb-3 text-3xl text-slate-200">Your balance</p>
        <p className="text-3xl font-semibold text-slate-200">{lummensAmmount} Lumens (XLM)</p>
      </div>
      <hr className=" m-5 border-violet-strong" />
      <div className="text-center">
        <div className="flex justify-center border border-violet-strong bg-violet-strong bg-opacity-20 p-5">
          <p className="flex font-semibold text-red-500 ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </span>
            This account is currently inactive. To activate it, fund your account for the first time
          </p>
        </div>
        <ActionButton title="Fund Account" handleClick={() => fundAccount()}></ActionButton>
      </div>
    </>
  );
}