import { Menu } from '@headlessui/react';
import { IoCheckmarkOutline } from 'react-icons/io5';

export interface DropdownMenu {
  text: string;
  selectedMenu: string;
  onClick: (e: any) => void;
}
export default function DropdownMenu({
  text,
  selectedMenu,
  onClick,
}: DropdownMenu) {
  return (
    <div className="px-1 py-1 " data-cy="dropdown-priority-button">
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={onClick}
            value={text}
            className={`text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm justify-between`}
          >
            <div>{text}</div>
            {selectedMenu === text || active ? (
              <IoCheckmarkOutline className="text-gray-500" />
            ) : (
              ''
            )}
          </button>
        )}
      </Menu.Item>
    </div>
  );
}
