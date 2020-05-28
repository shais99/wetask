import React from 'react'

export default class CardShowTimeEstimation extends React.Component {



    render() {
        const { timeEstimation } = this.props.card
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
                        {!timeEstimation.approve && <div className="flex align-center justify-center" >
                            <span onClick={this.props.onApproveTimeEstimation}><img src="/assets/img/approve.png" title="Approve" alt="" /></span>
                            <span onClick={this.props.onFocusComment}><img src="/assets/img/small-comment.png" title="Comment" alt="" /></span>
                        </div>
                        }
                    </div>
                </>}
            </>
        )
    }
}