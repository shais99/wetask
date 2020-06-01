import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { makeId } from '../../services/utilService'


export default class CardDescription extends Component {

    state = {
        description: '',
        textAreaHeight: 35,
        textAreaMinHeight: 0,
        isSubmitShown: false
    }

    componentDidMount() {
        const { card } = this.props
        this.loadDesc()
        if (card.description.split(/\r\n|\r|\n/).length < 5) this.setState({ textAreaMinHeight: '50px' })
        else this.setState({ textAreaMinHeight: '150px' })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.card.description !== this.props.card.description) this.loadDesc()
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState({ description: value })
    }

    loadDesc = () => {
        this.setState({ description: this.props.card.description })
    }

    setDescHeight = (ev) => {
        if (ev.keyCode === 13) this.setState(prevState => ({ textAreaHeight: 20 + prevState.textAreaHeight }))
    }

    onSaveDesc = (ev) => {
        ev.preventDefault()

        const newCard = { ...this.props.card }
        newCard.activities.unshift({
            id: makeId(), txt: `edited card description`,
            createdAt: Date.now(), byMember: this.props.loggedInUser
        })
        newCard.description = this.state.description
        this.props.saveCard(newCard)
        this.onSetSubmitShown(false)
    }

    onSetSubmitShown = (isShown, isPrevDesc) => {
        this.setState({ isSubmitShown: isShown })
        if (!isShown && isPrevDesc) this.loadDesc()
    }

    render() {
        const { isSubmitShown, description } = this.state
        return (
            <div className="card-desc-container">

                <div className="card-mini-title flex align-center">
                    <img src="/assets/img/description.png" alt=""></img>
                    <label className="card-txt-title" htmlFor="cardDesc">Description</label>
                </div>

                <form className="main-content-card-action" onSubmit={this.onSaveDesc}>
                    <textarea name="description" value={description} onChange={this.handleChange}
                        onFocus={() => this.onSetSubmitShown(true)} className="card-desc" onKeyUp={this.setDescHeight} style={{ minHeight: this.state.textAreaMinHeight, height: this.state.textAreaHeight }} id="cardDesc" placeholder="Add your card description...">
                    </textarea>
                    {isSubmitShown && <div className="desc-btns-container flex align-center">
                        <button className="btn btn-primary btn-save-desc">Save Changes</button>
                        <Link to="#" className="cancel-changes" onClick={() => this.onSetSubmitShown(false, true)}>
                            <img className="close-btn-desc" src="/assets/img/close.png" alt="" />
                        </Link>
                    </div>}
                </form>
            </div>
        )
    }
}