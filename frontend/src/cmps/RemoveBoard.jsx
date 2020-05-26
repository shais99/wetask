import React from 'react'

export default function ReomveBoard(props) {
    return (
        <div className="remove-board-container ">
            <div className="remove-board-title flex align-center space-between">
                Remove board
                <img src="/assets/img/close.png" className="close-icon" onClick={() => props.onToggleRemoveBoard()} alt="" />
            </div>
            <p>Are you sure you want to remove the card?</p>
            <button className="btn btn-danger btn-remove-card" onClick={() => props.onRemoveCard()}>Yes, remove!</button>
        </div>
    )
}
