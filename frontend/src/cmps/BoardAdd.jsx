import React from 'react'
import { connect } from 'react-redux'
import { save } from '../store/actions/boardActions'

class BoardAdd extends React.Component {
    state = {
        board: {
            title: '',
            bgColor: '#eb3b5a'
        },
        bgColors: ['blue', 'red', 'pink', 'black', 'white', 'yellow']
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

    changeBgColor = (bgColor) => {
        this.setState(prevState => ({ board: { ...prevState.board, bgColor } }))
    }



    render() {
        const { board, bgColors } = this.state
        const { onClose } = this.props
        return <>
            <div className="screen" onClick={onClose}>
                <div className="modal-container" onClick={(ev) => ev.stopPropagation()} style={{  backgroundColor: "unset" }}>
                    <form onSubmit={this.onHandleSubmit}>
                        <div className="main-form-container flex">
                            <div className="main-form" style={{ backgroundColor: this.state.board.bgColor }}>
                                <div className="modal-header flex space-between">
                                    <h3>Create Board</h3>
                                    <button className="close-modal" onClick={onClose}>X</button>
                                </div>
                                <input name="title" className="borad-title" value={board.title}
                                    placeholder="Add board title" onChange={this.handleChange} />
                            </div>
                            <div className="bg-color-container flex ">
                                <ul className="bg-color-list clean-list">
                                    {bgColors.map(color => {
                                        return <li className="bg-color-li" style={{ backgroundColor: color }} onClick={() => this.changeBgColor(color)}></li>
                                    })}
                                </ul>
                            </div>
                        </div>
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