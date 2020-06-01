import React, { Component } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { makeId } from '../../services/utilService'


export default class CardComments extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    state = {
        comment: {
            txt: ''
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isFocusComment !== prevProps.isFocusComment) {
            this.myRef.current.focus();
            this.setState({ comment: { txt: 'Comment on time estimation: ' } })
        }
    }

    onAddComment = (ev) => {
        ev.preventDefault();
        const newCard = { ...this.props.card }
        const { comment } = this.state
        if (!comment.txt) return;
        comment.id = makeId();
        comment.createdAt = Date.now();
        comment.byMember = this.props.loggedInUser;
        newCard.comments.unshift(comment)
        newCard.activities.unshift({
            id: makeId(), txt: `set card comment to ${comment.txt}`,
            createdAt: Date.now(), byMember: this.props.loggedInUser
        })
        this.props.saveCard(newCard)
        this.setState({ comment: { txt: '' } })
    }

    handleChange = ({ target }) => {
        this.setState(prevState => ({ comment: { ...prevState.comment, txt: target.value } }))
    }

    removeComment = (comment) => {
        const newCard = { ...this.props.card }
        newCard.comments = newCard.comments.filter(currComment => currComment.id !== comment.id)
        newCard.activities.unshift({
            id: makeId(), txt: `removed card comment ${comment.txt}`,
            createdAt: Date.now(), byMember: this.props.loggedInUser
        })
        this.props.saveCard(newCard)
    }

    render() {
        const { card } = this.props
        const { comment } = this.state
        return (
            <>
                <div className="card-mini-title flex align-center">
                    <img src="/assets/img/comment.png" alt="" />
                    <label className="card-txt-title" htmlFor="cardComment">Comments</label>
                </div>
                <div className="main-content-card-action">
                    <form onSubmit={this.onAddComment}>
                        <input ref={this.myRef} name="comment" className="comment-input input" autoComplete="off"
                            onChange={this.handleChange} id="cardComment" placeholder="Your comment..."
                            value={comment.txt} />
                        <button className="btn-primary comment-btn">Add Comment</button>
                    </form>
                    <div className="comments-container">
                        {card.comments && card.comments.map((comment, idx) => <div className="comment flex align-start column" key={idx}>
                            <div className="flex align-center">
                                <div className="member flex justify-center align-center"
                                    style={{ backgroundImage: `url(${comment.byMember.imgUrl})`, backgroundColor: comment.byMember.bgColor }}>
                                    <span className="member-two-chars">{this.props.getTwoChars(comment.byMember.fullname)}</span>
                                </div>
                                <div>
                                    <span className="comment-title-fullname">{comment.byMember.fullname}</span>
                                    <span className="comment-title-time">{moment(comment.createdAt).fromNow()}</span>
                                </div>
                            </div>
                            <div className="comment-txt">{comment.txt}</div>
                            <Link className="delete-comment" to="#" onClick={() => this.removeComment(comment)}>Delete</Link>
                        </div>)}
                    </div>
                </div>
            </>
        )
    }
}
