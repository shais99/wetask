import React from 'react'

export default function FilterCardsList(props) {
    const { boardId } = props

    function onClickCard(cardId) {
        props.history.push(`/boards/${boardId}/card/${cardId}`)
    }

    return (
        <div className="filter-cards-container">
            <div className="filter-scroll-cards">
                {props.cards.map((card, idx) => {
                    return <div className="filter-card" onClick={() => onClickCard(card.id)} key={idx}>
                        {card.title}
                    </div>
                })}
            </div>
        </div>
    )
}
