import React, { Component } from 'react'
import { connect } from 'react-redux'
import { save, loadBoard } from '../store/actions/boardActions'
import AddMember from '../cmps/AddMember'
import BoardMenu from '../cmps/BoardMenu'
import { makeId } from '../services/utilService'


class BoardOptions extends Component {

    state = {
        isAddMemberShown: false,
        isBoardMenuShown: false,
        currBoard: null
    }

    componentDidMount() {
        this.setState({ currBoard: this.props.currBoard })
    }

    getTwoChars(str) {
        let twoChars;
        if (str.split(' ').length !== 2) twoChars = str?.charAt(0)
        else twoChars = str?.charAt(0) + str.split(' ')[1].charAt(0)
        if (!twoChars) twoChars = ''
        return twoChars
    }


    // @TODO: MAKE IT ONE FUNCTION!!!
    onToggleAddMember = () => this.setState(prevState => ({ isAddMemberShown: !prevState.isAddMemberShown }))
    onToggleBoardMenu = () => this.setState(prevState => ({ isBoardMenuShown: !prevState.isBoardMenuShown }))
    // ***********

    onAddMember = member => {
        const { loggedInUser, currBoard } = this.props

        currBoard.members.unshift(member)
        currBoard.activities.unshift({ id: makeId(), txt: `added ${member.username} to the board`, createdAt: Date.now(), byMember: loggedInUser })
        this.props.save(currBoard)
        this.onToggleAddMember()
    }

    onRemoveMember = member => {
        const { loggedInUser, currBoard } = this.props

        const memberIdx = currBoard.members.findIndex(member => member._id === member._id);
        currBoard.members.splice(memberIdx, 1)
        currBoard.activities.unshift({ id: makeId(), txt: `removed ${member.username} from the board`, createdAt: Date.now(), byMember: loggedInUser })
        this.props.save(currBoard)
        this.setState({ currBoard })
    }

    render() {
        const { board, onSetBg } = this.props
        const { isAddMemberShown, isBoardMenuShown } = this.state
        return (
            <div className="board-options-container flex align-center space-between">
                <div className="board-title">{board.title}</div>

                <div className="board-members flex">
                    {board.members.map((member, idx) => <div key={idx} className="member flex justify-center align-center" style={{ backgroundImage: `url(${member.imgUrl})`, backgroundColor: member.bgColor }}><img onClick={() => this.onRemoveMember(member)} src="/assets/img/close.png" className="remove-member" alt="" />{this.getTwoChars(member.fullname)}</div>)}
                </div>

                <div className="board-options flex">
                    <button className="option flex align-center" onClick={() => this.onToggleAddMember()}>
                        <img src="/assets/img/add-user.png" alt="" />
                    </button>
                    <button className="option flex align-center" onClick={() => this.onToggleBoardMenu()}>
                        <img src="/assets/img/menu.png" alt="" />
                    </button>
                </div>
                {isAddMemberShown && <AddMember onClose={this.onToggleAddMember} onAddMember={this.onAddMember} />}
                {isBoardMenuShown && <BoardMenu onSetBg={onSetBg} board={board} onClose={this.onToggleBoardMenu} />}

            </div>
        )
    }
}

const mapDispatchToProps = {
    save,
    loadBoard
}
const mapStateToProps = (state) => {
    return {
        currBoard: state.board.currBoard,
        loggedInUser: state.user.loggedInUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardOptions);