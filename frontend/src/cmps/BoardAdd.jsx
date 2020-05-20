import React from 'react'
import { connect } from 'react-redux'
import { save } from '../store/actions/boardActions'

class BoardAdd extends React.Component {
    state = {
        board: {
            title: ''
        }
    }

    handleChange = (ev) => {
        let { name, value } = ev.target;
        this.setState(prevState => ({ board: { ...prevState.board, [name]: value } }))
    };

    onHandleSubmit = (ev) => {
        ev.preventDefault()
        const { board } = this.state
        this.props.save(board)
        this.setState({ board: '' })
    };


    render() {
        const { board } = this.state
        return <>
            <div className="screen">
                <div className="modal-container" style={{ width: "35%" }}>
                    <div className="modal-header flex space-between">
                        <h3>Create Board</h3>
                        <button className="close-modal">X</button>
                    </div>
                    <form className="" onSubmit={this.onHandleSubmit}>
                        <input name="title" className="borad-title" value={board.title}
                            placeholder="Add board title" onChange={this.handleChange} />
                        <div className="modal-footer flex justify-end">
                            <button className="create-board-btn btn" > Create Board</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    }
}


const mapDispatchToProps = {
    save
}

export default connect(null, mapDispatchToProps)(BoardAdd);