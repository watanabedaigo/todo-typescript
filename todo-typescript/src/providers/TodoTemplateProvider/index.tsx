import React, { useState, useEffect, createContext } from 'react';
import { TodoType } from 'types/TodoType';

// 型エイリアス
type ContextType = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  todos: TodoType[];
};

// createContext
export const TodosContext = createContext<ContextType>({} as ContextType);

const CountStateContext = createContext<ContextType>({} as ContextType);
const CountDispatchContext = createContext<ContextType>({} as ContextType);

const TodoTemplateProvider: React.FC<any> = React.memo(({ children }) => {
  console.log('TodoTemplateProvider レンダリング');

  // useState
  // todoを扱うstate。配列で、中身は型エイリアスTodoを型に持つオブジェクト
  const [todos, setTodos] = useState<TodoType[]>([]);

  // useContext Provider用value
  const value = {
    todos,
    setTodos,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
});

export default TodoTemplateProvider;
