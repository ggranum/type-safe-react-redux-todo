import cx                                 from "classnames"
import React                              from "react"
import { connect }                       from "react-redux"
import { ToggleTodoAction } from "./redux/todo.actions"
import { TodoItem }                      from "./redux/todo.reducers"


const Todo = ( { todo, dispatch }: { todo: TodoItem, dispatch: any } ) => {
  return (
    <li className="todo-item" onClick={() => dispatch(new ToggleTodoAction( todo.id ).toRedux())}>
      {todo && todo.completed ? "👌" : "👋"}{" "}
      <span className={cx( "todo-item__text", todo && todo.completed && "todo-item__text--completed" )}>
        {todo.content}
      </span>
    </li>
  )
}


// const mapDispatchToProps = { toggleTodo : TodoActions.toggle.create }

export default connect( )( Todo )
