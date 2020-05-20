import userService from '../../services/userService'


export function login() {
    return dispatch => {
        userService.login()
            .then(user => {
                dispatch({ type: 'SET_USER', user })
            })
    }
}

export function signup() {
    return dispatch => {
        userService.signup()
            .then(user => {
                dispatch({ type: 'SET_USER', user })
            })
    }
}

export function logout() {
    return dispatch => {
        userService.logout()
            .then(() => {
                dispatch({ type: 'SET_USER', user: null })
            })
    }
}

//getLoggedInUser??







