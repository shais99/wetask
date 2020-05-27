import React from 'react'
import moment from 'moment'

export default function CardActivity(props) {
    const { activities } = props;
    return (
        <>
            <div className="card-mini-title flex align-center">
                <img src="/assets/img/activity.png" />
                <span className="card-txt-title" htmlFor="cardComment">Activity:</span>
            </div>
            <div className="main-content-card-action">
                <div className="comments-container">
                    {activities && activities.map((activity, idx) => <div className="comment flex align-start column" key={idx}>
                        <div className="flex align-center">
                            <div className="member flex justify-center align-center"
                                style={{ backgroundImage: `url(${activity.byMember.imgUrl})`, backgroundColor: activity.byMember.bgColor }}>
                                {props.getTwoChars(activity.byMember.fullname)}
                            </div>
                            <div className="flex align-center">
                                <span className="comment-title-fullname">{activity.byMember.fullname}</span>
                                <div className="activity-txt">{activity.txt}</div>
                            </div>
                        </div>
                        <span className="comment-title-time activity-time">{moment(activity.createdAt).fromNow()}</span>

                    </div>)}
                </div>
            </div>
        </>
    )
}
