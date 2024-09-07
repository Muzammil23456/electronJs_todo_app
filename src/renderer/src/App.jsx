/* eslint-disable no-unused-vars */
import InputField from "./components/inputField";
import TodoList from "./components/todoList";
import { useState } from "react";
function App() {
  return (
    <>
      <div className="container px-4 mx-auto flex gap-3 flex-col text-center">
        <h1 className="  text-3xl font-bold mt-5">TodoList:</h1>
        <div>
          <InputField />
        </div>
        <div className="h-[460px]">
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
