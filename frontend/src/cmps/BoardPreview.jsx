import React from 'react'

export default function BoardPreview({ board }) {

    return (<section className="board-item" >
        <h3>{board.title}</h3>
    </section>
    )
}