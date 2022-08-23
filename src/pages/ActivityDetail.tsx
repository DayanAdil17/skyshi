import Button from '@components/Button';
import Layout from '@components/Layout/Layout';
import { AiOutlinePlus } from 'react-icons/ai';
import { HiOutlinePencil } from 'react-icons/hi';
import React, { useEffect, useState } from 'react';
import { axios } from '@config/axios';
import { useParams } from 'react-router-dom';
import TodoListWrapper from '@components/Todo/TodoListWrapper';
import { Activity, Todo, Response } from 'src/types';
import Modal from '@components/Modal/ModalWrapper';
import ModalTambah from '@components/Modal/ModalTambah';
import ButtonIcon from '@components/Button/ButtonIcon';
import Back from '@components/Icon/Back';
import Pen from '@components/Icon/Pen';
import Dropdown from '@components/Dropdown/Dropdown';

const menu = ['Terbaru', 'Terlama', 'A-Z', 'Z-A', 'Belum selesai'];
var sorter = [];
var render = 0;

export default function ActivityDetail() {
  const [activity, setActivity] = useState<Activity>({
    title: '',
    email: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputActivity, setInputActivity] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(menu[0]);

  const { id } = useParams();

  useEffect(() => {
    fetchActivity(id!);
    fetchTodo(id!);
  }, []);

  const fetchActivity = async (id: string) => {
    const { data } = await axios.get<Response<Activity>>(
      `activity-groups/${id}`
    );

    setActivity({ ...activity, ...data });
  };

  const fetchTodo = async (id: string) => {
    const {
      data: { data },
    } = await axios.get<Response<Todo[]>>(`todo-items?activity_group_id=${id}`);

    setTodos(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivity({
      ...activity,
      [e.target.id]: e.target.value,
    });
  };

  const handleToggleActivityInput = async () => {
    if (inputActivity) {
      const {
        data: { data },
      } = await axios.patch<Response<Activity>>(
        `activity-groups/${activity.id}`,
        {
          title: activity.title,
        }
      );

      setActivity({
        ...activity,
        ...data,
      });
    }

    setInputActivity(!inputActivity);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLButtonElement>) => {
    setSelectedMenu(menu[menu.indexOf(e.target.value)]);
    if (e?.target.value == 'Terbaru') {
      setTodos(todos.sort((a, b) => b.id - a.id));
    } else if (e?.target.value == 'Terlama') {
      setTodos(todos.sort((a, b) => a.id - b.id));
    } else if (e?.target.value == 'A-Z') {
      setTodos(todos.sort((a, b) => a.title.localeCompare(b.title)));
    } else if (e?.target.value == 'Z-A') {
      setTodos(todos.sort((a, b) => b.title.localeCompare(a.title)));
    } else if (e.target.value == 'Belum selesai') {
      setTodos(
        todos.sort((a, b) =>
          b.is_active.toString().localeCompare(a.is_active.toString())
        )
      );
    }
  };
  if (render == 0) {
    sorter = todos;
    render = 1;
  }
  const sortList = () => {
    if (selectedMenu == 'Terbaru') {
      setTodos(
        todos.sort((a, b) => a.created_at.getTime() - b.created_at.getTime())
      );
    } else if (selectedMenu == 'Terlama') {
      setTodos(
        todos.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      );
    }
  };

  return (
    <Layout>
      <div flex="~" justify="between" p="y-15">
        <div
          flex="~"
          align="items-center content-center"
          justify="between"
          space="x-2"
        >
          <div data-cy="todo-back-button">
            <a href="/">
              <ButtonIcon icon={<Back />} type="small" onClick={() => ''} />
            </a>
          </div>

          <div h="10" align="content-center" data-cy="todo-title-edit">
            {inputActivity ? (
              <input
                h="10"
                w="max-60"
                font="bold"
                text="size-[36px]"
                border="~ gray-500 rounded-lg active:gray-700"
                required
                value={activity.title}
                id="title"
                p="x-3"
                onChange={handleChange}
              />
            ) : (
              <span font="bold" text="size-[36px] truncate" w="min-content">
                {activity.title}
              </span>
            )}
          </div>

          <div data-cy="todo-add-button">
            <ButtonIcon
              onClick={handleToggleActivityInput}
              icon={<Pen />}
              type="small"
            />
          </div>
        </div>

        <div flex="~" align="items-center" justify="between" space="x-4">
          {/* <ButtonIcon icon={<ArrowSort />} type="small" onClick={() => ''} /> */}
          <div data-cy="todo-sort-button">
            <Dropdown
              selectedMenu={selectedMenu}
              onClick={handleDropdownChange}
            />
          </div>

          <Button
            text="Tambah"
            icon={<AiOutlinePlus />}
            onClick={toggleModal}
          />
        </div>
      </div>

      {todos.length <= 0 ? (
        <div flex="~" align="items-center" justify="center">
          <img src="/todo-empty-state.png" />
        </div>
      ) : (
        <TodoListWrapper refetch={fetchTodo} data={todos} />
      )}

      <Modal isOpen={isOpen} closeModal={toggleModal}>
        <ModalTambah
          // title={title}
          activity_group_id={id!}
          closeModal={toggleModal}
          refetch={() => fetchTodo(id!)}
        />
      </Modal>
    </Layout>
  );
}
