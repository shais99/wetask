import React from 'react'
import { Link } from 'react-router-dom'


export default function BoardPreview({ board }) {

    return (
        <Link to={`/boards/${board._id}`} className="board-item" style={{ backgroundColor: board.bg, backgroundImage: `url(${board.bg})` }}>
            <h3>{board.title}</h3>
        </Link>
    )
}