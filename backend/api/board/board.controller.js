const logger = require('../../services/logger.service')
const boardService = require('./board.service')

async function addBoard(req, res) {
    let board = req.body
    board = await boardService.add(board)
    res.send(board)
}

async function getBoard(req, res) {
    const board = await boardService.getById(req.params.id)
    res.send(board)
}

async function getBoards(req, res) {
    const boards = await boardService.query(req.query)
    logger.debug(boards);
    res.send(boards)
}

async function deleteBoard(req, res) {
    await boardService.remove(req.params.id)
    res.end()
}

async function updateBoard(req, res) {
    const board = req.body;
    await boardService.update(board)
    res.send(board)
}

async function socketUpdateBoard(board) {
    const updatedBoard = await boardService.update(board)
    return updatedBoard
}

module.exports = {
    getBoard,
    getBoards,
    deleteBoard,
    updateBoard,
    addBoard,
    socketUpdateBoard
}