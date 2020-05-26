import React, { Component } from 'react'
import DueDate from './DueDate'
import LabelsPicker from './LabelsPicker'
import CardMembers from './CardMembers'
import CardMove from './CardMove'
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
            case 'move':
                return 'Move'
            default:
                break;
        }
    }

    render() {
<<<<<<< HEAD
        const { isShown, card, onToggleAction,onSubmit, board, onChange, value, getCurrCard, addLabel, addMember, removeDuedate, moveCardToStack } = this.props;
=======
        const { isShown, card, onToggleAction, board, onChange, value, getCurrCard, addLabel, addMember, removeDueDate, moveCardToStack } = this.props;
>>>>>>> 5a1504f04df16a910429c949845328112c8b080f

        const { action } = this.state;
        return (
            <OutsideClickHandler onOutsideClick={() => onToggleAction(action)} display={'contents'}>
                < div className="labels-container" >
                    <div className="labels-header flex space-between">
                        <h3>{this.titleToReturn(action)}</h3>
                        <button className="close-label" onClick={() => onToggleAction(action)}>X</button>
                    </div>
<<<<<<< HEAD
                    {isShown.dueDate && <DueDate onChange={onChange} onSubmit={onSubmit} value={value} onToggleAction={onToggleAction} removeDuedate={removeDuedate} />}
=======
                    {isShown.dueDate && <DueDate onChange={onChange} value={value} onToggleAction={onToggleAction} removeDueDate={removeDueDate} />}
>>>>>>> 5a1504f04df16a910429c949845328112c8b080f
                    {isShown.label && <LabelsPicker addLabel={addLabel} getCurrCard={getCurrCard} />}
                    {isShown.members && <CardMembers board={board} getCurrCard={getCurrCard} card={card} addMember={addMember} />}
                    {isShown.move && <CardMove board={board} card={card} moveCardToStack={moveCardToStack} />}
                </div >
            </OutsideClickHandler>
        )
    }
}
