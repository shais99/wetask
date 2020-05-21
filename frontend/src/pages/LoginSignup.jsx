import React, { Component } from 'react'
import userService from '../services/userService'
import { connect } from 'react-redux';
import { login, signup } from '../store/actions/userActions';

class LoginSignup extends Component {

    state = {
        user: {
            username: '',
            password: '',
            fullname: '',
            imgUrl: ''
        },
        isLogin: false,
        msg: ''
    }

    componentDidMount() {
        if (this.props.loggedInUser) this.props.history.push('/boards')
        console.log(this.props.match.path)
        const isLogin = (this.props.match.path === '/login') ? true : false
        this.setState({ isLogin })
    }

    // this.userMsgBg = (this.state.isLogin ? '#20bf6b' : '#e92447')

    onUploadImg = async ev => {
        const imgUrl = await userService.uploadImg(ev)
        this.setState(prevState => ({ user: { ...prevState.user, imgUrl } }))
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({ user: { ...prevState.user, [field]: value } }))
    }

    handleUserSubmit = async ev => {
        ev.preventDefault();
        const { username, password, fullname, imgUrl } = this.state.user
        if (!username || !password) {
            return this.setState({ msg: 'Please enter username and password' });
        }

        const userCred = { username, password, fullname, imgUrl }
        try {
            if (this.state.isLogin) await this.props.login(userCred)
            else await this.props.signup(userCred)
        } catch (err) {
            return this.setState({ msg: err })
        }

        this.setState({ user: { username: '', password: '' } })
        this.props.history.push('/boards')
    }

    render() {
        const { isLogin, msg, user } = this.state
        return (
            <div className="container flex column align-center">
                <div className="form-container">
                    <h2 className="form-title">{isLogin ? 'Login' : 'Signup'}</h2>
                    <form className="login-signup-form flex column align-start" onSubmit={this.handleUserSubmit}>
                        <input type="text" onChange={this.handleChange} value={user.username} name="username" autoComplete="off" placeholder="Username" />
                        {!isLogin && <input type="text" onChange={this.handleChange} value={user.fullname} name="fullname" autoComplete="off" placeholder="Full name" />}
                        <input type="password" onChange={this.handleChange} value={user.password} name="password" placeholder="Password" />
                        {!isLogin && <input type="file" name="imgUrl" onChange={this.onUploadImg} />}
                        <button>{isLogin ? 'Login' : 'Signup'}</button>
                    </form>
                    {msg && <div className="user-msg">{msg}</div>}
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
    signup,
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginSignup);
