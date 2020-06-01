import React from 'react'
import { makeId } from '../../services/utilService'

export default class CardMove extends React.Component {

    state = {
        selectIsShown: false
    }

    onToggleSelect = () => {
        this.setState(prevState => ({ selectIsShown: !prevState.selectIsShown }))
    }

    moveCardToStack = (stackDest) => {
        const { loggedInUser, card, board, save } = this.props
        const newCard = { ...card }
        const newBoard = { ...board }
        newBoard.stacks.forEach(stack => {
            let cardIdx = stack.cards.findIndex(card => card.id === newCard.id)
            if (cardIdx !== -1) {
                stack.cards.splice(cardIdx, 1);
            }
            if (stack.title === stackDest.title) {
                stack.cards.unshift(newCard)
            }
        })
        newCard.activities.unshift({
            id: makeId(), txt: `moved card to stack ${stackDest.title}`,
            createdAt: Date.now(), byMember: loggedInUser
        })
        save(board)
    }

    render() {
        const { card, board } = this.props
        const { selectIsShown } = this.state
        return (
            <div className="card-move-container">
                <h4>SELECT DESTINATION</h4>
                <div className="select-stack" onClick={this.onToggleSelect}>Select list</div>
                {selectIsShown && <div className="selection-container">
                    {board.stacks.map((stack, idx) => {
                        if (stack.cards.find(currCard => currCard.id === card.id)) return null;
                        return <div key={idx} className="option-stack-name" onClick={() => this.moveCardToStack(stack)}>{stack.title}</div>
                    })}
                </div>}
            </div>
        )
    }
}

