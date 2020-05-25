import httpService from './httpService'

export default {
    login,
    logout,
    signup,
    getById,
    query,
    update
}

function query(filterBy) {
    if (!filterBy) return httpService.get('users')
    return httpService.get(`users?q=${filterBy.q}&boardId=${filterBy.board._id}`)
}

async function login(userCred) {
    try {
        const user = await httpService.post('auth/login', userCred)
        return _handleLogin(user)
    } catch (err) {
        throw err
    }
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _handleLogin(user)
}

async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

function getById(userId) {
    return httpService.get(`user/${userId}`)
}

function update(user) {
    return httpService.put(`users/${user._id}`, user)
}