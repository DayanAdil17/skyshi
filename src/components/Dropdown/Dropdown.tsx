import ButtonIcon from '@components/Button/ButtonIcon';
import DropdownMenu from '@components/Dropdown/DropdownMenu';
import ArrowSort from '@components/Icon/ArrowSort';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';

const menu = ['Terbaru', 'Terlama', 'A-Z', 'Z-A', 'Belum selesai'];

export interface DropdownProps {
  selectedMenu: string;
  onClick: (e: any) => void;
}

export default function Dropdown({ selectedMenu, onClick }: DropdownProps) {
  return (
    <div className=" text-right" data-cy="todo-sort-button">
      <Menu as="div" className="relative inline-block text-left">
        <div data-cy="todo-sort-button-icon">
          <Menu.Button
            className={`p-2 hover:bg-[#dbd9d9]`}
            border="rounded rounded-full"
          >
            <ArrowSort />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {menu.map((el, idx) => (
              <DropdownMenu
                key={idx}
                text={el}
                selectedMenu={selectedMenu}
                onClick={onClick}
              />
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
