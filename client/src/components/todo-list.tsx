import { useState } from 'react';
import { trpc } from '../utils/trpc';
import { FaTrashAlt } from "react-icons/fa";
import { TRPCClientError } from '@trpc/client';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const todos = trpc.todo.getMany.useQuery(undefined, { initialData: [] });
  const onSuccess = () => todos.refetch();
  const toggle = trpc.todo.toggle.useMutation({onSuccess});
  const create = trpc.todo.create.useMutation({onSuccess});
  const remove = trpc.todo.remove.useMutation({onSuccess});

  const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await create.mutateAsync({ text: newTodo });
    } catch (error) {
      if (error instanceof TRPCClientError) {
        alert(error.message);
      }
    }
    setNewTodo('');
  };

  return (
    <div className="todo-list">
      <h2>Todos</h2>
      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={({ target }) => setNewTodo(target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      {todos.data.map((todo) => (
        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <span
            className='todo-item-text'
            onClick={() => toggle.mutate({ id: todo.id })}>
            {todo.text}
          </span>
          <button
            onClick={() => remove.mutate({ id: todo.id })}
            className="todo-item-delete"
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
