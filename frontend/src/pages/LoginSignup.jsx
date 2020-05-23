import React, { Component } from 'react'
import userService from '../services/userService'
import { connect } from 'react-redux';
import { login, signup } from '../store/actions/userActions';
import { getRandomColor } from '../services/utilService'
import { Link } from 'react-router-dom'

class LoginSignup extends Component {

    state = {
        user: {
            username: '',
            password: '',
            fullname: '',
            imgUrl: ''
        },
        isLogin: false,
        msg: '',
        isUploadImg: false,
        isFinishUpload: false
    }

    componentDidMount() {
        if (this.props.loggedInUser) this.props.history.push('/boards')
        this.setCurrPage()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params !== this.props.match.params) {
            this.setState({
                msg: '', isUploadImg: false, isFinishUpload: false,
                user: { username: '', password: '', fullname: '', imgUrl: '' }
            })
            this.setCurrPage()
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutFinishUpload)
    }

    setCurrPage = () => {
        const isLogin = (this.props.match.path === '/login') ? true : false
        this.setState({ isLogin })
    }

    onUploadImg = async ev => {
        this.setState({ isUploadImg: true })
        const imgUrl = await userService.uploadImg(ev)
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

    handleUserSubmit = async ev => {
        ev.preventDefault();
        const { username, password, fullname, imgUrl } = this.state.user
        if (!username || !password) {
            return this.setState({ msg: 'Please enter username and password' });
        }

        const userCred = { username, password, fullname, imgUrl }
        try {
            if (this.state.isLogin) await this.props.login(userCred)
            else {
                userCred.bgColor = getRandomColor()
                await this.props.signup(userCred)
            }
        } catch (err) {
            return this.setState({ msg: err })
        }

        this.setState({ user: { username: '', password: '' } })
        this.props.history.push('/boards')
    }

    render() {
        const { isLogin, msg, user, isUploadImg, isFinishUpload } = this.state
        return (
            <div className="container flex column align-center">
                <div className="form-container">
                    <h2 className="form-title">{isLogin ? 'Login' : 'Signup'}</h2>

                    {isLogin && <div className="signup-login-link"><Link to="/signup">Sign up for an account</Link></div>}
                    {!isLogin && <div className="signup-login-link"><Link to="/login">Already have an account? Sign in</Link></div>}
                    {isFinishUpload && <div className="img-uploaded-msg flex align-center space-between">Your image was uploaded successfully! <img src="assets/img/success.png" className="small-icon" alt="" /></div>}

                    <form className="login-signup-form flex column align-start" onSubmit={this.handleUserSubmit}>
                        <input type="text" onChange={this.handleChange} value={user.username} name="username" autoComplete="off" placeholder="Username" />
                        {!isLogin && <input type="text" onChange={this.handleChange} value={user.fullname} name="fullname" autoComplete="off" placeholder="Full name" />}
                        <input type="password" onChange={this.handleChange} value={user.password} name="password" placeholder="Password" />
                        {!isLogin && <input type="file" name="imgUrl" onChange={this.onUploadImg} />}
                        <button className={`btn btn-primary ${isUploadImg ? 'disable' : ''}`} disabled={isUploadImg}>{isLogin ? 'Login' : 'Signup'}</button>
                    </form>

                    {msg && <div className="user-msg flex align-center space-between">{msg}<img src="assets/img/error-white.png" className="small-icon" alt="" /></div>}
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
