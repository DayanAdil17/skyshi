import TodoList from '@components/Todo/TodoList';
import { Todo } from 'src/types';

export interface TodoListWrapperProps {
  data: Todo[];
  refetch: (activity_id: string) => void;
}

export default function TodoListWrapper({
  data,
  refetch,
}: TodoListWrapperProps) {
  return (
    <>
      {data.map((todo) => (
        <div
          flex="~ col"
          align="content-center"
          // justify="between"
          p="x-8 y-4"
          m="y-4"
          className="bg-gray-100 shadow-md shadow-gray-300 rounded-xl"
        >
          <TodoList data={todo} key={todo.id} refetch={refetch} />
        </div>
      ))}
    </>
  );
}
