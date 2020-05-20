import httpService from './httpService'
const BASE_URL = 'boards'

export default {
    query,
    save,
    remove,
    get
}

async function query({userId}) {
    return await httpService.get(`${BASE_URL}`, { params: userId })
}

async function get(id) {
    return await httpService.get(`${BASE_URL}/${id}`)
}

async function remove(id) {
    return await httpService.delete(`${BASE_URL}/${id}`)
}

async function save(board) {
    var prm;
    if (board._id) {
        prm = await httpService.put(`${BASE_URL}/${board._id}`, board)
    } else {
        prm = await httpService.post(`${BASE_URL}`, board)
    }
    return prm
}

