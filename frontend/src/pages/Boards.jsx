import React from 'react'
import BoardList from '../cmps/BoardList'

export default class Boards extends React.Component {

    state = {
        boards: [
            {
                _id: "101",
                title: "meshix board"
            },
            {
                _id: "102",
                title: "we task board"
            }
        ],
        userLoggedIn: "Puki"
    }

    onClickUser(){
        return
    }



    render() {
        return <div className="boards-page top-p container">
            <header className="boards-header flex space-between">
                <h2 className="boards-title">My Boards</h2>
                <button className="hello btn" onClick={()=>this.onClickUser}>Hello {this.state.userLoggedIn}</button>
            </header>
            <BoardList boards={this.state.boards} />
        </div>
    }
}

// const mapStateToProps = (state) => {
//     return {
//         boards: state.Boards.boards
//     }
// }

// const mapDispatchToProps = {
//     // loadBoards,
//     // removeBoard
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Boards)