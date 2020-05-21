import React, { Component } from 'react'
import moment from 'moment'

export default class CardComments extends Component {
    render() {
        return (
            <>
                <div className="card-mini-title"><label htmlFor="cardComment">Comments:</label></div>
                <form onSubmit={this.props.onAddComment}>
                    <input name="comment" className="comment-input" autoComplete="off" onChange={this.props.handleChange} id="cardComment" placeholder="Your comment..." value={this.props.comment} />
                    <button className="comment-btn">Add Comment</button>
                </form>
                <div className="comments-container">
                    {this.props.comments && this.props.comments.map((comment, idx) => <div className="comment" key={idx}>
                        <div>Comment By: {comment.byMember.fullName}, At {moment(comment.createdAt).fromNow()}</div>
                        <div>{comment.txt}</div>
                    </div>)}
                </div>
            </>
        )
    }
}
