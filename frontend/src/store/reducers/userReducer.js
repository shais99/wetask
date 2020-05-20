const initialState = {
   loggedInUser: null
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: action.user
            }
      
        default:
            return state;
    }
}
