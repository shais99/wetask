const boardController = require('../board/board.controller')
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        
        socket.on('setBoard', async boardId => {
            if (socket.myBoard) socket.leave(socket.myBoard)

            socket.join(boardId)
            socket.myBoard = boardId;
        })

        socket.on('updateBoard', async board => {
            io.to(socket.myBoard).emit('loadBoard', board)
        })

    })
}