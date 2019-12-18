import { ReduxActionDefinition } from "../../../redux/_core/core"
import { ObjMap }                from "../../../util/obj-map"

export type VisibilityFilter = 'all' | 'completed' | 'incomplete';
export const VISIBILITY_FILTERS: ObjMap<VisibilityFilter> = {
  all        : 'all',
  completed  : 'completed',
  incomplete : 'incomplete',
}

export class SetTodoFilterAction extends ReduxActionDefinition {
  static readonly TYPE = "todo:setFilter"

  readonly filter: VisibilityFilter

  constructor( filter: VisibilityFilter ) {
    super( SetTodoFilterAction.TYPE )
    this.filter = filter
  }
}
