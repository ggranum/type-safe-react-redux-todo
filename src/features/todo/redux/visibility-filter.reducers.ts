import produce, { Draft }                                            from "immer"
import { ReduxActionEvent }                                          from "../../../redux/_core/core"
import { ReducerSet }                                                from "../../../redux/_core/reducer-set"
import { SetTodoFilterAction, VISIBILITY_FILTERS, VisibilityFilter } from "./visibility-filter.actions"

export type VisibilityFilterState = {
  readonly filter: VisibilityFilter
}
const initialState = { filter: VISIBILITY_FILTERS.all }

const visReducers = new ReducerSet<VisibilityFilterState>()
visReducers.register( SetTodoFilterAction, ( draft: Draft<VisibilityFilterState>, action: SetTodoFilterAction ) => {
  draft.filter = action.filter
  return draft
} )

export const visibilityFilter = ( state = initialState, action: ReduxActionEvent<any> ): VisibilityFilterState => {
  return produce( ( draft ) => visReducers.handle( draft, action ) )( state )
}

