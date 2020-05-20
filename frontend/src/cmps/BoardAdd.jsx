import React from 'react'


export default class BoardAdd extends React.Component {
    state = {
        board: {
            _id: "101",
            title: null
        }
    }


    render() {
        const { board } = this.state
        return <>
            <div className="screen">
                <div className="modal-container" style={{ width: "35%" }}>
                    <div className="modal-header flex space-between">
                        <h3>Create Board</h3>
                        <button className="close-modal">X</button>
                    </div>
                    <div className="flex">
                        <input name="title" type="text" className="borad-title" value={board.title} placeholder="Add board title" />
                    </div>
                    <div className="modal-footer flex justify-end">
                        <button className="create-board-btn btn"> Create Board</button>
                    </div>
                </div>
            </div>
        </>
    }
}