import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { saveCard } from '../../store/actions/boardActions'
import { makeId } from '../../services/utilService'
import { connect } from 'react-redux'
import moment from 'moment'

function DueDate(props) {

    function onSubmitDate() {
        const { currBoard, loggedInUser } = props
        currBoard.activities.unshift({
            id: makeId(), txt: `set card due date to 
        ${moment(props.dueDateNotSave).format("MMM DD")}`, createdAt: Date.now(), byMember: loggedInUser
        })

        const newCard = { ...props.currCard }

        newCard.activities.unshift({
            id: makeId(), txt: `set card due date to 
        ${moment(props.dueDateNotSave).format("MMM DD")}`, createdAt: Date.now(), byMember: loggedInUser
        })

        newCard.dueDate = props.dueDateNotSave
        props.saveCard(newCard)
    }

    function removeDueDate() {
        const newCard = { ...props.currCard }
        newCard.dueDate = ''
        props.saveCard(newCard)
    }

    const date = (props.value) ? new Date(props.value) : new Date()
    return <div>
        <Calendar onChange={props.onChange} calendarType="US" value={date} locale="en-GB" name="dueDate" />
        <div className="btns-container flex space-between">
            <button className="btn btn-primary btn-save" onClick={() => {
                onSubmitDate()
                props.onToggleAction('dueDate')
            }}>Save</button>
            <button className="btn btn-danger btn-remove" onClick={() => {
                removeDueDate()
                props.onToggleAction('dueDate')
            }}>Remove</button>
        </div>
    </div>
}

const mapDispatchToProps = {
    saveCard
}
const mapStateToProps = (state) => {
    return {
        currCard: state.board.currCard,
        currBoard: state.board.currBoard,
        loggedInUser: state.user.loggedInUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DueDate);