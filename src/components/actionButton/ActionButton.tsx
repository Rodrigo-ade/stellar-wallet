import { FC } from 'react';

interface IActionButtonProps {
  title: string;
  handleClick: () => void;
}

export const ActionButton: FC<IActionButtonProps> = ({ title, handleClick }) => {
  return (
    <button
      className={`action-button m-2 rounded border-2 border-solid border-gray-900 bg-transparent px-6 py-3 font-bold text-gray-300 hover:border-gray-600`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
