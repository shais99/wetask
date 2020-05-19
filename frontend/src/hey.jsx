const user = {
    _id: 'u101',
    fullName: 'Abi Abambi',
    userName: 'abi@ababmi.com',
    password: 'aBambi123',
    isGuest: false,
    imgUrl: 'http://some-img',
    boards: [{
        _id: 'b101',
        title: 'Taski project',
        bgColor: 'blue',
        users: [{
            _id: 'u101',
            fullName: 'Abi Abambi',
            imgUrl: 'http://some-img'
        }],
        lists: [{
            _id: 'l101',
            title: 'In progress',
            cards: [{
                
            }],
            bgColor: '#fefefe'
        }]
    }]
}