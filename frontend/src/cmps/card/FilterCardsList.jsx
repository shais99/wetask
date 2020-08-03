import React from 'react'
import moment from 'moment'

export default function FilterCardsList(props) {
    const { boardId } = props

    function onClickCard(cardId) {
        props.history.push(`/boards/${boardId}/card/${cardId}`)
    }

    function getStackByCard(card) {
        return props.stacks.find(stack => stack.cards.find(currCard => card.id === currCard.id))
    }

    return (
        <div className="filter-cards-container">
            <div className="filter-scroll-cards">
                {props.cards.map(card => {
                    return <div className="filter-card" onClick={() => onClickCard(card.id)} key={card.id}>
                        <div className="filter-card-title">{card.title}</div>
                        <div className="filter-card-details">List: {getStackByCard(card).title}{(card.dueDate) ? `, Due date: ${moment(card.dueDate).format("MMM DD")}` : ''}</div>
                    </div>
                })}
            </div>
        </div>
    )
}
