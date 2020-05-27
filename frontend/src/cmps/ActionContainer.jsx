import React, { Component } from 'react'
import DueDate from './DueDate'
import LabelsPicker from './LabelsPicker'
import CardMembers from './CardMembers'
import CardMove from './CardMove'
import StackMenu from './StackMenu'
import OutsideClickHandler from 'react-outside-click-handler';



export default class ActionContainer extends Component {
    state = {
        action: null
    }

    componentDidMount() {
        this.checkAction();
    }

    checkAction() {
        const actions = this.props.isShown;
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
            case 'stack':
                return this.props.stackInfo.title
            default:
                break;
        }
    }

    render() {
        const { isShown, card, onToggleAction, board, onChange, value, onSubmitDate, getCurrCard, addLabel, addMember, removeDueDate, moveCardToStack, stackInfo, onStackRemove } = this.props;

        const { action } = this.state;

        return (
            <OutsideClickHandler onOutsideClick={() => onToggleAction(action)} display={'contents'}>
                < div className="labels-container" >
                    <div className="labels-header flex space-between align-center">
                        <h3>{this.titleToReturn(action)}</h3>
                        <button className="close-label" onClick={() => onToggleAction(action)}>X</button>
                    </div>
                    {isShown.dueDate && <DueDate onChange={onChange} value={value} onToggleAction={onToggleAction} removeDueDate={removeDueDate} onSubmitDate={onSubmitDate} />}
                    {isShown.label && <LabelsPicker addLabel={addLabel} getCurrCard={getCurrCard} />}
                    {isShown.members && <CardMembers board={board} getCurrCard={getCurrCard} card={card} addMember={addMember} />}
                    {isShown.move && <CardMove board={board} card={card} moveCardToStack={moveCardToStack} />}
                    {isShown.stack && <StackMenu board={board} stackId={stackInfo.id} onStackRemove={onStackRemove} />}
                </div >
            </OutsideClickHandler>
        )
    }
}
