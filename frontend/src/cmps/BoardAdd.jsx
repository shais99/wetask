import React from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../store/actions/boardActions'

class BoardAdd extends React.Component {
    state = {
        board: {
            _id: "101",
            title: ''
        }
    }

    handleChange = (ev) => {
        let { name, value } = ev.target;
        value = ev.target.type === 'number' ? parseInt(value) : value;
        this.setState(prevState => ({ board: { ...prevState.board, [name]: value } }))
    };

    onHandleSubmit = (ev) => {
        ev.preventDefault()
        const { board } = this.state
        this.props.saveBoard(board)
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
                    <div className="flex">
                        <input name="title" type="text" className="borad-title" value={board.title}
                            placeholder="Add board title" onChange={this.handleChange} />
                    </div>
                    <div className="modal-footer flex justify-end">
                        <button className="create-board-btn btn" onClick={this.onHandleSubmit}> Create Board</button>
                    </div>
                </div>
            </div>
        </>
    }
}

const mapStateToProps = (state) => {
    return {
    };
};
const mapDispatchToProps = {
    saveBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardAdd);