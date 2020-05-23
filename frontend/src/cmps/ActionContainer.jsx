import React, { Component } from 'react'
import DueDate from './DueDate'
import LabelsPicker from './LabelsPicker'
import { render } from '@testing-library/react'

export default class ActionContainer extends Component {
    state = {
        action: null
    }

    componentDidMount() {
        this.checkAction();
    }

    checkAction() {
        const actions = this.props.isShown
        for (const key in actions) {
            if (actions[key]) {
                this.setState({ action: key });
            }
        }
    }

    titleToReturn(key) {
        switch (key) {
            case 'dueDate':
                return 'Change Due Date'
            case 'label':
                return 'Labels'
            default:
                break;
        }
    }

    render() {
        const { isShown } = this.props;
        const { props } = this;
        const { action } = this.state;
        return (
            < div className="labels-container" >
                <div className="labels-header flex space-between">
                    <h3>{this.titleToReturn(action)}</h3>
                    <button className="close-label" onClick={() => props.onToggleAction(action)}>X</button>
                </div>
                {isShown.dueDate && <DueDate onToggleAction={props.onToggleAction} onChange={props.onChangeDate} value={props.value} />}
                {isShown.label && <LabelsPicker addLabel={props.addLabel} onToggleAction={props.onToggleAction} getCurrCard={props.getCurrCard} />}
            </div >
        )
    }
}
