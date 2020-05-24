import React from 'react'

export default function ReomveBoard(props) {
    return (
        <div className="remove-board-container">
            <div className="remove-board-title flex align-center space-between">
                Remove board
                <img src="/assets/img/close.png" className="close-icon" onClick={() => props.onToggleRemoveBoard()} alt="" />
            </div>
            <p>Are you sure you want to remove the board?</p>
            <button className="btn btn-danger" onClick={() => props.onRemoveBoard()}>Yes, remove!</button>
        </div>
    )
}
