import React, { Component } from 'react'
import CardDescription from '../cmps/CardDescription'
import CardComments from '../cmps/CardComments'
import {Link} from 'react-router-dom'


export default class CardDetails extends Component {

    state = {
        card: {
            id: 'c101',
            title: 'Remove the images from the website',
            desc: 'Description is here...',
            comments: [{
                id: "c101",
                txt: "A Comment",
                createdAt: "TIME_STAMP",
                byMember: {
                    _id: "u101",
                    fullName: "Abi Abambi",
                    imgUrl: "http://some-img"
                }
            }],
            members: [{
                _id: "u101",
                fullName: "Abi Abambi",
                imgUrl: "http://some-img"
            },
            {
                _id: "u102",
                fullName: "Abi Abambi22",
                imgUrl: "http://some-img"
            }],
            labels: [{
                title: "A Comment1",
                color: "#fefefe"
            },
            {
                title: "A Comment2",
                color: "#000000"
            }],
            checklists: [{
                id: "ch101",
                title: "Stuff to-do",
                todos: [{
                    id: "td101",
                    txt: "Add *FEATURE* to project",
                    isDone: false,
                    createdAt: "TIME_STAMP"
                }, {
                    id: "td101",
                    txt: "Add *FEATURE* to project",
                    isDone: false,
                    createdAt: "TIME_STAMP"
                }],
                createdAt: "TIME_STAMP"
            }, {
                id: "ch101",
                title: "Stuff to-do",
                todos: [{
                    id: "td101",
                    txt: "Add *FEATURE* to project",
                    isDone: false,
                    createdAt: "TIME_STAMP"
                }, {
                    id: "td101",
                    txt: "Add *FEATURE* to project",
                    isDone: false,
                    createdAt: "TIME_STAMP"
                }],
                createdAt: "TIME_STAMP"
            }],
            dueDate: 'TIME_STAMP',
            createdAt: 'TIME_STAMP',
            byMember: {
                _id: "u101",
                fullName: "Abi Abambi",
                imgUrl: "http://some-img"
            }
        },
        description: {
            txt: '',
            isDescShown: false
        },
        comment: {
            txt: ''
        }
    }

    toggleDescShown = () => {
        this.setState(prevState => ({ isDescShown: !prevState.isDescShown }))
    }

    render() {
        const { card, isDescShown, description, comment } = this.state
        return (
            <>
                <div className="screen">
                    <div className="modal-container">
                        <div className="modal-header flex space-between">
                            <input name="title" className="card-title" value={card.title} />
                            <button className="close-modal">X</button>
                        </div>


                        <div className="card-container flex">
                            <aside className="card-content">
                                <CardDescription description={description.txt} isShownToggle={this.toggleDescShown} isSubmitShown={isDescShown} />
                                <CardComments comment={comment.txt} />
                            </aside>

                            <aside className="card-actions">
                                <ul className="clean-list">
                                    <Link><li>Members</li></Link>
                                    <Link><li>Labels</li></Link>
                                    <Link><li>Checklist</li></Link>
                                    <Link><li>Due Date</li></Link>
                                </ul>
                            </aside>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
