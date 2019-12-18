import cx                   from "classnames"
import React                from "react"
import { connect }          from "react-redux"
import { AppState }                                                  from "../../redux/reducers"
import { SetTodoFilterAction, VISIBILITY_FILTERS, VisibilityFilter } from "./redux/visibility-filter.actions"

const VisibilityFilters = ( { activeFilter, dispatch }: { activeFilter: VisibilityFilter, dispatch: any } ) => {
  return (
    <div className="visibility-filters">
      {Object.values( VISIBILITY_FILTERS ).map( ( currentFilter: VisibilityFilter ) => {
        return (
          <span key={`visibility-filter-${currentFilter}`}
                className={cx( "filter", currentFilter === activeFilter && "filter--active" )}
                onClick={() => {
                  dispatch(new SetTodoFilterAction(currentFilter).toRedux())
                }}>
            {currentFilter}
          </span>
        )
      } )}
    </div>
  )
}

const mapStateToProps = ( state: AppState ) => {
  return { activeFilter : state.visibilityFilter.filter }
}

export default connect( mapStateToProps )( VisibilityFilters )
