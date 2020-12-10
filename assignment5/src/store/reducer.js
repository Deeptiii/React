const initialState = {
    persons: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PERSON":
            return {
                ...state,
                persons: state.persons.concat(action.person)
            };
        case "REMOVE_PERSON":
            const updatedPersons = state.persons.filter(
                (person) => person.id !== action.personId
            );
            return {
                ...state,
                persons: updatedPersons
            };
    }
    return state;
};

export default reducer;
