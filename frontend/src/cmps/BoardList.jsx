import React from 'react'
import BoardPreview from './BoardPreview'
import { Link } from 'react-router-dom'


export default function BoardList(props) {

    return (<section className="boards-list flex wrap">
        {props.boards.map(board => <BoardPreview key={board._id} board={board} />)}
        <Link to="/board/add" className="add-new-board board-item" >Create new board</Link>
    </section>)
}



