import React, { Component } from 'react'
import CardDescription from '../cmps/CardDescription'
import CardComments from '../cmps/CardComments'
import { save, loadBoard, saveCard } from '../store/actions/boardActions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeId } from '../services/utilService'
import ActionContainer from '../cmps/ActionContainer'
import CardChecklist from '../cmps/CardChecklist'
import CardPreviewActions from '../cmps/CardPreviewActions'
import { uploadImg } from '../services/cloudinaryService'
import CardImg from '../cmps/CardImg'
import ReomveCard from '../cmps/RemoveCard'
import moment from 'moment'
import CardActivity from '../cmps/CardActivity'

class CardDetails extends Component {

    state = {
        card: null,
        prevCardDesc: '',
        isShown: {
            label: false,
            dueDate: false,
            members: false,
            move: false,
            timeEstimation: false
        },
        comment: {
            txt: ''
        },
        isUploadImg: false,
        isFinishUpload: false,
        isOpenModalRemove: false,
        dueDateNotSave: ''
    }

    componentDidMount() {
        if (this.props.currBoard) this.loadCard()
    }

    componentDidUpdate(prevProps) {
        if (this.props.currBoard !== prevProps.currBoard) {
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
        if (!card) return this.props.history.push('/boards')
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
        this.setState({ dueDateNotSave: dueDate })
    }

    onSubmitDate = () => {
        const { currBoard, loggedInUser } = this.props
        currBoard.activities.unshift({
            id: makeId(), txt: `set card due date to 
        ${moment(this.state.dueDateNotSave).format("MMM DD")}`, createdAt: Date.now(), byMember: loggedInUser
        })
        this.state.card.activities.unshift({
            id: makeId(), txt: `set card due date to 
        ${moment(this.state.dueDateNotSave).format("MMM DD")}`, createdAt: Date.now(), byMember: loggedInUser
        })
        this.setState(prevState => ({ card: { ...prevState.card, dueDate: this.state.dueDateNotSave } }), () => {
            this.props.saveCard(this.state.card)
        })
    }

    removeDueDate = () => {
        const dueDate = '';
        this.setState(prevState => ({ card: { ...prevState.card, dueDate } }), () => this.props.saveCard(this.state.card))
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
        const { comment, card } = this.state
        if (!comment.txt) return;
        comment.id = makeId();
        comment.createdAt = Date.now();
        comment.byMember = this.props.loggedInUser;
        this.setState(prevState => ({ card: { ...prevState.card, comments: [comment, ...prevState.card.comments] } }), () => {
            this.props.saveCard(this.state.card)
        })
        card.activities.unshift({
            id: makeId(), txt: `set card comment to ${comment.txt}`,
            createdAt: Date.now(), byMember: this.props.loggedInUser
        })
        this.setState({ comment: { txt: '' } })


    }

    removeComment = (comment) => {
        this.setState(prevState => ({
            card: {
                ...prevState.card,
                comments: prevState.card.comments.filter(currComment => currComment.id !== comment.id)
            }
        }), () => {
            this.props.saveCard(this.state.card)
        })
        this.state.card.activities.unshift({
            id: makeId(), txt: `removed card comment ${comment.txt}`,
            createdAt: Date.now(), byMember: this.props.loggedInUser
        })
    }

    onEditTitle = ({ target }) => {
        this.setState(prevState => ({ card: { ...prevState.card, title: target.value } }), () => {
            this.state.card.activities.unshift({
                id: makeId(), txt: `edited card title to ${this.state.card.title}`,
                createdAt: Date.now(), byMember: this.props.loggedInUser
            })
            this.props.saveCard(this.state.card)
        })
    }

    onSaveDesc = (ev) => {
        ev.preventDefault()
        this.setState({ prevCardDesc: this.state.card.description }, () => {
            this.state.card.activities.unshift({
                id: makeId(), txt: `edited card description to ${this.state.card.description}`,
                createdAt: Date.now(), byMember: this.props.loggedInUser
            })
            this.props.saveCard(this.state.card)
            this.onDescShown(false)
        })
    }

    onAddLabel = (currLabel) => {
        let currCard = this.getCurrCard();
        const labelIdx = currCard.labels.findIndex(label => label.title === currLabel.title);

        if (labelIdx === -1) {
            this.state.card.activities.unshift({
                id: makeId(), txt: `add label: ${currLabel.title} to the card`,
                createdAt: Date.now(), byMember: this.props.loggedInUser
            })
            currCard.labels.push(currLabel)
        }
        else {
            this.state.card.activities.unshift({
                id: makeId(), txt: `removed label: ${currLabel.title} from the card`,
                createdAt: Date.now(), byMember: this.props.loggedInUser
            })
            currCard.labels.splice(labelIdx, 1)
        }
        this.setState({ card: currCard }, () => {
            this.props.saveCard(this.state.card)
        })
    }

    onAddMember = (currMember) => {
        let currCard = this.getCurrCard();
        const memberIdx = currCard.members.findIndex(member => member._id === currMember._id);

        if (memberIdx === -1) {
            this.state.card.activities.unshift({
                id: makeId(), txt: `add member:  ${currMember.username} to the card`,
                createdAt: Date.now(), byMember: this.props.loggedInUser
            })
            currCard.members.push(currMember)
        }
        else {
            this.state.card.activities.unshift({
                id: makeId(), txt: `removed member:  ${currMember.username} from the card`,
                createdAt: Date.now(), byMember: this.props.loggedInUser
            })
            currCard.members.splice(memberIdx, 1)
        }
        console.log('members', this.state.card.members);
        this.setState({ card: currCard }, () => {

            this.props.saveCard(this.state.card)
        })
    }

    getTwoChars(str) {
        let twoChars;
        if (str.split(' ').length !== 2) twoChars = str?.charAt(0)
        else twoChars = str?.charAt(0) + str.split(' ')[1].charAt(0)
        if (!twoChars) twoChars = ''
        return twoChars
    }

    onAddChecklist = () => {
        let newChecklist = {
            id: makeId(),
            title: 'Checklist',
            todos: []
        }
        this.setState(prevState => ({
            card: {
                ...prevState.card,
                checklists: [...prevState.card.checklists, newChecklist]
            }
        }), () => {
            this.state.card.activities.unshift({
                id: makeId(), txt: `added checklist to the card`,
                createdAt: Date.now(), byMember: this.props.loggedInUser
            })
            this.props.saveCard(this.state.card)
        })
    }

    onEditChecklistTitle = (checklistId, title) => {
        this.setState(prevState => ({
            card: {
                ...prevState.card,
                checklists: prevState.card.checklists.map(checklist => {
                    if (checklist.id === checklistId) checklist.title = title
                    return checklist
                })
            }
        }), () => {
            this.state.card.activities.unshift({
                id: makeId(), txt: `has edited checklist title card to ${title}`,
                createdAt: Date.now(), byMember: this.props.loggedInUser
            })
            this.props.saveCard(this.state.card)
        })
    }

    onAddTodo = (checklistId, newTodo) => {
        this.setState(prevState => ({
            card: {
                ...prevState.card,
                checklists: prevState.card.checklists.map(checklist => {
                    if (checklist.id === checklistId) {
                        if (!newTodo.id) {
                            checklist.todos.push(newTodo)
                            newTodo.id = makeId();
                        } else {
                            checklist.todos = checklist.todos.map(todo => {
                                if (todo.id === newTodo.id) return newTodo
                                return todo
                            })
                        }
                    }
                    return checklist
                })
            }
        }), () => {
            this.state.card.activities.unshift({
                id: makeId(), txt: `added todo ${newTodo.title} to the card`,
                createdAt: Date.now(), byMember: this.props.loggedInUser
            })
            this.props.saveCard(this.state.card)
        })
    }

    onRemoveTodo = (checklistId, todo) => {
        this.setState(prevState => ({
            card: {
                ...prevState.card,
                checklists: prevState.card.checklists.map(checklist => {
                    if (checklist.id === checklistId) {
                        checklist.todos = checklist.todos.filter(currTodo => currTodo.id !== todo.id)
                    }
                    return checklist
                })
            }
        }), () => {
            this.state.card.activities.unshift({
                id: makeId(), txt: `removed todo ${todo.title} from the card`,
                createdAt: Date.now(), byMember: this.props.loggedInUser
            })
            this.props.saveCard(this.state.card)
        })
    }

    onRemoveChecklist = (checklist) => {
        this.setState(prevState => ({
            card: {
                ...prevState.card,
                checklists: prevState.card.checklists.filter(currChecklist => currChecklist.id !== checklist.id)
            }
        }), () => {
            this.state.card.activities.unshift({
                id: makeId(), txt: `removed checklist ${checklist.title} from the card`,
                createdAt: Date.now(), byMember: this.props.loggedInUser
            })
            this.props.saveCard(this.state.card)
        })
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

    onOpenUpload = () => {
        this.inputElement.click();
    }

    onUploadImg = async ev => {
        this.setState({ isUploadImg: true })
        const imgUrl = await uploadImg(ev)
        this.setState({ isUploadImg: false, isFinishUpload: true })
        this.setState(prevState => ({ card: { ...prevState.card, imgUrl } }), () => {
            this.state.card.activities.unshift({
                id: makeId(), txt: `uploaded image to the card`,
                createdAt: Date.now(), byMember: this.props.loggedInUser
            })
            this.props.saveCard(this.state.card)
        })
    }

    onRemoveImg = () => {
        this.setState(prevState => ({ card: { ...prevState.card, imgUrl: null } }), () => {
            this.state.card.activities.unshift({
                id: makeId(), txt: `removed image from the card`,
                createdAt: Date.now(), byMember: this.props.loggedInUser
            })
            this.props.saveCard(this.state.card)
        })
    }

    moveCardToStack = (stackDest) => {
        this.props.currBoard.stacks.forEach(stack => {
            let cardIdx = stack.cards.findIndex(card => card.id === this.state.card.id)
            if (cardIdx !== -1) {
                stack.cards.splice(cardIdx, 1);
            }
            if (stack.title === stackDest.title) {
                stack.cards.push(this.state.card)
            }
        })
        this.state.card.activities.unshift({
            id: makeId(), txt: `moved card to stack ${stackDest.title}`,
            createdAt: Date.now(), byMember: this.props.loggedInUser
        })
        this.props.save(this.props.currBoard)
    }

    onToggleRemoveCard = () => {
        this.setState(prevState => ({ isOpenModalRemove: !prevState.isOpenModalRemove }))
    }

    onRemoveCard = () => {
        const { currBoard, save, history, loggedInUser } = this.props
        currBoard.stacks.forEach(stack => {
            let cardIdx = stack.cards.findIndex(card => {
                return card.id === this.state.card.id
            })
            if (cardIdx !== -1) {
                stack.cards.splice(cardIdx, 1);
            }
        })
        currBoard.activities.unshift({ id: makeId(), txt: `has removed a card`, createdAt: Date.now(), byMember: loggedInUser })
        save(this.props.currBoard);
        history.push(`/boards/${this.props.currBoard._id}`);
    }


    render() {
        const { card, isDescShown, comment, isShown, isUploadImg, isOpenModalRemove } = this.state
        const { onToggleAction } = this;
        return ((!card) ? 'Loading...' :
            <>
                <div className="screen" onMouseDown={this.onBackBoard} >
                    <div className="modal-container shadow-drop-2-center card-details-modal" onMouseDown={(ev) => ev.stopPropagation()}>
                        <div className="modal-header flex align-center space-between">
                            <div className="flex align-center">
                                <img className="img-icon" src="/assets/img/task.png" alt="" />
                                <input type="text" name="title" className="card-title" onChange={this.onEditTitle} value={card.title} />
                            </div>
                            <div className="close-modal flex justify-content align-center" onClick={this.onBackBoard}><img className="img-icon" src="/assets/img/close.png" alt="" /></div>
                        </div>

                        <div className="card-container flex">
                            <aside className="card-content">
                                <CardPreviewActions card={card} getTwoChars={this.getTwoChars} />
                                <CardDescription description={card.description} onSaveDesc={this.onSaveDesc} handleChange={this.handleChange} isShown={this.onDescShown} isSubmitShown={isDescShown} />

                                {(isUploadImg || card.imgUrl) && <CardImg card={card} isUploadImg={isUploadImg} onRemoveImg={this.onRemoveImg} />}
                                {card.checklists && card.checklists.map(checklist => <CardChecklist key={checklist.id} checklist={checklist} addTodo={this.onAddTodo} onEditChecklistTitle={this.onEditChecklistTitle} onRemoveTodo={this.onRemoveTodo} onRemoveChecklist={this.onRemoveChecklist} />)}
                                <CardComments comments={card.comments} onAddComment={this.onAddComment} handleChange={this.handleCommentChange} comment={comment.txt} getTwoChars={this.getTwoChars} removeComment={this.removeComment} />
                                {card.activities && <CardActivity activities={card.activities} getTwoChars={this.getTwoChars} />}
                            </aside>
                            <aside className="card-actions">
                                <div className="actions-title">Actions:</div>
                                <ul className="actions-list clean-list">
                                    <Link title="Edit Card Members" to="#" onClick={() => onToggleAction('members')}><li><img src="/assets/img/user-icon.png" alt="" />Members</li></Link>
                                    <Link title="Edit Card Labels" to="#" onClick={() => onToggleAction('label')}><li><img src="/assets/img/label-icon.png" alt="" />Labels</li></Link>
                                    <Link title="Add Checklist" to="#" onClick={this.onAddChecklist}><li><img src="/assets/img/checklist-icon.png" alt="" />Checklist</li></Link>
                                    <Link title="Set Due Date" to="#" onClick={() => onToggleAction('dueDate')}><li><img src="/assets/img/clock-icon.png" alt="" />Due Date</li></Link>
                                    <Link title="Set Time Estimation" to="#" onClick={() => onToggleAction('timeEstimation')}><li><img src="/assets/img/clock-icon.png" alt="" />Time Estimation</li></Link>
                                    <Link title="Add Image" to="#" onClick={() => this.onOpenUpload()}><li><img src="/assets/img/style.png" alt="" />Add Image</li></Link>
                                    <input type="file" ref={input => this.inputElement = input} name="imgUrl" onChange={this.onUploadImg} hidden />
                                    <Link title="Move Card" to="#" onClick={() => this.onToggleAction('move')}><li><img src="/assets/img/back.png" className="img-rotate" alt="" />Move Card</li></Link>
                                    <Link title="Remove Card" to="#" onClick={this.onToggleRemoveCard}><li className="li-last-child"><img src="/assets/img/trash-white.png" alt="" />Remove Card</li></Link>

                                    {isShown.dueDate && <ActionContainer isShown={isShown} onChange={this.onChangeDate} onSubmitDate={this.onSubmitDate} onToggleAction={onToggleAction} value={card.dueDate} removeDuedate={this.removeDuedate} />}
                                    {isShown.label && <ActionContainer isShown={isShown} addLabel={this.onAddLabel} onToggleAction={onToggleAction} getCurrCard={this.getCurrCard} />}
                                    {isShown.members && <ActionContainer board={this.props.currBoard} isShown={isShown} card={card} addMember={this.onAddMember} onToggleAction={onToggleAction} getCurrCard={this.getCurrCard} />}
                                    {isShown.move && <ActionContainer board={this.props.currBoard} isShown={isShown} card={card} onToggleAction={onToggleAction} moveCardToStack={this.moveCardToStack} />}

                                </ul>
                                {isOpenModalRemove && <ReomveCard onToggleRemoveCard={this.onToggleRemoveCard} onRemoveCard={this.onRemoveCard} />}


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
    loadBoard,
    saveCard
}
const mapStateToProps = (state) => {
    return {
        currBoard: state.board.currBoard,
        loggedInUser: state.user.loggedInUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetails);