import boardService from '../../services/boardService'

export function loadBoards(userId) {
  return dispatch => {
    boardService.query(userId)
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
    boardService.save(getState().board.currBoard)
  }
}
export function removeBoard(boardId) {
  return dispatch => {
    boardService.remove(boardId)
      .then(() => {
        dispatch({ type: 'REMOVE_BOARD', boardId })
        return Promise.resolve()
      })
  }
}

export function save(board) {
  return dispatch => {
    const type = board._id ? 'UPDATE_BOARD' : 'ADD_BOARD';
    boardService.save(board)
      .then(savedBoard => dispatch({ type, board: savedBoard }))
  }
}




