import produce                             from "immer"
import { ReduxActionEvent }                from "../../../redux/_core/core"
import { ReducerSet }                      from "../../../redux/_core/reducer-set"
import { ObjMap }                          from "../../../util/obj-map"
import { AddTodoAction, ToggleTodoAction } from "./todo.actions"

export type TodoState = {
  readonly byIds: ObjMap<TodoItem>,
  readonly allIds: number[]
}

export interface TodoItem {
  id: number
  content: string
  completed: boolean
}


const initialState: TodoState = {
  allIds : [],
  byIds  : {},
}


const todoReducers = new ReducerSet<TodoState>()


todoReducers.register( AddTodoAction, ( draft: TodoState, action: AddTodoAction ) => {
  draft.allIds.push( action.id )
  draft.byIds[ action.id ] = { id : action.id, content : action.content, completed : false }
  return draft
} )


todoReducers.register( ToggleTodoAction, ( draft: TodoState, payload: ToggleTodoAction ) => {
  draft.byIds[ payload.id ].completed = !draft.byIds[ payload.id ].completed
  return draft
} )


export const todos = ( state = initialState, action: ReduxActionEvent<any> ): TodoState => {
  return produce( ( draft ) => todoReducers.handle( draft, action ) )( state )
}
