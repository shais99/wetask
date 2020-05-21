import React, { Component } from 'react'
import CardDescription from '../cmps/CardDescription'
import CardComments from '../cmps/CardComments'
import BoardDetails from '../pages/BoardDetails'
import DueDate from '../cmps/DueDate'
import { Link } from 'react-router-dom'


export default class CardDetails extends Component {

    state = {
        card: {
            id: 'c101',
            title: 'Remove the images from the website',
            desc: 'Description is here...',
            comments: [{
                id: "c101",
                txt: "A Comment",
                createdAt: 1590043477032,
                byMember: {
                    _id: "u101",
                    fullName: "Abi Abambi",
                    imgUrl: "http://some-img"
                }
            },
            {
                id: "c102",
                txt: "B Comment",
                createdAt: 1590043496921,
                byMember: {
                    _id: "u102",
                    fullName: "Ari Arari",
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
        },
        dueDate: {
            value: new Date(),
            isShown: false
        }
    }

    componentDidMount() {
        // this.loadCard()
    }

    loadCard = () => {
        const card = this.props.card
        this.setState({ card })
    }

    toggleDescShown = () => {
        this.setState(prevState => ({ isDescShown: !prevState.isDescShown }))
    }

    onBackBoard = (ev) => {
        const { boardId } = this.props.match.params
        this.props.history.push(`/boards/${boardId}`)
    }

    onChangeDate = (dueDate) => this.setState(prevState => ({ dueDate: { ...prevState.date, value: dueDate } }))

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({ card: { ...prevState.user, [field]: value } }))
    }

    onToggleShowDate = () => {

        this.setState(prevState => ({ dueDate: { ...prevState.dueDate, isShown: !prevState.isShown } }))
    }

    render() {
        const { card, isDescShown, description, comment, dueDate } = this.state
        return (
            <>
                <BoardDetails />
                <div className="screen" onClick={this.onBackBoard}>
                    <div className="modal-container shadow-drop-2-center" style={{ paddingBottom: '40px' }} onClick={(ev) => ev.stopPropagation()}>
                        <div className="modal-header flex space-between">
                            <input name="title" className="card-title" onChange={this.handleChange} value={card.title} />
                            <button className="close-modal" onClick={this.onBackBoard}>X</button>
                        </div>

                        <div className="card-container flex">
                            <aside className="card-content">
                                <CardDescription description={description.txt} isShownToggle={this.toggleDescShown} isSubmitShown={isDescShown} />
                                <CardComments comments={card.comments} comment={comment.txt} />
                            </aside>

                            <aside className="card-actions">
                                <ul className="clean-list">
                                    <Link title="Add / Remove members"><li><img src="/assets/img/user-icon.png" alt="" />Members</li></Link>
                                    <Link title="Add / Remove labels"><li><img src="/assets/img/label-icon.png" alt="" />Labels</li></Link>
                                    <Link title="Add checklist"><li><img src="/assets/img/checklist-icon.png" alt="" />Checklist</li></Link>
                                    <Link title="Set due date" onClick={this.onToggleShowDate}><li><img src="/assets/img/clock-icon.png" alt="" />Due Date</li></Link>
                                    {dueDate.isShown && <DueDate onChange={this.onChangeDate} value={dueDate.value} />}
                                </ul>
                            </aside>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
