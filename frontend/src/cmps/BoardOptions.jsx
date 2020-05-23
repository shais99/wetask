import React, { Component } from 'react'
import { connect } from 'react-redux'
import { save, loadBoard } from '../store/actions/boardActions'
import AddMember from '../cmps/AddMember'


class BoardOptions extends Component {

    state = {
        isAddMemberShown: false
    }

    componentDidUpdate(prevProps) {
        const { currBoard } = this.props
        if (prevProps.currBoard !== currBoard) this.props.loadBoard(currBoard._id)
    }


    getTwoChars(str) {
        let twoChars;
        if (str.split(' ').length !== 2) twoChars = str?.charAt(0)
        else twoChars = str?.charAt(0) + str.split(' ')[1].charAt(0)
        if (!twoChars) twoChars = ''
        return twoChars
    }

    onToggleAddMember = () => {
        this.setState(prevState => ({ isAddMemberShown: !prevState.isAddMemberShown }))
    }

    onAddMember = member => {
        const board = this.props.currBoard
        board.members.unshift(member)
        this.props.save(board)
        this.onToggleAddMember()
    }

    onRemoveMember = async memberId => {
        const board = this.props.currBoard
        const memberIdx = board.members.findIndex(member => member._id === memberId);
        board.members.splice(memberIdx, 1)
        this.props.save(board)
        this.props.loadBoard(board._id)
    }

    render() {
        const { board } = this.props
        const { isAddMemberShown } = this.state
        return (
            <div className="board-options-container flex align-center space-between">
                <div className="board-title">{board.title}</div>

                <div className="board-members flex">
                    {board.members.map((member, idx) => <div key={idx} className="member flex justify-center align-center" style={{ backgroundImage: `url(${member.imgUrl})`, backgroundColor: member.bgColor }}><img onClick={() => this.onRemoveMember(member._id)} src="/assets/img/close.png" className="remove-member" alt="" />{this.getTwoChars(member.fullname)}</div>)}
                </div>

                <div className="board-options flex">
                    <button className="option flex align-center" onClick={() => this.onToggleAddMember()}>
                        <img src="/assets/img/add-user.png" alt="" /> Add member
                    </button>
                </div>
                {isAddMemberShown && <AddMember onClose={this.onToggleAddMember} onAddMember={this.onAddMember} />}

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