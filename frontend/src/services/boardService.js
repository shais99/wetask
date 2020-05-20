import HttpService from './httpService'
const BASE_URL = 'boards'

export default {
    query,
    save,
    remove,
    get
}

async function query(userId) {
    const queryStr = `?userId=${userId}`;
    return await HttpService.get(`${BASE_URL}${queryStr}`);
}

async function get(id) {
    return await HttpService.get(`${BASE_URL}/${id}`)
}

async function remove(id) {
    return await HttpService.delete(`${BASE_URL}/${id}`)
}

async function save(board) {
    var prm;
    if (board._id) {
        prm = await HttpService.put(`${BASE_URL}/${board._id}`, board)
    } else {
        prm = await HttpService.post(`${BASE_URL}`, board)
    }
    return prm
}

