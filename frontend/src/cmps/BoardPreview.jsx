import React from 'react'
import { Link } from 'react-router-dom'


export default function BoardPreview({ board }) {

    return (
        <Link to={`/boards/${board._id}`}>
            <section style={{ backgroundColor: "#eb3b5a" }} className="board-item" >
                <h3>{board.title}</h3>
            </section>
        </Link>
    )
}