import userService from '../../services/userService';

export function login(userCreds) {
    try {
        return async dispatch => {
            const user = await userService.login(userCreds);
            dispatch(setUser(user));
        };
    } catch (err) {
        throw err
    }
}

export function loadUsers(filterBy = null) {
    return async dispatch => {
        try {
            const users = await userService.query(filterBy)
            dispatch({ type: 'LOAD_USERS', users })
        } catch (err) {
            console.log('userActions: cannot load users!', err);
        }
    }
}

export function signup(userCreds) {
    return async dispatch => {
        const user = await userService.signup(userCreds);
        dispatch(setUser(user));
    };
}

export function logout() {
    return async dispatch => {
        await userService.logout();
        dispatch(setUser(null));
    };
}

export function setUser(user) {
    return {
        type: 'SET_USER',
        user
    };
}