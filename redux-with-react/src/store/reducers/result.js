import * as actionTypes from "../action";

const initialState = {
    results: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({
                    id: new Date(),
                    val: action.result
                })
            };
        case actionTypes.DELETE_RESULT:
            const updatedArray = state.results.filter(
                (result) => result.id !== action.resultId
            );
            return {
                ...state,
                results: updatedArray
            };
        default:
            return state;
    }
};

export default reducer;
