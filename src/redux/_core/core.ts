import { ObjMap } from "../../util/obj-map"

export interface ReduxActionType<T> extends Function {
  TYPE: string

  new( ...args: any[] ): T;
}

/**
 * Map of all the actions registered in the system, by Type key ("prefix:key")
 * This exists exclusively for error checking - to prevent duplicate keys being registered.
 */
const AllActions: ObjMap<ReduxActionType<ReduxActionDefinition>> = {}

/**
 * Ensure that two actions do not share the same key / type name.
 */
const verifyActionNotPreviouslyRegistered = ( type: string ) => {
  if ( AllActions[ type ] ) {
    throw new Error( `Action with type '${type}' already registered.` )
  }
}

/**
 * Ensure that an action type has been registered vai ReduxActions#register.
 *
 * Can only be verified when a ReduxActionDefinition subclass is instantiated, so this will NOT be thrown until
 * an attempt is made to fire the action with the specified type
 */
const verifyActionRegistered = ( type: string ) => {
  if ( !AllActions[ type ] ) {
    throw new Error( `Action with type '${type}' has never been registered. Call ReduxActions#register(ActionType)` )
  }
}


/**
 * Subclass this for new Actions. Call 'dispatch(new MyReduxAction(args).toRedux())' to dispatch it.
 *
 * A ReduxActionDefinition is what might be called an 'Action' in Redux terms. Except they chose verbiage that is
 * horribly overloaded (and yet, despite all the meanings for 'action', they used it to mean something it doesn't
 * actually mean).
 *
 * Defines the 'type' (key) and the data that will be the payload of a "ReduxActionEvent"
 */
export class ReduxActionDefinition {
  static TYPE: string = "NO TYPE SET"
  readonly type: string

  constructor( type: string ) {
    verifyActionRegistered( type )
    this.type = type
  }

  private toPayload() {
    let x: any = Object.assign( {}, this )
    delete x[ 'type' ]
    return x
  }

  toRedux() {
    console.log( 'ReduxActionDefinition#toRedux' )
    return { type : this.type, payload : this.toPayload() }
  }
}


export interface ReduxActionEvent<P extends ReduxActionDefinition> {
  type: string
  payload: P
}

export const ReduxActions = {
  /**
   * Register an Action. For type safety and general traceability.
   * @param type The class declaration itself.
   */
  register : ( type: ReduxActionType<ReduxActionDefinition> ) => {
    verifyActionNotPreviouslyRegistered( type.TYPE )
    AllActions[ type.TYPE ] = type
  }
}
