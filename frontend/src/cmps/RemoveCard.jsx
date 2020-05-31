import React from 'react'

export default function ReomveCard(props) {
    const { type } = props;
    return (
        <div className="remove-board-container remove-card">
            <div className="remove-board-title remove-card-title flex align-center space-between">
                {`Remove ${(type && type === 'stack') ? 'list' : 'card'}`}
                <img src="/assets/img/close.png" className="close-icon" onClick={() => props.onToggleRemoveStack()} alt="" />
            </div>
            <p>Are you sure?</p>
            {(type && type === 'stack') ?
                <button className="btn btn-danger btn-remove-card" onClick={() => props.onRemoveStack()}>Yes, remove!</button>
                :
                <button className="btn btn-danger btn-remove-card" onClick={() => props.onRemoveCard()}>Yes, remove!</button>
            }
        </div>
    )
}
