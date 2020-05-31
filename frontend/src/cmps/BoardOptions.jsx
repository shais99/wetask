import React, { Component } from 'react'
import { connect } from 'react-redux'
import { save } from '../store/actions/boardActions'
import AddMember from './AddMember'
import BoardMenu from './BoardMenu'
import BoardFilter from './BoardFilter'
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

    onToggleAddMember = () => this.setState(prevState => ({ isAddMemberShown: !prevState.isAddMemberShown }))
    onToggleBoardMenu = () => this.setState(prevState => ({ isBoardMenuShown: !prevState.isBoardMenuShown }))

    onAddMember = member => {
        const { loggedInUser, currBoard } = this.props

        currBoard.members.unshift(member)
        currBoard.activities.unshift({ id: makeId(), txt: `added ${member.username} to the board`, createdAt: Date.now(), byMember: loggedInUser })
        this.props.save(currBoard)
        this.onToggleAddMember()
    }

    onRemoveMember = currMember => {
        const { loggedInUser, currBoard } = this.props

        const memberIdx = currBoard.members.findIndex(member => currMember._id === member._id);
        currBoard.members.splice(memberIdx, 1)
        currBoard.activities.unshift({ id: makeId(), txt: `removed ${currMember.username} from the board`, createdAt: Date.now(), byMember: loggedInUser })
        this.props.save(currBoard)
        this.setState({ currBoard })
    }

    render() {
        const { board, onSetBg, history, toggleShowStatistics, isShowingStatistics } = this.props;
        const { isAddMemberShown, isBoardMenuShown } = this.state;

        return (
            <div className={`board-options-container ${(isShowingStatistics) ? 'stats-margin' : ''}`}>
                <div className="board-title flex align-center justify-center">{board.title}</div>

                <div className="board-members flex">
                    {board.members.map((member, idx) => <div key={idx} className="member flex justify-center align-center" style={{ backgroundImage: `url(${member.imgUrl})`, backgroundColor: member.bgColor }}><img onClick={() => this.onRemoveMember(member)} src="/assets/img/close.png" className="remove-member" alt="" /><span className="member-two-chars">{this.getTwoChars(member.fullname)}</span></div>)}
                </div>

                <div className="board-options flex">
                    <BoardFilter history={history} />

                    <button className="option flex align-center" onClick={() => this.onToggleAddMember()}>
                        <img src="/assets/img/add-user.png" alt="" />
                    </button>
                    <button className="option flex align-center" onClick={() => this.onToggleBoardMenu()}>
                        <img src="/assets/img/menu.png" alt="" />
                    </button>
                </div>
                {isAddMemberShown && <AddMember onClose={this.onToggleAddMember} onAddMember={this.onAddMember} />}
                {<BoardMenu toggleShowStatistics={toggleShowStatistics} isOpen={isBoardMenuShown} history={history}
                    onSetBg={onSetBg} board={board} onClose={this.onToggleBoardMenu} isShowingStatistics={isShowingStatistics} />}

            </div>
        )
    }
}

const mapDispatchToProps = {
    save
}
const mapStateToProps = (state) => {
    return {
        currBoard: state.board.currBoard,
        loggedInUser: state.user.loggedInUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardOptions);