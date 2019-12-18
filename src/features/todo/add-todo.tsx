import React             from "react"
import { connect }       from "react-redux"
import { AddTodoAction } from "./redux/todo.actions"

/**
 * Define the state type for the AddTodo component.
 */
type AddTodoState = { input: string }

class AddTodo extends React.Component<{ dispatch: any }, AddTodoState> {
  constructor( props: any ) {
    super( props )
    this.state = { input : "" }
  }

  updateInput = ( input: string ) => {
    this.setState( { input } )
  }

  handleAddTodo = () => {
    this.props.dispatch( new AddTodoAction(this.state.input ).toRedux() )
    this.setState( { input : "" } )
  }

  render() {
    return (
      <div>
        <input onChange={e => this.updateInput( e.target.value )} value={this.state.input}/>
        <button className="add-todo" onClick={this.handleAddTodo}>Add Todo</button>
      </div>
    )
  }
}

export default connect()( AddTodo )
