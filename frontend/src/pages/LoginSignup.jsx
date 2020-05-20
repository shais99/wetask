import React, { Component } from 'react'
import userService from '../services/userService'

export default class LoginSignup extends Component {

    state = {
        user: {

        },
        isLogin: false
    }

    // handleChange = (ev) => {
    //     const field = ev.target.name
    //     let value;
    //     switch (ev.target.type) {
    //         case 'checkbox':
    //             value = ev.target.checked
    //             break;
    //         case 'number':
    //             value = +ev.target.value
    //             break;
    //         case 'file':
    //             userService.uploadImg(ev)
    //                 .then(imgUrl => value = this.setState(prevState => ({ toy: { ...prevState.toy, imgUrl } })))
    //             return;
    //         default:
    //             value = ev.target.value
    //             break;
    //     }
    // }

    render() {
        return (
            <div className="top-p container flex justify-center">
                <div className="form-container">
                    <h2 className="form-title">Signup</h2>
                    <form className="login-signup-form flex column align-start">
                        <input type="text" name="username" autoComplete="off" placeholder="Username" />
                        <input type="text" name="fullname" autoComplete="off" placeholder="Full name" />
                        <input type="password" name="password" placeholder="Password" />
                        <input type="file" name="imgUrl" onChange={this.handleChange} />
                        <button>Signup</button>
                    </form>
                </div>
            </div>
        )
    }
}
