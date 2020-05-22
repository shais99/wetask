import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserProfile extends Component {

    componentDidMount() {
        if (!this.props.loggedInUser) this.props.history.push('/login')
    }



    render() {
        const { loggedInUser } = this.props
        return (
            <div className="container flex justify-center">
                <div className="form-container">
                    <div className="user-profile-container flex align-start">
                        <img src={loggedInUser.imgUrl} className="user-img" alt="" />
                        <h2 className="user-profile-title flex align-center"><img src="assets/img/user-icon.png" className="user-icon" alt="" />{loggedInUser.fullname}</h2>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser
    };
};

export default connect(mapStateToProps)(UserProfile);