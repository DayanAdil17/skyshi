import { axios } from '@config/axios';
import { PriorityEnum, Response, Todo } from 'src/types';

const TODO_EP = 'todo-items';

export const findAll = async () => {
  return;
};

export const findTodo = async (id: string) => {
  const {
    data: { data: todo },
  } = await axios.get<Response<Todo>>(`${TODO_EP}/${id}`);

  return todo;
};

export const updateTodo = async (
  id: number,
  data: { title?: string; priority?: string; is_active?: boolean }
) => {
  const {
    data: { data: todo },
  } = await axios.patch<Response<Todo>>(`${TODO_EP}/${id}`, data);

  return todo;
};

export const deleteTodo = async (id: number) => {
  const response = await axios.delete<Response<{}>>(`${TODO_EP}/${id}`);

  return response;
};

export const addTodo = async (data: {
  title: string;
  priority: PriorityEnum;
}) => {
  const { data: todo } = await axios.post<Response<Todo>>(`${TODO_EP}`, data);

  return todo;
};
