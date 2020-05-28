import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class CardDescription extends Component {

    state = {
        textAreaHeight: 35,
        textAreaMinHeight: 0
    }

    componentDidMount() {
        if (this.props.description.split(/\r\n|\r|\n/).length < 5) this.setState({ textAreaMinHeight: '50px' })
        else this.setState({ textAreaMinHeight: '150px' })
    }

    setDescHeight = (ev) => {
        if (ev.keyCode === 13) this.setState(prevState => ({ textAreaHeight: 20 + prevState.textAreaHeight }))
    }

    render() {
        return (
            <div className="card-desc-container">


                <div className="card-mini-title flex align-center">
                    <img src="/assets/img/description.png" alt=""></img>
                    <label className="card-txt-title" htmlFor="cardDesc">Description:</label>
                </div>

                <form className="main-content-card-action" onSubmit={this.props.onSaveDesc}>
                    <textarea name="description" value={this.props.description} onChange={this.props.handleChange}
                        onFocus={() => this.props.isShown(true)} className="card-desc" onKeyUp={this.setDescHeight} style={{ minHeight: this.state.textAreaMinHeight, height: this.state.textAreaHeight }} id="cardDesc" placeholder="Add your card description...">
                    </textarea>
                    {this.props.isSubmitShown && <div className="desc-btns-container flex align-center">
                        <button className="btn btn-primary btn-save-desc">Save Changes</button>
                        <Link to="#" className="cancel-changes" onClick={() => this.props.isShown(false, true)}>
                            <img className="close-btn-desc" src="/assets/img/close.png" alt="" />
                        </Link>
                    </div>}
                </form>
            </div>
        )
    }
}