interface IUserPanelProps {
  lummensAmmount: number;
}

export function UserPanel({ lummensAmmount }: IUserPanelProps) {
  return (
    <>
      <div>
        <p className="mb-3 text-3xl text-slate-200">Your balance</p>
        <p className="text-3xl font-semibold text-slate-200">{lummensAmmount} Lumens (XLM)</p>
      </div>
      <hr className=" m-5 border-violet-strong" />
    </>
  );
}
