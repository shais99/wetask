import React from 'react'
import BoardPreview from './BoardPreview'
import BoardAdd from './BoardAdd'

export default class BoardList extends React.Component {
    
    state = {
        isAddOpen: false
    }


    toggleAddShown = () => {
        this.setState(prevState => ({ isAddOpen: !prevState.isAddOpen }))
    }

    render() {
        return (
            <>
                {this.state.isAddOpen && <BoardAdd onClose={this.toggleAddShown} />}
                <section className="boards-list flex wrap">
                    {this.props.boards.map(board => <BoardPreview key={board._id} board={board} />)}
                    <button className="add-new-board board-item" onClick={this.toggleAddShown}>Create new board</button>
                </section>
            </>)
    }
}



