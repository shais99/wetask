let localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

const initialState = {
    loggedInUser: localLoggedinUser,
    users: []
};

export default function (state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: action.user
            }
        case 'LOAD_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'UPDATE_USER':
            return {
                ...state,
                users: state.users.map(user => {
                    if (user._id === action.user._id) return action.user;
                    return user;
                })
            }
        default:
            return state;
    }
}
