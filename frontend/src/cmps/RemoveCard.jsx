import React from 'react'

export default function ReomveCard(props) {
    return (
        <div className="remove-board-container remove-card">
            <div className="remove-board-title flex align-center space-between">
                Remove card
                <img src="/assets/img/close.png" className="close-icon" onClick={() => props.onToggleRemoveCard()} alt="" />
            </div>
            <p>Are you sure?</p>
            <button className="btn btn-danger btn-remove-card" onClick={() => props.onRemoveBoard()}>Yes, remove!</button>
        </div>
    )
}
