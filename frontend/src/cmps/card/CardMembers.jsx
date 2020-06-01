import React from 'react'
import { makeId } from '../../services/utilService'

export default class CardMembers extends React.Component {
    state = {
        byMember: ''
    }

    handleChange = (ev) => {
        let { value } = ev.target;
        this.setState(({ byMember: value }))
    };

    isMemberChecked = (memberId) => {
        if (this.props.card.members.find(member => memberId === member._id)) return true
        return false
    }

    getMembers = () => {
        let searchBy = this.state.byMember;
        if (searchBy) return this.props.board.members.filter(member => member.username.includes(searchBy))

        return this.props.board.members;
    }

    getTwoChars(str) {
        let twoChars;
        if (str.split(' ').length !== 2) twoChars = str?.charAt(0)
        else twoChars = str?.charAt(0) + str.split(' ')[1].charAt(0)
        if (!twoChars) twoChars = ''
        return twoChars
    }

    onAddMember = (currMember) => {
        const { loggedInUser, card } = this.props
        const newCard = { ...card }
        const memberIdx = newCard.members.findIndex(member => member._id === currMember._id);

        if (memberIdx === -1) {

            newCard.activities.unshift({
                id: makeId(), txt: `add member:  ${currMember.username} to the card`,
                createdAt: Date.now(), byMember: loggedInUser
            })
            newCard.members.push(currMember)
        }
        else {
            newCard.activities.unshift({
                id: makeId(), txt: `removed member:  ${currMember.username} from the card`,
                createdAt: Date.now(), byMember: loggedInUser
            })
            newCard.members.splice(memberIdx, 1)
        }
        this.props.saveCard(newCard)
    }

    render() {
        const { getMembers } = this
        return (
            <div className="card-members-container">
                <div className="search-input">
                    <input type="text" className="input search-members" value={this.state.byMember} autoComplete="off"
                        placeholder="Search member" onChange={this.handleChange} />
                </div>
                <div className="members-list-container">
                    <h4>BOARD MEMBERS</h4>
                    <div className="members-list">
                        {getMembers().map(member => {
                            return <div key={member._id}
                                className="member-item flex space-between align-center" onClick={() => this.onAddMember(member)}>
                                <div className="flex align-center">
                                    <div className="member flex justify-center align-center" style={{
                                        backgroundImage: `url(${member.imgUrl})`,
                                        backgroundColor: member.bgColor
                                    }}>
                                        <span className="member-two-chars">{this.getTwoChars(member.fullname)}</span>
                                    </div>
                                    <span className="members-card-title">{member.username}</span>
                                </div>
                                {this.isMemberChecked(member._id) ? <img src="/assets/img/icon-checked.png" /> : ''}
                            </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }

}

