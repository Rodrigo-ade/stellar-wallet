export interface IActionButtonProps {
  title: string;
  handleClick: () => void;
  cyAttribute?: string;
}

export function ActionButton({ title, handleClick, cyAttribute }: IActionButtonProps) {
  return (
    <button
      data-cy={ cyAttribute ? cyAttribute : '' }
      className="m-2 rounded border-2 border-solid border-gray-900 bg-transparent px-6 py-3 font-bold text-gray-300 hover:border-gray-600"
      onClick={() => {
        handleClick();
      }}
    >
      {title}
    </button>
  );
}
