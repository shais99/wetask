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
        }
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
        this.setState(prevState => ({ card: { ...prevState.card, dueDate } }), () => this.props.saveCard(this.state.card))
    }

    removeDuedate = () => {
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
        const { comment } = this.state
        if (!comment.txt) return;
        comment.id = makeId();
        comment.createdAt = Date.now();
        comment.byMember = this.props.loggedInUser;
        const currCard = this.getCurrCard()
        currCard.comments.unshift(comment)
        this.setState({ comment: { txt: '' } }, () => {
            this.props.saveCard(this.state.card)
        })
    }

    onEditTitle = ({ target }) => {
        this.setState(prevState => ({ card: { ...prevState.card, title: target.value } }), () => {
            this.props.saveCard(this.state.card)
        })
    }

    onSaveDesc = (ev) => {
        ev.preventDefault()
        this.setState({ prevCardDesc: this.state.card.description }, () => {
            this.props.saveCard(this.state.card)
            this.onDescShown(false)
        })
    }

    onAddLabel = (currLabel) => {
        let currCard = this.getCurrCard();
        const labelIdx = currCard.labels.findIndex(label => label.title === currLabel.title);

        if (labelIdx === -1) currCard.labels.push(currLabel)
        else currCard.labels.splice(labelIdx, 1)

        this.setState({ card: currCard }, () => this.props.saveCard(this.state.card))
    }

    onAddMember = (currMember) => {
        let currCard = this.getCurrCard();
        const memberIdx = currCard.members.findIndex(member => member._id === currMember._id);

        if (memberIdx === -1) currCard.members.push(currMember)
        else currCard.members.splice(memberIdx, 1)
        console.log('members', this.state.card.members);
        this.setState({ card: currCard }, () => this.props.saveCard(this.state.card))
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
        const imgUrl = await uploadImg(ev)
        console.log(imgUrl);
    }

    render() {

        const { card, isDescShown, comment, isShown } = this.state
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
                                <CardPreviewActions card={card} getTwoChars={this.getTwoChars} />
                                <CardDescription description={card.description} onSaveDesc={this.onSaveDesc} handleChange={this.handleChange} isShown={this.onDescShown} isSubmitShown={isDescShown} />
                                {card.checklists && card.checklists.map(checklist => <CardChecklist key={checklist.id} checklist={checklist} addTodo={this.onAddTodo} onEditChecklistTitle={this.onEditChecklistTitle} />)}
                                <CardComments comments={card.comments} onAddComment={this.onAddComment} handleChange={this.handleCommentChange} comment={comment.txt} getTwoChars={this.getTwoChars} />
                            </aside>
                            <aside className="card-actions">
                                <ul className="clean-list">
                                    <Link title="Add / Remove members" to="#" onClick={() => onToggleAction('members')}><li><img src="/assets/img/user-icon.png" alt="" />Members</li></Link>
                                    <Link title="Add / Remove labels" to="#" onClick={() => onToggleAction('label')}><li><img src="/assets/img/label-icon.png" alt="" />Labels</li></Link>
                                    <Link title="Add checklist" to="#" onClick={this.onAddChecklist}><li><img src="/assets/img/checklist-icon.png" alt="" />Checklist</li></Link>
                                    <Link title="Set due date" to="#" onClick={() => onToggleAction('dueDate')}><li><img src="/assets/img/clock-icon.png" alt="" />Due Date</li></Link>


                                    <Link title="Set Card Cover" to="#" onClick={() => this.onOpenUpload()}><li><img src="/assets/img/style.png" alt="" />Set Image Cover</li></Link>
                                    <input type="file" ref={input => this.inputElement = input} name="imgUrl" onChange={this.onUploadImg} hidden />


                                    {isShown.dueDate && <ActionContainer isShown={isShown} onChange={this.onChangeDate} value={card.dueDate} onToggleAction={onToggleAction} removeDuedate={this.removeDuedate} />}
                                    {isShown.label && <ActionContainer isShown={isShown} addLabel={this.onAddLabel} onToggleAction={onToggleAction} getCurrCard={this.getCurrCard} />}
                                    {isShown.members && <ActionContainer board={this.props.currBoard} isShown={isShown} onToggleAction={onToggleAction} card={card} addMember={this.onAddMember} getCurrCard={this.getCurrCard} />}

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