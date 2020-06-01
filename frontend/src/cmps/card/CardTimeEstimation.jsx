import React from 'react'
import { makeId } from '../../services/utilService'

export default class CardTimeEstimation extends React.Component {

    state = {
        timeEstimation: {
            hours: '',
            minutes: '',
            days: ''
        }
    }
    componentDidMount() {
        const { timeEstimation } = this.props.card
        if (timeEstimation) this.setState({ timeEstimation })
    }

    handleChange = (ev) => {
        let { name, value } = ev.target;
        this.setState(prevState => ({ timeEstimation: { ...prevState.timeEstimation, [name]: value } }))
    }

    onAddTimeEstimation = (timeEstimation) => {
        const { loggedInUser, card, saveCard } = this.props
        const newCard = { ...card }

        timeEstimation.approved = false;
        newCard.timeEstimation = timeEstimation
        newCard.activities.unshift({
            id: makeId(), txt: `added time estimation to card`,
            createdAt: Date.now(), byMember: loggedInUser
        })
        saveCard(newCard)
    }

    removeCardEstimation = () => {
        const { loggedInUser, card, saveCard } = this.props
        const newCard = { ...card }
        newCard.timeEstimation = null
        newCard.activities.unshift({
            id: makeId(), txt: `removed time estimation from the card`,
            createdAt: Date.now(), byMember: loggedInUser
        })
        saveCard(newCard)
    }

    render() {
        const { onToggleAction, card } = this.props
        const { onAddTimeEstimation, removeCardEstimation } = this
        const { timeEstimation } = this.state

        return (
            <div className="card-time-estimation-container">
                <h4>SELECT TIME ESTIMATION</h4>
                <div>Days:<input type="number" name="days" className="input input-time-estimation"
                    onChange={this.handleChange} autoComplete="off" value={timeEstimation.days}
                    placeholder={`${card.timeEstimation ? card.timeEstimation.days : '00'}`} />
                </div>
                <div>Hours:<input type="number" name="hours" className="input input-time-estimation"
                    onChange={this.handleChange} autoComplete="off" value={timeEstimation.hours}
                    placeholder={`${card.timeEstimation ? card.timeEstimation.hours : '00'}`} />
                </div>
                <div>Minutes:<input type="number" name="minutes" className="input input-time-estimation"
                    onChange={this.handleChange} autoComplete="off" value={timeEstimation.minutes}
                    placeholder={`${card.timeEstimation ? card.timeEstimation.minutes : '00'}`} />
                </div>
                <div className="btns-container flex space-between">
                    <button className="btn btn-primary btn-save" onClick={() => {
                        onAddTimeEstimation(timeEstimation);
                        onToggleAction('timeEstimation');
                    }}>Save</button>
                    <button className="btn btn-danger btn-remove" onClick={() => {
                        removeCardEstimation()
                        onToggleAction('timeEstimation');
                    }}>Remove</button>
                </div>
            </div>

        )
    }

}

