import { Draft }                                   from "immer"
import { ObjMap }                                                   from "../../util/obj-map"
import { ReduxActionEvent, ReduxActionDefinition, ReduxActionType } from "./core"

type ReducerDefinition<T> = {
  action: ReduxActionType<any>,
  reduce: ( state: Draft<T>, payload: any ) => any
}


export class ReducerSet<T> {
  private reducers: ObjMap<ReducerDefinition<T>> = {}

  handle( state: Draft<T>, action: ReduxActionEvent<ReduxActionDefinition> ): Draft<T> {
    let result = state
    let reducer = this.reducers[ action.type ]
    if ( reducer ) {
      result = reducer.reduce( state, action.payload )
    }
    return result
  }

  register<X extends ReduxActionDefinition>( forAction: ReduxActionType<X>, reducer: ( state: Draft<T>, action: X ) => T ) {
    const type = forAction.TYPE
    this.reducers[ type ] = { action: forAction, reduce: reducer }
  }
}
