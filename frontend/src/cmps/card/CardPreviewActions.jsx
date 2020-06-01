import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

function CardPreviewActions(props) {
    const { currCard, getTwoChars } = props
    return (
        <>
            {(currCard.members.length !== 0 || currCard.labels.length !== 0 || currCard.dueDate) && <div className="members-labels-container flex wrap">
                {currCard.members.length !== 0 &&
                    <div className="member-card-container" >
                        <h3>Members</h3>
                        <div className="flex wrap">
                            {currCard.members.map((member, idx) => <div key={idx} className="member flex justify-center align-center"
                                style={{ backgroundImage: `url(${member.imgUrl})`, backgroundColor: member.bgColor }}>
                                <span className="member-two-chars">{getTwoChars(member.fullname)}</span>
                            </div>)}
                        </div>

                    </div>}
                {currCard.labels.length !== 0 &&
                    <div className="labels-card-container">
                        <h3>Labels</h3>
                        <div className="flex wrap">
                            {currCard.labels.map((label, idx) => <div key={idx} className="card-label-item" style={{ backgroundColor: `${label.color}` }}>
                                {label.title}
                            </div>)}
                        </div>

                    </div>}
                {currCard.dueDate &&
                    <div className="due-date-container">
                        <h3>Due date</h3>
                        <div className="flex align-center justify-center time-container">
                            {moment(currCard.dueDate).format("MMM DD")}
                        </div>
                    </div>
                }
            </div>}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        currCard: state.board.currCard
    }
}

export default connect(mapStateToProps)(CardPreviewActions);