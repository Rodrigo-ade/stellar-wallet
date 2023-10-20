import { useSelector } from 'react-redux';
import { selectAccount } from '@/storage/stateStorage/stateSlice';

export default function Dashboard() {
  const account = useSelector(selectAccount);

  if(account){
    return (
      <>
        <div className="h-screen px-10 pt-5">
          <div>
            <p className="mb-3 text-3xl text-slate-200">Your Stellar Public Key</p>
            <p className="break-words text-3xl font-semibold text-slate-400">{account.id}</p>
          </div>
          <hr className=" m-5 border-violet-strong" />
        </div>
      </>
    );
  }
}
