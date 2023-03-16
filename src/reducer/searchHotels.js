import * as types from '../actions_types';

const hotelsReducer = (state={},action) => {
    switch (action.type) {
        case types.SEARCHHOTELS:
            return {...state,hotelsResult : action.payload};
        case types.FILTEREDHOTELS:
            return {...state,filterRes : action.payload};
        case types.SELECTEDFROMSEARCH:
            return {...state, selectedSuggestion : action.payload};
        default:
            return state;
    }
}
export default hotelsReducer;