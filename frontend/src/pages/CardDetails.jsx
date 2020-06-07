import React, { Component } from 'react'
import CardDescription from '../cmps/card/CardDescription'
import CardComments from '../cmps/card/CardComments'
import { save, loadBoard, saveCard, loadCard } from '../store/actions/boardActions'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeId } from '../services/utilService'
import ActionContainer from '../cmps/card/ActionContainer'
import CardChecklist from '../cmps/card/CardChecklist'
import CardPreviewActions from '../cmps/card/CardPreviewActions'
import CardImg from '../cmps/card/CardImg'
import RemoveCard from '../cmps/card/RemoveCard'
import CardActivity from '../cmps/card/CardActivity'
import CardShowTimeEstimation from '../cmps/card/CardShowTimeEstimation'
import Loader from '../cmps/general/Loader'
import { uploadImg } from '../services/cloudinaryService'

class CardDetails extends Component {

    state = {
        isShown: {
            label: false,
            dueDate: false,
            members: false,
            move: false,
            timeEstimation: false,
            bgColor: false
        },
        isOpenModalRemove: false,
        dueDateNotSave: '',
        isFocusComment: false,
        isUploadImg: false,
        isFinishUpload: false,
        cardTitle: ''
    }

    componentDidMount() {
        if (this.props.currBoard) {
            this.props.loadCard(this.props.match.params.cardId)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currBoard !== prevProps.currBoard) this.props.loadCard(this.props.match.params.cardId)
        if (this.props.currCard !== prevProps.currCard) this.setState({ cardTitle: this.props.currCard.title })
    }

    onBackBoard = () => {
        const { boardId } = this.props.match.params
        this.props.history.push(`/boards/${boardId}`)
    }

    onChangeDate = (dueDate) => {
        this.setState({ dueDateNotSave: dueDate })
    }

    onEditTitle = ({ target }) => {
        this.setState({ cardTitle: target.value })
    }

    onEditTitleFinish = () => {
        const newCard = { ...this.props.currCard }
        newCard.title = this.state.cardTitle
        newCard.activities.unshift({
            id: makeId(), txt: `edited card title`,
            createdAt: Date.now(), byMember: this.props.loggedInUser
        })
        this.props.saveCard(newCard)
    }

    getTwoChars(str) {
        let twoChars;
        if (str.split(' ').length !== 2) twoChars = str?.charAt(0)
        else twoChars = str?.charAt(0) + str.split(' ')[1].charAt(0)
        if (!twoChars) twoChars = ''
        return twoChars
    }

    onAddChecklist = () => {
        const newChecklist = {
            id: makeId(),
            title: 'Checklist',
            todos: []
        }
        const newCard = { ...this.props.currCard }
        newCard.checklists.unshift(newChecklist)
        newCard.activities.unshift({
            id: makeId(), txt: `added checklist to the card`,
            createdAt: Date.now(), byMember: this.props.loggedInUser
        })
        this.props.saveCard(newCard)
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

    onToggleRemoveCard = () => {
        this.setState(prevState => ({ isOpenModalRemove: !prevState.isOpenModalRemove }))
    }

    onFocusComment = () => {
        this.setState(prevState => ({ isFocusComment: !prevState.isFocusComment }))
    }
    onUploadImg = async ev => {
        this.setState({ isUploadImg: true })
        const imgUrl = await uploadImg(ev)
        this.setState({ isUploadImg: false, isFinishUpload: true })
        const newCard = { ...this.props.currCard }
        newCard.imgUrl = imgUrl
        newCard.activities.unshift({
            id: makeId(), txt: `uploaded image to the card`,
            createdAt: Date.now(), byMember: this.props.loggedInUser
        })
        this.props.saveCard(newCard)
    }

    onRemoveImg = () => {
        const newCard = { ...this.props.currCard }
        newCard.imgUrl = null
        newCard.activities.unshift({
            id: makeId(), txt: `removed image from the card`,
            createdAt: Date.now(), byMember: this.props.loggedInUser
        })
        this.props.saveCard(newCard)
    }

    render() {
        const { isShown, isOpenModalRemove, isFocusComment, dueDateNotSave, isUploadImg, cardTitle } = this.state
        const { currCard, saveCard, loggedInUser, history, currBoard, save } = this.props
        const { onToggleAction } = this;

        return ((!currCard) ? <Loader /> :
            <>
                <div className="screen" onMouseDown={this.onBackBoard} >
                    <div className="modal-container shadow-drop-2-center card-details-modal" onMouseDown={(ev) => ev.stopPropagation()}>
                        <div className="modal-header flex align-center space-between">
                            <div className="task-title-container flex align-center">
                                <img className="img-icon" src="/assets/img/task.png" alt="" />
                                <input type="text" name="title" className="card-title" onChange={this.onEditTitle}
                                    onBlur={this.onEditTitleFinish} value={cardTitle} autoComplete="off" />
                            </div>
                            <div className="close-modal flex justify-content align-center" onClick={this.onBackBoard}><img className="img-icon" src="/assets/img/close.png" alt="" /></div>
                        </div>

                        <div className="card-container flex">
                            <aside className="card-content">
                                {currCard.timeEstimation && <CardShowTimeEstimation saveCard={saveCard} loggedInUser={loggedInUser} card={currCard} onFocusComment={this.onFocusComment} />}
                                <CardPreviewActions getTwoChars={this.getTwoChars} />
                                <CardDescription card={currCard} saveCard={saveCard} loggedInUser={loggedInUser} />

                                {(currCard.imgUrl || isUploadImg) && <CardImg imgUrl={currCard.imgUrl} isUploadImg={isUploadImg} onRemoveImg={this.onRemoveImg} />}

                                {currCard.checklists && currCard.checklists.map(checklist => <CardChecklist key={checklist.id} saveCard={saveCard} loggedInUser={loggedInUser} card={currCard} checklist={checklist} />)}

                                <CardComments card={currCard} saveCard={saveCard} loggedInUser={loggedInUser} isFocusComment={isFocusComment} getTwoChars={this.getTwoChars} />
                                {currCard.activities && <CardActivity activities={currCard.activities} getTwoChars={this.getTwoChars} />}
                            </aside>
                            <aside className="card-actions">
                                <div className="actions-title">Actions:</div>
                                <ul className="actions-list clean-list">
                                    <Link title="Edit Card Members" to="#" onClick={() => onToggleAction('members')}><li><img src="/assets/img/user-icon.png" alt="" />Members</li></Link>
                                    <Link title="Edit Card Labels" to="#" onClick={() => onToggleAction('label')}><li><img src="/assets/img/label-icon.png" alt="" />Labels</li></Link>
                                    <Link title="Add Checklist" to="#" onClick={this.onAddChecklist}><li><img src="/assets/img/checklist-icon.png" alt="" />Checklist</li></Link>
                                    <Link title="Set Due Date" to="#" onClick={() => onToggleAction('dueDate')}><li><img src="/assets/img/due-date.png" alt="" />Due Date</li></Link>
                                    <Link title="Set Time Estimation" to="#" onClick={() => onToggleAction('timeEstimation')}><li><img src="/assets/img/clock-icon.png" alt="" />Time Estimation</li></Link>
                                    <Link title="Add Image" to="#" onClick={() => this.onOpenUpload()}><li><img src="/assets/img/style.png" alt="" />Add Image</li></Link>
                                    <Link title="Change Card Background" to="#" onClick={() => this.onToggleAction('bgColor')}><li><img src="/assets/img/palette.png" alt="" />Change Background</li></Link>
                                    <input type="file" ref={input => this.inputElement = input} name="imgUrl" onChange={this.onUploadImg} hidden />
                                    <Link title="Move Card" to="#" onClick={() => this.onToggleAction('move')}><li><img src="/assets/img/back.png" className="img-rotate" alt="" />Move Card</li></Link>
                                    <Link title="Remove Card" to="#" onClick={this.onToggleRemoveCard}><li className="li-last-child"><img src="/assets/img/trash-white.png" alt="" />Remove Card</li></Link>

                                    {isShown.dueDate && <ActionContainer dueDateNotSave={dueDateNotSave} isShown={isShown} onChange={this.onChangeDate} onSubmitDate={this.onSubmitDate} onToggleAction={onToggleAction} value={currCard.dueDate} removeDueDate={this.removeDueDate} />}
                                    {isShown.label && <ActionContainer isShown={isShown} onToggleAction={onToggleAction} />}
                                    {isShown.members && <ActionContainer isShown={isShown} onToggleAction={onToggleAction} />}
                                    {isShown.bgColor && <ActionContainer isShown={isShown} onToggleAction={onToggleAction} />}
                                    {isShown.move && <ActionContainer isShown={isShown} onToggleAction={onToggleAction} />}
                                    {isShown.timeEstimation && <ActionContainer isShown={isShown} onToggleAction={onToggleAction} />}
                                    {isShown.changeLabel && <ActionContainer isShown={isShown} onToggleAction={onToggleAction} />}

                                </ul>
                                {isOpenModalRemove && <RemoveCard history={history} board={currBoard} card={currCard} save={save} loggedInUser={loggedInUser} onToggleRemoveCard={this.onToggleRemoveCard} />}

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
    saveCard,
    loadCard
}
const mapStateToProps = (state) => {
    return {
        currBoard: state.board.currBoard,
        loggedInUser: state.user.loggedInUser,
        currCard: state.board.currCard
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetails);