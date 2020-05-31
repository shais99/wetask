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
        bgColors: ['#fd9644', '#fc5c65', '#fed330', '#26de81', '#2bcbba', '#45aaf2', '#4b7bec', '#a55eea', '#122961'],
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
        if (!board.title) return;
        board.members = [this.props.loggedInUser];
        board.stacks = [];
        board.createdAt = Date.now();
        board.createdBy = this.props.loggedInUser;
        board.activities = [];
        board.boardLabels = [{ id: '101', title: 'done', color: '#61bd4f' }, { id: '102', title: 'error', color: '#f2d600' },
        { id: '103', title: 'design', color: '#ff9f1a' }, { id: '104', title: 'feature', color: '#eb5a46' },
        { id: '105', title: 'bug', id: '106', color: '#c377e0' }, { id: '107', title: 'warning', color: '#0079bf' }];
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
                <div className="add-board-container modal-container" onClick={(ev) => ev.stopPropagation()} style={{ backgroundColor: "unset", width: 'fit-content' }}>
                    <img src="assets/img/close.png" onClick={onClose} className="close-btn" alt="" />
                    <form onSubmit={this.onHandleSubmit}>
                        <div className="main-form-container flex wrap">
                            <div className="main-form"
                                style={{ width: 'unset', backgroundColor: board.bg, backgroundImage: `url(${board.bg})`, backgroundSize: "cover" }}>
                                <div className="main-form-header flex space-between">
                                    <h3>Create Board</h3>
                                </div>

                                <input name="title" className="board-title" value={board.title}
                                    placeholder="Add board title" onChange={this.handleChange} autoComplete="off" required />
                                <div className="bg-btns-container">
                                    <Link className="clean-link bg-btn" to="#" onClick={() => this.onChangeBgBy('color')}>Background Color</Link>
                                    <Link className="clean-link bg-btn" to="#" onClick={() => this.onChangeBgBy('image')}>Background Image</Link>
                                </div>

                            </div>
                            <div className="bg-color-container flex ">
                                <BoardBg bgs={bgBy === 'color' ? bgColors : bgImgs} type={bgBy} changeBgColor={this.changeBgColor} />
                            </div>
                        </div>
                        <div className="modal-footer flex justify-end">
                            <button className="create-board-btn btn btn-success">Create Board</button>
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