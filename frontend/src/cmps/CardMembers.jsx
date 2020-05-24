import React from 'react'

export default class CardMembers extends React.Component {
    state = {
        byMember: ''
    }

    handleChange = (ev) => {
        let { value } = ev.target;
        this.setState(({ byMember: value }))
    };

    isMemberChecked = (memberId) => {
        const currCard = this.props.getCurrCard();

        if (currCard.members.find(member => memberId === member._id)) return true
        return false
    }

    getMembers = () => {
        let searchBy = this.state.byMember;
        if (searchBy) return this.props.board.members.filter(member => member.username.includes(searchBy))

        return this.props.board.members;
    }

    render() {
        const { addMember } = this.props
        const { getMembers } = this
        return (
            <div className="card-members-container">
                <div className="search-input">
                    <input type="text" className="input" value={this.state.byMember} autoComplete="off"
                        placeholder="Search member" onChange={this.handleChange} />
                </div>
                <div className="members-list-container">
                    <h4>BOARD MEMBERS</h4>
                    <div className="members-list">
                        {getMembers().map(member => {
                            return <div key={member._id} className="member-item flex space-between" onClick={() => addMember(member)}>
                                {member.username} {this.isMemberChecked(member._id) ? <img src="/assets/img/icon-checked-black.png" /> : ''}
                            </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }

}

