import React, { useState, useReducer } from "react";
import Todo from "./Todo";

export const ACTIONS = {
  ADDTODO: "add-to-do",
  TOGGLE_TODO: "toggle_to_do",
  DELELTE_TODO: "delete_todo"
};

function App() {
  function reducer(todos, action) {
    switch (action.type) {
      case ACTIONS.ADDTODO:
        return [...todos, newTodo(action.payload.name)];

      case ACTIONS.TOGGLE_TODO:
        return todos.map(todo => {
          if (todo.id === action.payload.id) {
            return { ...todo, complete: !todo.complete };
          }
          return todo;
        });

      case ACTIONS.DELELTE_TODO:
        return todos.filter(todo => todo.id !== action.payload.id);

      default:
        return todos;
    }
  }

  function newTodo(name) {
    return { id: Date.now(), name: name, complete: false };
  }

  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADDTODO, payload: { name: name } });
    setName("");
  }
  // console.log(todos);
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </form>
      {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
      })}
    </div>
  );
}

export default App;
