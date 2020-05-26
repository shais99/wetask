import React from 'react'
import { connect } from 'react-redux'
import { addBoard } from '../store/actions/boardActions'
import { Link } from 'react-router-dom'
import BoardBg from './BoardBg'



class BoardAdd extends React.Component {
    state = {
        board: {
            title: '',
            bg: '#122961'
        },
        bgColors: ['blue', 'red', 'pink', 'black', 'yellow', '#122961', '#3867d6', '#fed330', '#eb3b5a'],
        bgImgs: ['assets/img/bg-beach.jpg', 'assets/img/bg-flowers.jpg',
            'assets/img/bg-sunset.jpg', 'assets/img/bg-view.jpg',
            'assets/img/bg-view2.jpg', 'assets/img/bg-view3.jpg',
            'assets/img/bg-view4.jpg', 'assets/img/bg-water.jpg', 'assets/img/bg-view5.jpg'],
        bgBy: 'color'
    }

    handleChange = (ev) => {
        let { name, value } = ev.target;
        this.setState(prevState => ({ board: { ...prevState.board, [name]: value } }))
    };

    onHandleSubmit = (ev) => {
        ev.preventDefault()
        const { board } = this.state
        board.members = [this.props.loggedInUser];
        board.stacks = [];
        board.createdAt = Date.now();
        board.createdBy = this.props.loggedInUser;
        board.activities = [];
        this.props.addBoard(board)
        this.setState({ board: '' })
        this.props.onClose()
    };

    changeBgColor = (bg) => {
        this.setState(prevState => ({ board: { ...prevState.board, bg } }))
    }

    onChangeBgBy(bgBy) {
        this.setState({ bgBy });
    }

    render() {
        const { board, bgColors, bgImgs, bgBy } = this.state
        const { onClose } = this.props
        return <>
            <div className="screen" onClick={onClose}>
                <div className="modal-container" onClick={(ev) => ev.stopPropagation()} style={{ backgroundColor: "unset", width: 'fit-content' }}>
                    <button className="close-btn" onClick={onClose}>X</button>
                    <form onSubmit={this.onHandleSubmit}>
                        <div className="main-form-container flex wrap">
                            <div className="main-form"
                                style={{ backgroundColor: board.bg, backgroundImage: `url(${board.bg})`, backgroundSize: "cover" }}>
                                <div className="main-form-header flex space-between">
                                    <h3>Create Board</h3>
                                </div>

                                <input name="title" className="board-title" value={board.title}
                                    placeholder="Add board title" onChange={this.handleChange} autoComplete="off" />
                                <Link className="clean-link bg-btn" to="#" onClick={() => this.onChangeBgBy('color')}>Background Color</Link>
                                <Link className="clean-link bg-btn" to="#" onClick={() => this.onChangeBgBy('image')}>Background    Image</Link>

                            </div>
                            <div className="bg-color-container flex ">
                                <BoardBg bgs={bgBy === 'color' ? bgColors : bgImgs} type={bgBy} changeBgColor={this.changeBgColor} />
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



const mapStateToProps = (state) => {
    return {
        loggedInUser: state.user.loggedInUser
    }
}

const mapDispatchToProps = {
    addBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardAdd)