import { combineReducers }  from "redux"
import { todos, TodoState }                        from "../features/todo/redux/todo.reducers"
import { visibilityFilter, VisibilityFilterState } from "../features/todo/redux/visibility-filter.reducers"


export type AppState = {
  todos: TodoState,
  visibilityFilter: VisibilityFilterState
}

export const rootReducer = combineReducers( { todos, visibilityFilter } )
