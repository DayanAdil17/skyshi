import { PriorityEnum, Todo } from '@/types';
import { addTodo } from '@api/todo';
import Button from '@components/Button';
import ButtonIcon from '@components/Button/ButtonIcon';
import AlertSuccess from '@components/Icon/AlertSuccess';
import Close from '@components/Icon/Close';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export interface ModalTambahProps {
  closeModal: () => void;
  activity_group_id: string;
  refetch: (id: string) => Promise<void>;
}

export default function ModalTambah({
  closeModal,
  activity_group_id,
  refetch,
}: ModalTambahProps) {
  const [todo, setTodo] = useState<Todo>({
    activity_group_id: +activity_group_id,
  } as Todo);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setTodo({
      ...todo,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const newTodo = await addTodo(todo);

    if (newTodo) {
      toast.success('Berhasil menambahkan todo', {
        icon: AlertSuccess,
      });

      refetch(activity_group_id);
      closeModal();
      return;
    }

    toast.error('Gagal menambahkan todo', {
      icon: AlertSuccess,
    });
    return;
  };

  return (
    <div divide="y gray-300" data-cy="todo-modal-add">
      <div p="x-[30px] y-[15px]">
        <div
          flex="~"
          justify="between"
          align="items-center"
          data-cy="modal-add-title"
        >
          <span font="bold">Tambah List Item</span>

          <ButtonIcon icon={<Close />} onClick={closeModal} type={'small'} />
        </div>
      </div>

      <div p="x-[30px] y-[15px]" data-cy="modal-add-component">
        <div className="mb-6" data-cy="modal-add-list-item">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            text="uppercase xs"
            font="bold"
          >
            Nama List Item
          </label>
          <div data-cy="modal-add-name-input">
            <input
              type="text"
              id="title"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tambahkan nama list item"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="" data-cy="modal-add-priority-dropdown">
          <label
            htmlFor="priority"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            text="uppercase xs"
            font="bold"
          >
            Priority
          </label>

          <div data-cy="todo-item-checkbox">
            <select
              id="priority"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              w="[205px]"
              placeholder="Pilih priority"
              required
              onChange={handleChange}
            >
              <option hidden>Pilih priority</option>

              {Object.keys(PriorityEnum).map((priority) => {
                return (
                  <option
                    key={priority}
                    style={{
                      fontSize: '16px',
                      lineHeight: '24px',
                    }}
                    value={PriorityEnum[priority as keyof typeof PriorityEnum]}
                    justify="between"
                    space="x-3"
                    w="full"
                  >
                    {priority}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="justify-end flex" p="x-[30px] y-[15px]">
        <div className="" data-cy="modal-add-save-button">
          <Button text="Simpan" onClick={handleSubmit} />
        </div>

        {/* <div className="mt-4">
          <Button text="Hapus" type="approve" onClick={handleDelete} />
        </div> */}
      </div>

      {/* <Dropdown /> */}
    </div>
  );
}
