import React, { Component } from 'react'
import DueDate from './DueDate'
import LabelsPicker from './LabelsPicker'
import CardMembers from './CardMembers'
import OutsideClickHandler from 'react-outside-click-handler';



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
            case 'members':
                return 'Members'
            default:
                break;
        }
    }

    render() {
        const { isShown, card, onToggleAction, board, onChange, value, getCurrCard, addLabel, addMember } = this.props;
        
        const { action } = this.state;
        return (
            <OutsideClickHandler onOutsideClick={() => onToggleAction(action)} display={'contents'}>
                < div className="labels-container" >
                    <div className="labels-header flex space-between">
                        <h3>{this.titleToReturn(action)}</h3>
                        <button className="close-label" onClick={() => onToggleAction(action)}>X</button>
                    </div>
                    {isShown.dueDate && <DueDate onToggleAction={onToggleAction} onChange={onChange} value={value} />}
                    {isShown.label && <LabelsPicker addLabel={addLabel} onToggleAction={onToggleAction} getCurrCard={getCurrCard} />}
                    {isShown.members && <CardMembers board={board} onToggleAction={onToggleAction} getCurrCard={getCurrCard} card={card} addMember={addMember} />}
                </div >
            </OutsideClickHandler>
        )
    }
}
