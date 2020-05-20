import React, { Component } from 'react'

export default class CardComments extends Component {
    render() {
        return (
            <>
                <div className="card-mini-title"><label htmlFor="cardComment">Comments:</label></div>
                <form>
                    <input name="comment" className="comment-input" id="cardComment" placeholder="Your comment..." value={this.props.comment} />
                    <button className="comment-btn">Add Comment</button>
                </form>
            </>
        )
    }
}
