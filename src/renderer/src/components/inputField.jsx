/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../reduxToolkit/features/todoList/todoListSlice";
import PropTypes from "prop-types";

export default function InputField() {
  const [task, setTask] = useState("");
  const todoList = useSelector((state) => state.todoList.todoList);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(task));
    localStorage.setItem("todoList", JSON.stringify([...todoList,task]));
    setTask("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="todo"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Task
        </label>
        <div className="relative">
          <input
            type="text"
            id="todo"
            onChange={(e) => setTask(e.target.value)}
            className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Task..."
            minLength={1}
            maxLength={70}
            required
            value={task}
            autoComplete="off"
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
}

