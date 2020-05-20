import boardService from '../../services/boardService'

export function loadBoards() {
  return dispatch => {
    boardService.query()
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
export function removeBoard(boardId) {
  return dispatch => {
    boardService.remove(boardId)
      .then(() => dispatch({ type: 'REMOVE_BOARD', boardId }))

  }
}

export function saveBoard(board) {
  return dispatch => {
    const type = board._id ? 'UPDATE_BOARD' : 'ADD_BOARD';
    boardService.save(board)
      .then(savedBoard => dispatch({ type, board: savedBoard }))

  }
}




