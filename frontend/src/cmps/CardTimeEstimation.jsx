import React from 'react'

export default class CardTimeEstimation extends React.Component {

    state = {
        timeEstimation: {
            hours: '',
            minutes: '',
            days:''
        }
    }
    componentDidMount() {
        const { timeEstimation } = this.props.card
        if(timeEstimation) this.setState({ timeEstimation })
    }

    handleChange = (ev) => {
        let { name, value } = ev.target;
        this.setState(prevState => ({ timeEstimation: { ...prevState.timeEstimation, [name]: value } }))
    }

    render() {
        const { card, onAddTimeEstimation, removeCardEstimation, onToggleAction } = this.props
        console.log('card', card);

        return (
            <div className="card-time-estimation-container">
                <h4>SELECT TIME ESTIMATION</h4>
                <div>Days:<input type="number" name="days" className="input input-time-estimation"
                    onChange={this.handleChange} autoComplete="off" value={this.state.timeEstimation.days}
                    placeholder={`${card.timeEstimation ? card.timeEstimation.days : '00'}`} />
                </div>
                <div>Hours:<input type="number" name="hours" className="input input-time-estimation"
                    onChange={this.handleChange} autoComplete="off" value={this.state.timeEstimation.hours}
                    placeholder={`${card.timeEstimation ? card.timeEstimation.hours : '00'}`} />
                </div>
                <div>Minutes:<input type="number" name="minutes" className="input input-time-estimation"
                    onChange={this.handleChange} autoComplete="off" value={this.state.timeEstimation.minutes}
                    placeholder={`${card.timeEstimation ? card.timeEstimation.minutes : '00'}`} />
                </div>
                <div className="btns-container flex space-between">
                    <button className="btn btn-primary btn-save" onClick={() => {
                        onAddTimeEstimation(this.state.timeEstimation);
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

