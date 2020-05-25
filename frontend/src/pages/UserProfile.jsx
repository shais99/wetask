import React, { Component } from 'react'
import { connect } from 'react-redux'
import { update, login } from '../store/actions/userActions';
import { uploadImg } from '../services/cloudinaryService'

class UserProfile extends Component {

    state = {
        user: null,
        msg: '',
        isUploadImg: false,
        isFinishUpload: false,
        isErrorMsg: false
    }

    componentDidMount() {
        const { loggedInUser, history } = this.props
        if (!loggedInUser) history.push('/login')
        this.setState({ user: loggedInUser })
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutFinishUpload)
    }

    onUploadImg = async ev => {
        this.setState({ isUploadImg: true })
        const imgUrl = await uploadImg(ev)
        this.setState({ isUploadImg: false, isFinishUpload: true })
        this.timeoutFinishUpload = setTimeout(() => {
            this.setState({ isFinishUpload: false })
        }, 2500);
        this.setState(prevState => ({ user: { ...prevState.user, imgUrl } }))
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({ user: { ...prevState.user, [field]: value } }))
    }

    onUpdateUser = async ev => {
        ev.preventDefault();
        const { username, password, fullname, imgUrl, confirmPassword } = this.state.user

        if (!username || !password || !fullname) return this.setState({ msg: 'Please enter username, password and full name', isErrorMsg: true });
        if (!password && !confirmPassword) return this.setState({ msg: 'Please enter username and password', isErrorMsg: true })
        if (password !== confirmPassword) return this.setState({ msg: 'Passwords don\'t match!', isErrorMsg: true })

        const user = { _id: this.props.loggedInUser._id, username, password, fullname, imgUrl }
        try {
            await this.props.update(user)
            user._id = this.props.loggedInUser._id
            await this.props.login(user)
        } catch (err) {
            return this.setState({ isErrorMsg: true, msg: err })
        }

        return this.setState({ isErrorMsg: false, msg: 'User Updated Successfully' }, () => {
            setTimeout(() => {
                this.props.history.go(0)
                this.setState({ msg: '' })
            }, 2000);
        })
    }

    render() {
        const { user, msg, isErrorMsg, isUploadImg } = this.state

        const msgStyle = (isErrorMsg) ? { backgroundColor: '#dd1739' } : { backgroundColor: '#17d965' }

        if (!user) return 'Loading...'
        return (
            <div className="container flex justify-center">
                <div className="form-container">
                    <div className="user-profile-container flex align-start">
                        <div className="user-content">
                            <h2 className="user-profile-title flex align-center">
                                <img src="assets/img/user-icon.png" className="user-icon" alt="" /> {this.props.loggedInUser.fullname}
                            </h2>
                            <form onSubmit={this.onUpdateUser} className="user-profile-form flex column align-start">
                                <input type="text" placeholder="User name" autoComplete="off" onChange={this.handleChange} className="profile-input input" name="username" value={user.username} />
                                <input type="text" placeholder="Full name" autoComplete="off" onChange={this.handleChange} className="profile-input input" name="fullname" value={user.fullname} />
                                <input type="password" placeholder="Password" autoComplete="off" onChange={this.handleChange} className="profile-input input" name="password" />
                                <input type="password" placeholder="Confirm Password" autoComplete="off" onChange={this.handleChange} className="profile-input input" name="confirmPassword" />
                                <input type="file" name="imgUrl" className="profile-input" onChange={this.onUploadImg} />

                                <button className={`btn btn-primary ${isUploadImg ? 'disable' : ''}`} disabled={isUploadImg}>Save Changes</button>

                            </form>
                            {msg && <div style={msgStyle} className="user-msg flex align-center space-between">{msg}<img src="assets/img/error-white.png" className="small-icon" alt="" /></div>}
                        </div>
                        <div className="user-img">
                            <img src={user.imgUrl} alt="" />
                        </div>
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
const mapDispatchToProps = {
    update,
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);