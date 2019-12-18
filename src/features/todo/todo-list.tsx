import React                          from "react"
import { connect }                    from "react-redux"
import { AppState }                   from "../../redux/reducers"
import { TodoItem }                   from "./redux/todo.reducers"
import { getTodosByVisibilityFilter } from "./redux/todo.selectors"
import Todo                           from "./todo"

const TodoList = ( { todos }: { todos: TodoItem[] } ) => {
  return (
    <ul className="todo-list">
      {todos && todos.length
       ? todos.map( ( todo, index ) => {
          return <Todo key={`todo-${todo.id}`} todo={todo}/>
        } )
       : "No todos, yay!"}
    </ul>
  )
}


const mapStateToProps = ( state: AppState ) => {
  return { todos : getTodosByVisibilityFilter( state, state.visibilityFilter.filter ) }
}

export default connect( mapStateToProps )( TodoList )
