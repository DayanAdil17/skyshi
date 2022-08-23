import { Todo, PriorityEnum } from '@/types';
import { deleteTodo, updateTodo } from '@api/todo';
import ButtonIcon from '@components/Button/ButtonIcon';
import AlertSuccess from '@components/Icon/AlertSuccess';
import Pen from '@components/Icon/Pen';
import Trash from '@components/Icon/Trash';
import ModalDelete from '@components/Modal/ModalDelete';
import Modal from '@components/Modal/ModalWrapper';
import TodoPriority from '@components/Todo/TodoPriority';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

export interface TodoListProps {
  // handleEditTitle: () => void;
  // handleDelete: () => void;
  data: Todo;
  refetch: (activity_id: string) => void;
}

export const TodoListConfig = Object.keys(PriorityEnum);

export default function TodoList({
  data,
  refetch,
}: // handleEditTitle,
// handleDelete,
TodoListProps) {
  const [todo, setTodo] = useState<Todo>(data);
  const [isOpen, setIsOpen] = useState(false);
  const [isInput, setIsInput] = useState(false);

  const toggleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleEditTitle = () => {};
  const handleDelete = async () => {
    const response = await deleteTodo(todo.id);

    if (response.status === 200) {
      refetch(todo.activity_group_id.toString());
      setIsOpen(false);
      toast.error('Activity berhasil dihapus', {
        icon: AlertSuccess,
      });
    } else {
      setIsOpen(false);
      toast.error('Gagal menghapus activity', {
        icon: AlertSuccess,
      });
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox') {
      const updatedTodo = await updateTodo(todo.id, {
        is_active: !todo.is_active,
      });

      if (updatedTodo) setTodo({ ...todo, ...updatedTodo });
    }
  };

  return (
    <>
      <div flex="~" justify="between" data-cy="todo-item">
        <div
          flex="~"
          align="items-center"
          justify="between"
          space="x-4"
          data-cy="todo-item-checkbox"
        >
          <input
            type="checkbox"
            id="is_active"
            checked={!todo.is_active}
            h="4"
            w="4"
            onChange={handleChange}
          />
          <TodoPriority type={todo.priority} />
          <span
            font="semibold"
            text={`${todo.is_active ? 'current' : 'line-through gray-500'}`}
          >
            {todo.title}
          </span>
          <ButtonIcon onClick={handleEditTitle} icon={<Pen />} type="small" />
        </div>

        <ButtonIcon onClick={toggleModal} icon={<Trash />} type="small" />
      </div>

      <Modal isOpen={isOpen} closeModal={toggleModal}>
        <ModalDelete
          title={data.title}
          closeModal={toggleModal}
          handleDelete={handleDelete}
          type="list"
        />
      </Modal>
    </>
  );
}
