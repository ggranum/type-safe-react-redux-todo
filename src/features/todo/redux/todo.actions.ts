import { ReduxActionDefinition, ReduxActions } from "../../../redux/_core/core"

let nextTodoId: number = 0

export class AddTodoAction extends ReduxActionDefinition {
  static TYPE: string = "todo:add"

  id: number
  content: string

  constructor( content: string ) {
    super( AddTodoAction.TYPE )
    this.id = ++nextTodoId
    this.content = content
  }
}

export class ToggleTodoAction extends ReduxActionDefinition {
  static TYPE: string = "todo:toggle"

  id: number

  constructor( id: number ) {
    super( ToggleTodoAction.TYPE )
    this.id = id
  }
}

ReduxActions.register(AddTodoAction)
ReduxActions.register(ToggleTodoAction)
