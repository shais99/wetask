import React from 'react'
import BoardList from '../cmps/BoardList'
import { loadBoards } from '../store/actions/boardActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Boards extends React.Component {

    componentDidMount() {
        if (!this.props.loggedInUser) return this.props.history.push('/signup')
        this.props.loadBoards(this.props.loggedInUser._id)
    }

    onClickUser() {
        return
    }



    render() {
        const { loggedInUser, boards } = this.props
        return ((!loggedInUser) ? 'Loading...' :
            <div className="boards-page container">
                <header className="boards-header flex space-between">
                    <h2 className="boards-title">My Boards</h2>
                    <Link to="/profile" className="hello-btn" onClick={() => this.onClickUser}>Hello {loggedInUser.username}</Link>
                </header>
                <BoardList boards={boards} />
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