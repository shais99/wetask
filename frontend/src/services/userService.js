import httpService from './httpService'
import Axios from 'axios'

const axios = Axios.create({
    withCredentials: true
});

export default {
    login,
    logout,
    signup,
    getById,
    uploadImg,
    query
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


// @TODO: Make it "async-await" function
function uploadImg(ev) {
    const CLOUD_NAME = 'shaishar9'; // find it in your cloudinary account (main page)
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append('file', ev.target.files[0]);
    formData.append('upload_preset', 'cgwfirgu'); // second parameter is the upload preset (you can find it in cloudinary settings)

    return Axios.post(UPLOAD_URL, formData)
        .then(res => res.data.url)
        .catch(err => console.error(err))
}