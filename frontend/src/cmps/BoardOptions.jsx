import React, { Component } from 'react'
import { connect } from 'react-redux'
import { save, loadBoard } from '../store/actions/boardActions'
import AddMember from '../cmps/AddMember'
import BoardMenu from '../cmps/BoardMenu'


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
        const board = this.props.currBoard
        board.members.unshift(member)
        this.props.save(board)
        this.onToggleAddMember()
    }

    onRemoveMember = memberId => {
        const board = this.props.currBoard
        const memberIdx = board.members.findIndex(member => member._id === memberId);
        board.members.splice(memberIdx, 1)
        this.props.save(board)
        this.setState({ currBoard: this.props.currBoard })
    }

    render() {
        const { board, onSetBg } = this.props
        const { isAddMemberShown, isBoardMenuShown } = this.state
        return (
            <div className="board-options-container flex align-center space-between">
                <div className="board-title">{board.title}</div>

                <div className="board-members flex">
                    {board.members.map((member, idx) => <div key={idx} className="member flex justify-center align-center" style={{ backgroundImage: `url(${member.imgUrl})`, backgroundColor: member.bgColor }}><img onClick={() => this.onRemoveMember(member._id)} src="/assets/img/close.png" className="remove-member" alt="" />{this.getTwoChars(member.fullname)}</div>)}
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
        currBoard: state.board.currBoard
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardOptions);