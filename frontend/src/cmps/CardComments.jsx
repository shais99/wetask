import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'


export default class CardComments extends Component {
    render() {
        return (
            <>
                <div className="card-mini-title flex align-center">
                    <img src="/assets/img/comment.png" alt="" />
                    <label className="card-txt-title" htmlFor="cardComment">Comments:</label>
                </div>
                <div className="main-content-card-action">
                    <form onSubmit={this.props.onAddComment}>
                        <input name="comment" className="comment-input input" autoComplete="off" onChange={this.props.handleChange} id="cardComment" placeholder="Your comment..." value={this.props.comment} />
                        <button className="btn-primary comment-btn">Add Comment</button>
                    </form>
                    <div className="comments-container">
                        {this.props.comments && this.props.comments.map((comment, idx) => <div className="comment flex align-start column" key={idx}>
                            <div className="flex align-center">
                                <div className="member flex justify-center align-center"
                                    style={{ backgroundImage: `url(${comment.byMember.imgUrl})`, backgroundColor: comment.byMember.bgColor }}>
                                    {this.props.getTwoChars(comment.byMember.fullname)}
                                </div>
                                <div>
                                    <span className="comment-title-fullname">{comment.byMember.fullname}</span>
                                    <span className="comment-title-time">{moment(comment.createdAt).fromNow()}</span>
                                </div>
                            </div>
                            <div className="comment-txt">{comment.txt}</div>
                            <Link className="delete-comment" to="#" onClick={()=>this.props.removeComment(comment)}>Delete</Link>
                        </div>)}
                    </div>
                </div>
            </>
        )
    }
}
