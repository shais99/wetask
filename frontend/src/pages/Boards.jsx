import React from 'react'
import BoardList from '../cmps/BoardList'
import {loadBoards } from '../store/actions/boardActions'
import { connect } from 'react-redux'


class Boards extends React.Component {

    componentDidMount(){
        this.props.loadBoards('5ec5581139619913d9c4da56')
    }

    onClickUser(){
        return
    }



    render() {
        return <div className="boards-page container">
            <header className="boards-header flex space-between">
                <h2 className="boards-title">My Boards</h2>
                <button className="hello btn" onClick={()=>this.onClickUser}>Hello {this.props.userLoggedIn}</button>
            </header>
            <BoardList boards={this.props.boards} />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        boards: state.board.boards,
        userLoggedIn: state.user.userLoggedIn
    }
}

const mapDispatchToProps = {
    loadBoards
}

export default connect(mapStateToProps, mapDispatchToProps)(Boards)