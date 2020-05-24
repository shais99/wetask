import React from 'react'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function DueDate(props) {
    const date = (props.value) ? new Date(props.value) : new Date()
    return <Calendar onChange={props.onChange} calendarType="US" value={date} locale="en-GB" name="dueDate" />
}
