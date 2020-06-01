import React from 'react'
import { makeId } from '../../services/utilService'

export default function CardShowTimeEstimation(props) {


    function onApproveTimeEstimation() {
        const newCard = { ...props.card }
        newCard.timeEstimation.approved = true
        newCard.activities.unshift({
            id: makeId(), txt: `confirmed the time estimate`,
            createdAt: Date.now(), byMember: props.loggedInUser
        })
        props.saveCard(newCard)
    }

    const { timeEstimation } = props.card
    return (
        <>
            {(timeEstimation.days || timeEstimation.hours || timeEstimation.minutes) && <>
                <h3 className="time-estimation-title">Time Estimation</h3>
                <div className="show-time-estimation flex align-center space-between">
                    <div>
                        {timeEstimation.days ? <span>{timeEstimation.days} days </span> : ''}
                        {timeEstimation.hours ? <span> {timeEstimation.hours} hours </span> : ''}
                        {timeEstimation.minutes ? <span> {timeEstimation.minutes} minutes</span> : ''}
                    </div>
                    {!timeEstimation.approved && <div className="flex align-center justify-center" >
                        <span onClick={onApproveTimeEstimation}><img src="/assets/img/approve.png" title="Approve" alt="" /></span>
                        <span onClick={props.onFocusComment}><img src="/assets/img/small-comment.png" title="Comment" alt="" /></span>
                    </div>
                    }
                </div>
            </>}
        </>
    )
}