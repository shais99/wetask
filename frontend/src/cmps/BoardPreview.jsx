import React from 'react'

export default function BoardPreview({board}) {

    return (
        <section style={{ backgroundColor: "#eb3b5a" }} className="board-item" >
            <h3>{board.title}</h3>
        </section>
    )
}