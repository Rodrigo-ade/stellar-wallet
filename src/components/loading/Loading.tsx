interface ILoadingProps {
  title?: string;
}

export function Loading({ title }: ILoadingProps): React.ReactElement {
  return (
    <>
      <div className="m-5 grid justify-center text-center">
        <div className="h-28 w-28 animate-spin rounded-full border-8 border-solid border-purple-500 border-t-transparent"></div>
      </div>
      <p className="mt-2 text-center text-2xl font-semibold text-slate-300">{title ? title : 'Loading...'}</p>
    </>
  );
}
