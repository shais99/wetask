import React from 'react'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function DueDate(props) {
    const date = (props.value) ? new Date(props.value) : new Date()
    return <div>
        <Calendar onChange={props.onChange} calendarType="US" value={date} locale="en-GB" name="dueDate" />
        <div className="btns-container flex space-between">
            <button className="btn btn-primary" onClick={() => {
                props.onSubmitDate()
                props.onToggleAction('dueDate')
            }}>Save</button>
            <button className="btn btn-danger" onClick={() => {
                props.removeDuedate()
                props.onToggleAction('dueDate')
            }}>Remove</button>
        </div>
    </div>
}
