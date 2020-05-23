import React, { Component } from 'react'
import CardDescription from '../cmps/CardDescription'
import CardComments from '../cmps/CardComments'
import { save, loadBoard } from '../store/actions/boardActions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeId } from '../services/utilService'
import ActionContainer from '../cmps/ActionContainer'

class CardDetails extends Component {

    state = {
        card: null,
        prevCardDesc: '',
        isShown: {
            label: false,
            dueDate: false,
            members: false,

        },
        comment: {
            txt: ''
        },
        dueDate: {
            value: new Date(),
        }
    }

    componentDidMount() {
        if (this.props.currBoard) this.loadCard()
    }

    componentDidUpdate(prevProps) {
        if (this.props.currBoard !== prevProps.currBoard){ 
            this.loadCard()
        }
    }

    loadCard = () => {
        const currCard = this.getCurrCard();
        this.setState({ card: currCard }, () => this.setState({ prevCardDesc: this.state.card.description }))
    }

    getCurrCard = () => {
        const cardId = this.props.match.params.cardId
        let card;
        this.props.currBoard.stacks.some(stack => {
            card = stack.cards.find(card => card.id === cardId)
            return card
        })
        return card
    }

    onDescShown = (isShown, isPrevDesc) => {
        this.setState({ isDescShown: isShown })
        if (!isShown && isPrevDesc) this.setPrevDesc()
    }

    setPrevDesc = () => {
        this.setState(prevState => ({ card: { ...prevState.card, description: this.state.prevCardDesc } }))
    }

    onBackBoard = (ev) => {
        const { boardId } = this.props.match.params
        this.props.history.push(`/boards/${boardId}`)
    }

    // @TODO: due date start from the DB, if got
    onChangeDate = (dueDate) => {
        const currCard = this.getCurrCard()
        currCard.dueDate = this.state.dueDate.value
        this.setState(prevState => ({ dueDate: { ...prevState.dueDate, value: dueDate } }), () => this.props.save(this.props.currBoard))
        this.onToggleShowDate()
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({ card: { ...prevState.card, [field]: value } }))
    }

    handleCommentChange = ({ target }) => {
        this.setState(prevState => ({ comment: { ...prevState.comment, txt: target.value } }))
    }

    onAddComment = (ev) => {
        ev.preventDefault();
        const { comment } = this.state
        if (!comment.txt) return;
        comment.id = makeId();
        comment.createdAt = Date.now();
        comment.byMember = this.props.loggedInUser;
        const currCard = this.getCurrCard()
        currCard.comments.unshift(comment)
        this.props.save(this.props.currBoard)
        this.setState({ comment: { txt: '' } })
    }

    onEditTitle = ({ target }) => {
        const currCard = this.getCurrCard()
        this.setState(prevState => ({ card: { ...prevState.card, title: target.value } }), () => {
            currCard.title = this.state.card.title;
            this.props.save(this.props.currBoard)
        })
    }

    onSaveDesc = (ev) => {
        ev.preventDefault()

        const currCard = this.getCurrCard()
        currCard.description = this.state.card.description
        this.setState({ prevCardDesc: this.state.card.description })
        this.props.save(this.props.currBoard)
        this.onDescShown(false)
    }

    onAddLabel = (currLabel) => {
        let currCard = this.getCurrCard();
        const labelIdx = currCard.labels.findIndex(label => label.title === currLabel.title);
        
        if (labelIdx === -1) currCard.labels.push(currLabel)
        else currCard.labels.splice(labelIdx, 1)

        this.setState({ card: currCard }, () => this.props.save(this.props.currBoard))
    }

    onAddMember = (currMember) => {
        let currCard = this.getCurrCard();
        const memberIdx = currCard.members.findIndex(member => member._id === currMember._id);
        console.log('member-idx',memberIdx);

        if (memberIdx === -1) currCard.members.push(currMember)
        else currCard.members.splice(memberIdx, 1)

        this.props.save(this.props.currBoard)
        this.props.loadBoard(this.props.currBoard._id)
    }

    onToggleAction = (action) => {
        let actions = this.state.isShown;
        for (const key in actions) {
            if (key !== action) {
                actions[key] = false;
            }
        }
        actions[action] = !actions[action];
        this.setState({ isShown: actions });
    }

    render() {

        const { card, isDescShown, comment, dueDate, isShown } = this.state
        const { onToggleAction } = this;
        return ((!card) ? 'Loading...' :
            <>
                <div className="screen" onMouseDown={this.onBackBoard} >
                    <div className="modal-container shadow-drop-2-center" onMouseDown={(ev) => ev.stopPropagation()}>
                        <div className="modal-header flex space-between">
                            <input type="text" name="title" className="card-title" onChange={this.onEditTitle} value={card.title} />
                            <button className="close-modal" onClick={this.onBackBoard}>X</button>
                        </div>

                        <div className="card-container flex">
                            <aside className="card-content">
                                <CardDescription description={card.description} onSaveDesc={this.onSaveDesc} handleChange={this.handleChange} isShown={this.onDescShown} isSubmitShown={isDescShown} />
                                <CardComments comments={card.comments} onAddComment={this.onAddComment} handleChange={this.handleCommentChange} comment={comment.txt} />
                            </aside>
                            <aside className="card-actions">
                                <ul className="clean-list">
                                    <Link title="Add / Remove members" to="#" onClick={() => onToggleAction('members')}><li><img src="/assets/img/user-icon.png" alt="" />Members</li></Link>
                                    <Link title="Add / Remove labels" to="#" onClick={() => onToggleAction('label')}><li><img src="/assets/img/label-icon.png" alt="" />Labels</li></Link>
                                    <Link title="Add checklist" to="#"><li><img src="/assets/img/checklist-icon.png" alt="" />Checklist</li></Link>
                                    <Link title="Set due date" to="#" onClick={() => onToggleAction('dueDate')}><li><img src="/assets/img/clock-icon.png" alt="" />Due Date</li></Link>
                                    {isShown.dueDate && <ActionContainer isShown={isShown} onChange={this.onChangeDate} value={dueDate.value} onToggleAction={onToggleAction} />}
                                    {isShown.label && <ActionContainer isShown={isShown} addLabel={this.onAddLabel} onToggleAction={onToggleAction} getCurrCard={this.getCurrCard} />}
                                    {isShown.members && <ActionContainer isShown={isShown} onToggleAction={onToggleAction} card={card} addMember={this.onAddMember} getCurrCard={this.getCurrCard} />}

                                </ul>
                            </aside>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = {
    save,
    loadBoard
}
const mapStateToProps = (state) => {
    return {
        currBoard: state.board.currBoard,
        loggedInUser: state.user.loggedInUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetails);