const initialState = {
    boards: [],
    currBoard: null
}

export default function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARDS':
            return {
                ...state,
                boards: action.boards
            }
        case 'SET_BOARD':
            return {
                ...state,
                currBoard: action.board
            }
        case 'SET_CARD':
            return {
                ...state,
                currBoard: {
                    ...state.currBoard, stacks: state.currBoard.stacks.map(stack => {
                        stack.cards = stack.cards.map(card => {
                            if (card.id === action.card.id) return action.card;
                            return card;
                        })
                        return stack
                    })
                }
            }
        case 'ADD_BOARD':
            return {
                ...state,
                boards: [action.board, ...state.boards]
            }
        case 'UPDATE_BOARD':
            return {
                ...state,
                boards: state.boards.map(board => {
                    if (board._id === action.board._id) return action.board;
                    return board;
                })
            }
        case 'REMOVE_BOARD':
            return {
                ...state,
                boards: state.boards.filter(board => board._id !== action.boardId)
            }
        default:
            return state;
    }
}