import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadUsers } from '../store/actions/userActions'
import Loader from './Loader'
import OutsideClickHandler from 'react-outside-click-handler';

class AddMember extends Component {

    state = {
        filterBy: {
            board: null,
            q: ''
        }
    }

    componentDidMount() {
        this.setState({ filterBy: { board: this.props.currBoard, q: '' } }, () => this.props.loadUsers(this.state.filterBy))
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.loadUsers(this.state.filterBy)
        })
    }

    render() {
        const { users, onClose, onAddMember } = this.props
        const { filterBy } = this.state

        return ((!users) ? <Loader /> :
            <OutsideClickHandler onOutsideClick={() => onClose()} display={'contents'}>
                <div className="add-member-container slide-bottom">
                    <div className="add-member-title flex space-between align-center">
                        Add Members
                    <img src="/assets/img/close-white.png" className="close-icon" onClick={() => onClose()} alt="" />
                    </div>
                    <input type="text" placeholder="Enter user name" autoComplete="off" name="q" value={filterBy.q} onChange={this.handleChange} className="add-member-input" />
                    <div className="members-list flex column">
                        {users.map((user, idx) => <Link to="#" key={idx} onClick={() => onAddMember(user)} className="single-member">{user.username}</Link>)}
                    </div>
                </div>
            </OutsideClickHandler>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.user.users,
        currBoard: state.board.currBoard
    }
}

const mapDispatchToProps = {
    loadUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);