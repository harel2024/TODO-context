import React from "react";
import "./TodoList.css";
import TodoForm from "../TodoForm/TodoForm";
import BasicSpinner from "../BasicSpinner/BasicSpinner";

import TodoItem from "../TodoItem/TodoItem";
import { useGlobalUser } from "../../context/Context";



export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}


const TodoList: React.FC = () => {
  const { isLoading, todos } = useGlobalUser();




  return (
    <div className="todo-list">
      <h1>To Do List</h1>
      <TodoForm/>
      <ul>
        {isLoading ? (
          <BasicSpinner />
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
         
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
