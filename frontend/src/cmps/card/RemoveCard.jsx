import React from 'react'
import { makeId } from '../../services/utilService'

export default function ReomveCard(props) {

    function onRemoveCard() {
        const { board, save, history, loggedInUser, card } = props
        const newBoard = { ...board }
        if (newBoard.isPublic) return;
        newBoard.stacks.forEach(stack => {
            let cardIdx = stack.cards.findIndex(currCard => {
                return currCard.id === card.id
            })
            if (cardIdx !== -1) {
                stack.cards.splice(cardIdx, 1);
            }
        })
        newBoard.activities.unshift({ id: makeId(), txt: `has removed a card`, createdAt: Date.now(), byMember: loggedInUser })
        save(newBoard);
        history.push(`/boards/${props.board._id}`);
    }

    const { type } = props;
    return (
        <div className="remove-board-container remove-card">
            <div className="remove-board-title remove-card-title flex align-center space-between">
                {`Remove ${(type && type === 'stack') ? 'list' : 'card'}`}
                <img src="/assets/img/close.png" className="close-icon" onClick={props.onToggleRemoveCard} alt="" />
            </div>
            <p>Are you sure?</p>
            {(type && type === 'stack') ?
                <button className="btn btn-danger btn-remove-card" onClick={() => props.onRemoveStack()}>Yes, remove!</button>
                :
                <button className="btn btn-danger btn-remove-card" onClick={onRemoveCard}>Yes, remove!</button>
            }
        </div>
    )
}
