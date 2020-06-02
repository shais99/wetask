const initialState = {
    boards: [],
    currBoard: null,
    currCard: null
}

export default function boardReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOARDS':
            return {
                ...state,
                boards: action.boards
            }
        case 'SET_BOARD':
            let newCard;
            if (state.currCard) {
                action.board.stacks.forEach(stack => {
                    newCard = stack.cards.find(card => state.currCard.id === card.id)
                })
            }
            return {
                ...state,
                currBoard: action.board,
            }
        case 'LOAD_CARD':
            let foundCard;
            state.currBoard.stacks.forEach(stack => {
                stack.cards.find(card => {
                    if (card.id === action.id) foundCard = card
                })
            })
            return {
                ...state,
                currCard: { ...foundCard }
            }
        case 'UPDATE_STACK_TITLE':
            return {
                ...state,
                currBoard: {
                    ...state.currBoard,
                    stacks: state.currBoard.stacks.map(stack => {
                        if (stack.id === action.stack.id) stack.title = action.stack.title
                        return stack
                    })
                }
            }
        case 'SET_CARD':
            return {
                ...state,
                currBoard: {
                    ...state.currBoard,
                    stacks: state.currBoard.stacks.map(stack => {
                        stack.cards = stack.cards.map(card => {
                            if (card.id === action.card.id) return action.card;
                            return card;
                        })
                        return stack
                    })
                },
                currCard: action.card
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