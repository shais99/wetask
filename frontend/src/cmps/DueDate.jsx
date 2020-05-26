import React from 'react'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function DueDate(props) {
    const date = (props.value) ? new Date(props.value) : new Date()
    return <div>
        <Calendar onChange={props.onChange} calendarType="US" value={date} locale="en-GB" name="dueDate" />
        <div className="btns-container flex space-between">
<<<<<<< HEAD
            <button className="btn btn-primary" onClick={()=>{
                props.onToggleAction('dueDate')
                props.onSubmit()
                }}>Save</button>
            <button className="btn btn-danger" onClick={()=>props.removeDuedate()}>Remove</button>
=======
            <button className="btn btn-primary" onClick={()=>props.onToggleAction('dueDate')}>Save</button>
            <button className="btn btn-danger" onClick={()=>props.removeDueDate()}>Remove</button>
>>>>>>> 5a1504f04df16a910429c949845328112c8b080f
        </div>
    </div>
}
