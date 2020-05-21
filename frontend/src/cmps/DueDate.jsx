import React from 'react'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function DueDate(props) {
    return (
        <Calendar className="slide-bottom" onChange={props.onChange} value={props.value} calendarType="US" locale="en-GB" name="dueDate" />
    )
}
