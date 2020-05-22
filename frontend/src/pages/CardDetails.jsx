import React, { Component } from 'react'
import CardDescription from '../cmps/CardDescription'
import CardComments from '../cmps/CardComments'
import BoardDetails from '../pages/BoardDetails'
import DueDate from '../cmps/DueDate'
import LabelsPicker from '../cmps/LabelsPicker'
import { save } from '../store/actions/boardActions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeId } from '../services/utilService'

class CardDetails extends Component {

    state = {
        card: null,
        prevCardDesc: '',
        isShown: {
            label: false,
            dueDate: false
        },
        comment: {
            txt: ''
        },
        dueDate: {
            value: new Date(),
        },
        labels: []

    }

    componentDidUpdate(prevProps) {
        if (this.props.currBoard !== prevProps.currBoard) this.loadCard()
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
        comment.byMember = {
            _id: '5ec5581139619913d9c4da56',
            fullName: 'Abi Abambi',
            imgUrl: 'http://some-img.jpg'
        };
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
        if (currCard.labels.length) {
            if (!currCard.labels.find(label => label.title === currLabel.title)) {
                currCard.labels.push(currLabel);
                this.props.save(this.props.currBoard);
                console.log('currCard', currCard);
            }
        } else {
            currCard.labels.push(currLabel);
            this.props.save(this.props.currBoard);
            console.log('currCard', currCard);
        }
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

        const { card, isDescShown, comment, dueDate, labels, isShown } = this.state
        const { onToggleAction } = this;
        return ((!card) ? 'Loading...' :
            <>
                <div className="screen" onMouseDown={this.onBackBoard}>
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
                                    <Link title="Add / Remove members" to="#"><li><img src="/assets/img/user-icon.png" alt="" />Members</li></Link>
                                    <Link title="Add / Remove labels" to="#" onClick={() => onToggleAction('label')}><li><img src="/assets/img/label-icon.png" alt="" />Labels</li></Link>
                                    <Link title="Add checklist" to="#"><li><img src="/assets/img/checklist-icon.png" alt="" />Checklist</li></Link>
                                    <Link title="Set due date" to="#" onClick={() => onToggleAction('dueDate')}><li><img src="/assets/img/clock-icon.png" alt="" />Due Date</li></Link>
                                    {isShown.dueDate && <DueDate onChange={this.onChangeDate} value={dueDate.value} />}
                                    {isShown.label && <LabelsPicker addLabel={this.onAddLabel} onToggleAction={onToggleAction} getCurrCard={this.getCurrCard} />}
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
    save
}
const mapStateToProps = (state) => {
    return {
        currBoard: state.board.currBoard
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetails);