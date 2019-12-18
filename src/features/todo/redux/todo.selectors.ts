import { AppState }         from "../../../redux/reducers"
import { TodoItem }                             from "./todo.reducers"
import { VISIBILITY_FILTERS, VisibilityFilter } from "./visibility-filter.actions"

/**
 * Simple selectors. General idea here is to avoid accessing nested state fields outside of selector collections
 * such as this file.
 */
export const getTodoList = ( state: AppState ): number[] => {
  return state.todos.allIds
}

export const getTodoById = ( state: AppState, id: number ): TodoItem => {
  return state.todos.byIds[ id ]
}

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getTodos = ( state: AppState ): TodoItem[] => {
  return state.todos.allIds.map( ( id: number ) => state.todos.byIds[ id ] )
}


export const getTodosByVisibilityFilter = ( state: AppState, visibilityFilter: VisibilityFilter ) => {
  const allTodos = getTodos( state )
  switch ( visibilityFilter ) {
    case VISIBILITY_FILTERS.completed:
      return allTodos.filter( ( todo: TodoItem ) => todo.completed )
    case VISIBILITY_FILTERS.incomplete:
      return allTodos.filter( ( todo: TodoItem ) => !todo.completed )
    case VISIBILITY_FILTERS.all:
    default:
      return allTodos
  }
}
