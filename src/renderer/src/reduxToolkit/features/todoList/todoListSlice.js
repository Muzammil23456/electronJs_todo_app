/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
todoList: [],
};

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },

    addTodo: (state, action) => {
      state.todoList?.push(action.payload);
    },

    removeTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        (_, index) => index !== action.payload,
      );
    },

    editTodo: (state, action) => {
      const { index, task } = action.payload;
      state.todoList[index] = task;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeTodo, setTodoList, addTodo,editTodo } =
  todoListSlice.actions;

export default todoListSlice.reducer;
