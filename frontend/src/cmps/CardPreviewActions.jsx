import React from 'react'
import moment from 'moment'

export default function CardPreviewActions(props) {
    const { card, getTwoChars } = props
    return (
        <>
            {(card.members.length !== 0 || card.labels.length !== 0 || card.dueDate) && <div className="members-labels-container flex wrap">
                {card.members.length !== 0 &&
                    <div className="member-card-container" >
                        <h3>Members</h3>
                        <div className="flex wrap">
                            {card.members.map((member, idx) => <div key={idx} className="member flex justify-center align-center"
                                style={{ backgroundImage: `url(${member.imgUrl})`, backgroundColor: member.bgColor }}>
                                {getTwoChars(member.fullname)}
                            </div>)}
                        </div>

                    </div>}
                {card.labels.length !== 0 &&
                    <div className="labels-card-container">
                        <h3>Labels</h3>
                        <div className="flex wrap">
                            {card.labels.map((label,idx) => <div key={idx} className="card-label-item" style={{ backgroundColor: `${label.color}` }}>
                                {label.title}
                            </div>)}
                        </div>

                    </div>}
                {card.dueDate &&
                    <div className="due-date-container">
                        <h3>Due date</h3>
                        <div className="flex align-center justify-center time-container">
                            {moment(card.dueDate).format("MMM DD")}
                        </div>
                    </div>
                }
            </div>}
        </>
    )
}
