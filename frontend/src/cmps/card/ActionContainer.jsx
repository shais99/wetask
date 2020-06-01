import React, { Component } from 'react'
import DueDate from './DueDate'
import LabelsPicker from './LabelsPicker'
import CardMembers from './CardMembers'
import CardMove from './CardMove'
import CardTimeEstimation from './CardTimeEstimation'
import StackMenu from '../stack/StackMenu'
import CardBgColor from './CardBgColor'
import OutsideClickHandler from 'react-outside-click-handler';
import { saveCard, save } from '../../store/actions/boardActions'
import { connect } from 'react-redux'



class ActionContainer extends Component {
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
                return this.props.stack.title
            case 'bgColor':
                return 'Change Background Color'
            default:
                break;
        }
    }

    render() {
        const { isShown, currCard, onToggleAction, currBoard, onChange, value, moveCardToStack,
            onAddTimeEstimation, removeCardEstimation, stack, onStackRemove,
            onChangeBgColor, dueDateNotSave, saveCard, loggedInUser, save } = this.props;

        const { action } = this.state;

        return (
            <OutsideClickHandler onOutsideClick={() => onToggleAction(action)} display={'contents'}>
                <div className="action-container">
                    <div className="action-header flex space-between align-center">
                        <h3>{this.titleToReturn(action)}</h3>
                        <button className="close-label" onClick={() => onToggleAction(action)}>
                            <img src="/assets/img/close.png" alt="" />
                        </button>
                    </div>
                    {isShown.label && <LabelsPicker saveCard={saveCard} save={save} loggedInUser={loggedInUser} card={currCard} board={currBoard} onToggleAction={onToggleAction} />}
                    {isShown.dueDate && <DueDate dueDateNotSave={dueDateNotSave} onChange={onChange} value={value} onToggleAction={onToggleAction} />}
                    {isShown.members && <CardMembers board={currBoard} loggedInUser={loggedInUser} saveCard={saveCard} card={currCard} />}
                    {isShown.bgColor && <CardBgColor saveCard={saveCard} onToggleAction={onToggleAction} card={currCard} />}
                    {isShown.move && <CardMove loggedInUser={loggedInUser} save={save} saveCard={saveCard} board={currBoard} card={currCard} />}
                    {isShown.timeEstimation && <CardTimeEstimation saveCard={saveCard} loggedInUser={loggedInUser} card={currCard} onToggleAction={onToggleAction}
                        onAddTimeEstimation={onAddTimeEstimation} removeCardEstimation={removeCardEstimation} />}
                    {isShown.stack && <StackMenu board={currBoard} onToggleAction={onToggleAction} stack={stack} onStackRemove={onStackRemove} />}
                </div >
            </OutsideClickHandler>
        )
    }
}

const mapDispatchToProps = {
    saveCard,
    save
}
const mapStateToProps = (state) => {
    return {
        loggedInUser: state.user.loggedInUser,
        currCard: state.board.currCard,
        currBoard: state.board.currBoard
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionContainer);