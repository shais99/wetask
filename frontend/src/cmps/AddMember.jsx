import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadUsers } from '../store/actions/userActions'

class AddMember extends Component {

    componentDidMount() {
        this.props.loadUsers()
    }

    render() {
        const { users, onClose } = this.props

        return ((!users) ? 'Loading...' :
            <div className="add-member-container slide-bottom">
                <div className="add-member-title flex space-between align-center">
                    Add Members
                    <img src="/assets/img/close-white.png" className="close-icon" onClick={() => onClose()} alt="" />
                </div>
                <input type="text" placeholder="Enter user name" className="add-member-input" />
                <div className="members-list">
                    {users.map((user, idx) => <div key={idx} className="single-member">{user.username}</div>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.user.users
    }
}

const mapDispatchToProps = {
    loadUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);