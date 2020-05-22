export function makeId(length = 5) {
    let id = '';
    let possible = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < length; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log(id);
    // return parseInt(id);
    return id;
}