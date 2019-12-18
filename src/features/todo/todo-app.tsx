import React             from "react"
import AddTodo           from "./add-todo"
import "./styles.scss"
import TodoList          from "./todo-list"
import VisibilityFilters from "./visibility-filters"

export default function TodoApp() {
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodo/>
      <TodoList/>
      <VisibilityFilters/>
    </div>
  )
}
