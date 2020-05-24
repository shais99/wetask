import React from 'react'
import moment from 'moment'

export default function BoardActivities(props) {
    const { board } = props
    return (
        <div className="activities-container">
            <h2 className="activities-title">Activities</h2>
            <ul className="activities clean-list">
                {board.activities.map((activity, idx) => {
                    return <li key={idx}>
                        <span className="bold">{activity.byMember.username}</span> {activity.txt}
                        <p className="activity-at">{moment(activity.createdAt).fromNow()}</p>
                    </li>
                })}
            </ul>
        </div>
    )
}
