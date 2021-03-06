import React, { Component } from 'react'
import { connect } from 'react-redux';
import { login, signup } from '../store/actions/userActions';
import { getRandomColor } from '../services/utilService'
import { uploadImg } from '../services/cloudinaryService'
import { Link } from 'react-router-dom'

class LoginSignup extends Component {

    state = {
        user: {
            username: '',
            password: '',
            fullname: '',
            imgUrl: '',
            confirmPassword: ''
        },
        isLogin: false,
        msg: '',
        isUploadImg: false,
        isFinishUpload: false
    }

    componentDidMount() {
        // if (!this.props.loggedInUser?.isGuest) this.props.history.push('/boards')
        this.setCurrPage()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params !== this.props.match.params) {
            this.setState({
                msg: '', isUploadImg: false, isFinishUpload: false,
                user: { username: '', password: '', confirmPassword: '', fullname: '', imgUrl: '' }
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

    handleUserSubmit = async ev => {
        ev.preventDefault();
        const { username, password, fullname, imgUrl, confirmPassword } = this.state.user
        const { isLogin } = this.state

        if (!username || !password && !confirmPassword && isLogin) return this.setState({ msg: 'Please enter username and password' })
        if (!isLogin && password !== confirmPassword) return this.setState({ msg: 'Passwords don\'t match!' })
        if (!isLogin && !username && !password && !fullname) return this.setState({ msg: 'Please enter username, password and full name' });

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

        this.props.history.push('/boards')
    }

    onOpenUpload = () => {
        this.inputElement.click();
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
                    <div className="form-img-container flex">
                        <form className="login-signup-form flex column align-start" onSubmit={this.handleUserSubmit}>
                            <input type="text" onChange={this.handleChange} value={user.username} name="username" autoComplete="off" placeholder="Username" />
                            {!isLogin && <input type="text" onChange={this.handleChange} value={user.fullname} name="fullname" autoComplete="off" placeholder="Full name" />}
                            <input type="password" onChange={this.handleChange} value={user.password} name="password" placeholder="Password" />
                            {!isLogin && <input type="password" onChange={this.handleChange} value={user.confirmPassword} name="confirmPassword" placeholder="Confirm password" />}
                            {!isLogin && <input type="file" ref={input => this.inputElement = input} name="imgUrl" onChange={this.onUploadImg} hidden />}
                            <div className="img-submit-container flex align-start space-between">
                                {!isLogin && <span className="upload-img" onClick={() => this.onOpenUpload()}>Upload Profile Image</span>}
                                <button className={`btn btn-success ${isUploadImg ? 'disable' : ''}`} disabled={isUploadImg}>{isLogin ? 'Login' : 'Signup'}</button>
                            </div>
                        </form>
                        <img src="assets/img/login-signup.png" className="login-signup-img" alt="" />
                    </div>

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
