/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTodo,
  setTodoList,
  editTodo,
} from "../reduxToolkit/features/todoList/todoListSlice";

export default function TodoList() {
  const {todoList} = useSelector((state) => state.todoList) ;
  const [edit, setEdit] = useState("");
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const data = localStorage.getItem("todoList") ;
    if (!data) return;
    dispatch(setTodoList(JSON.parse(data)));
  }, []);

  const editItem = (item) => {
    setTask(item);
    setEdit(item);
  };

  const deleteItem = (item) => {
    dispatch(removeTodo(item));
    localStorage.setItem(
      "todoList",
      JSON.stringify(todoList.filter((_, el) => el !== item)),
    );
  };
  return (
    <>
      <div className="w-full h-full overflow-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <div>
          <ul className="my-4 space-y-3">
            {todoList?.length === 0 ? (
              <div className="text-center">No task found</div>
            ) : (
              todoList?.map((item, index) => (
                <li key={index}>
                  <div className="flex  p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <div className="flex-1 gap-2 ms-3 whitespace-nowrap flex justify-between ">
                      {edit === item ? (
                        <input
                          type="text"
                          id="todo"
                          onChange={(e) => setTask(e.target.value)}
                          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Task..."
                          required
                          minLength={1}
                          maxLength={70}
                          value={task}
                          autoComplete="off"
                        />
                      ) : (
                        item
                      )}

                      <div className="flex gap-3">
                        {!(edit === item) ? (
                          <>
                            <button
                              onClick={() => editItem(item)}
                              className="text-blue-500"
                            >
                              <IconEdit />
                            </button>
                            <button
                              onClick={() => deleteItem(index)}
                              className="text-red-500"
                            >
                              <IconTrash />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => setEdit("")}
                              className="text-red-500"
                            >
                              <IconX />
                            </button>
                            <button
                              onClick={() => {
                                dispatch(editTodo({ index, task }));
                                localStorage.setItem(
                                  "todoList",
                                  JSON.stringify([
                                    ...todoList.slice(0, index),
                                    task,
                                    ...todoList.slice(index + 1),
                                  ]),
                                );
                                setEdit("");
                              }}
                              className="text-green-500"
                            >
                              <IconCheck />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
