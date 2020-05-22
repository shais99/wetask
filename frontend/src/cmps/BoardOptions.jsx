import React, { Component } from 'react'
import AddMember from '../cmps/AddMember'


export default class BoardOptions extends Component {

    state = {
        isAddMemberShown: false
    }

    getTwoChars(str) {
        return str.charAt(0) + str.split(' ')[0].charAt(0)
    }

    onToggleAddMember = () => {
        this.setState(prevState => ({ isAddMemberShown: !prevState.isAddMemberShown }))
    }

    render() {
        const { board } = this.props
        const { isAddMemberShown } = this.state
        return (
            <div className="board-options-container flex align-center space-between">
                <div className="board-title">{board.title}</div>

                <div className="board-members flex">
                    {board.members.map((member,idx) => <div key={idx} className="member" style={{ backgroundImage: `url(${member.imgUrl})`, backgroundColor: member.bgColor }}>{this.getTwoChars(member.fullname)}</div>)}
                </div>

                <div className="board-options flex">
                    <button className="option flex align-center" onClick={() => this.onToggleAddMember()}>
                        <img src="/assets/img/add-user.png" alt="" /> Add member
                    </button>
                </div>
                {isAddMemberShown && <AddMember onClose={this.onToggleAddMember} />}

            </div>
        )
    }
}
