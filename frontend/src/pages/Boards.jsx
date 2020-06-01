import React from 'react'
import BoardList from '../cmps/board/BoardList'
import { loadBoards } from '../store/actions/boardActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../cmps/general/Loader'


class Boards extends React.Component {

    async componentDidMount() {
        if (!this.props.loggedInUser) return this.props.history.push('/')
        await this.props.loadBoards(this.props.loggedInUser._id)
    }

    render() {
        const { loggedInUser, boards } = this.props
        return ((!loggedInUser) ? <Loader /> :
            <div className="container flex justify-center">
                <div className="form-container boards-page">
                    <header className="boards-header wrap flex space-between">
                        <h2 className="boards-title">My Boards</h2>
                        <Link to="/profile" className="hello-btn">Hello {loggedInUser.username}</Link>
                    </header>
                    <BoardList boards={boards} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.board.boards,
        loggedInUser: state.user.loggedInUser
    }
}

const mapDispatchToProps = {
    loadBoards
}

export default connect(mapStateToProps, mapDispatchToProps)(Boards)