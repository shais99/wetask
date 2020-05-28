import boardService from '../../services/boardService'
import socketService from '../../services/socketService'

export function loadBoards(userId) {
  return dispatch => {
    return boardService.query(userId)
      .then(boards => dispatch({ type: 'SET_BOARDS', boards }))
  }
}
export function loadBoard(id) {
  return dispatch => {
     boardService.get(id)
      .then(board => {
        dispatch({ type: 'SET_BOARD', board });
      })
  }
}
export function saveCard(card) {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_CARD', card });
    socketService.emit('updateBoard', getState().board.currBoard);
    boardService.save(getState().board.currBoard)
  }
}
export function removeBoard(boardId) {
  return dispatch => {
    return boardService.remove(boardId)
      .then(() => {
        dispatch({ type: 'REMOVE_BOARD', boardId })
      })
  }
}
export function addBoard(board) {
  return dispatch => {
    boardService.save(board)
      .then(savedBoard => dispatch({ type: 'ADD_BOARD', board: savedBoard }))
  }
}

export function save(board) {
  return dispatch => {
    dispatch({ type: 'SET_BOARD', board })
    socketService.emit('updateBoard', board);
    boardService.save(board)
  }
}
export function setBoard(board) {
  return dispatch => dispatch({ type: 'SET_BOARD', board })
}