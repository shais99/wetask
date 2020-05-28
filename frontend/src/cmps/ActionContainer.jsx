import React, { Component } from 'react'
import DueDate from './DueDate'
import LabelsPicker from './LabelsPicker'
import CardMembers from './CardMembers'
import CardMove from './CardMove'
import CardTimeEstimation from './CardTimeEstimation'
import StackMenu from './StackMenu'
import CardBgColor from './CardBgColor'
import OutsideClickHandler from 'react-outside-click-handler';
import CardChangeLabel from './CardChangeLabel'



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
                return 'Add Members'
            case 'move':
                return 'Move Card'
            case 'timeEstimation':
                return 'Time Estimation'
            case 'stack':
                return this.props.stackInfo.title
            case 'bgColor':
                return 'Change Background Color'
            default:
                break;
        }
    }

    render() {
        const { isShown, card, onToggleAction, board, onChange, value, onSubmitDate,
            getCurrCard, addLabel, addMember, removeDueDate, moveCardToStack,
            onAddTimeEstimation, removeCardEstimation, stackInfo, onStackRemove,
            onChangeBgColor, onChagneLabelColor } = this.props;


        const { action, labelId } = this.state;

        return (
            <OutsideClickHandler onOutsideClick={() => onToggleAction(action)} display={'contents'}>
                < div className="action-container" >
                    <div className="action-header flex space-between align-center">
                        <h3>{this.titleToReturn(action)}</h3>
                        <button className="close-label" onClick={() => onToggleAction(action)}>
                            <img src="/assets/img/close.png" alt="" />
                        </button>
                    </div>
                    {isShown.label && <LabelsPicker onChagneLabelColor={onChagneLabelColor} addLabel={addLabel} card={card} onToggleAction={onToggleAction} />}
                    {isShown.dueDate && <DueDate onChange={onChange} value={value} onToggleAction={onToggleAction} removeDueDate={removeDueDate} onSubmitDate={onSubmitDate} />}
                    {isShown.members && <CardMembers board={board} getCurrCard={getCurrCard} card={card} addMember={addMember} />}
                    {isShown.bgColor && <CardBgColor board={board} getCurrCard={getCurrCard} card={card} onChangeBgColor={onChangeBgColor} />}
                    {isShown.move && <CardMove board={board} card={card} moveCardToStack={moveCardToStack} />}
                    {isShown.timeEstimation && <CardTimeEstimation card={card} onToggleAction={onToggleAction}
                        onAddTimeEstimation={onAddTimeEstimation} removeCardEstimation={removeCardEstimation} />}
                    {isShown.stack && <StackMenu board={board} stackId={stackInfo.id} onStackRemove={onStackRemove} />}
                </div >
            </OutsideClickHandler>
        )
    }
}
