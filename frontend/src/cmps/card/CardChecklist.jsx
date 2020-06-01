import React from 'react'
import { connect } from 'react-redux'
import { saveCard } from '../../store/actions/boardActions'
import { makeId } from '../../services/utilService'


class CardChecklist extends React.Component {
    state = {
        newTodo: {
            title: '',
            isDone: false
        },
        checklist: {
            title: '',
            todos: []
        }
    }

    componentDidMount() {
        this.loadChecklistTitle()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.checklist !== this.props.checklist) this.loadChecklistTitle()
    }

    loadChecklistTitle = () => {
        this.setState({ checklist: { title: this.props.checklist.title, todos: this.props.checklist.todos } })
    }

    onEditChecklistTitle = (ev) => {
        let { value } = ev.target;
        this.setState({ checklist: { title: value } })
    }

    onSaveChecklistTitle = (checklistId) => {
        const newCard = { ...this.props.card }
        newCard.checklists = newCard.checklists.map(checklist => {
            if (checklist.id === checklistId) checklist.title = this.state.checklist.title
            return checklist
        })
        this.props.saveCard(newCard)
    }

    handleChange = (ev) => {
        let { name, value } = ev.target;
        this.setState(prevState => ({ newTodo: { ...prevState.newTodo, [name]: value } }))
    }

    calculateProgBarWidth = () => {
        let countIsDone = 0;
        this.props.checklist.todos.forEach(todo => {
            if (todo.isDone) countIsDone++;
        })
        if (!this.props.checklist.todos.length) return 0;
        return ((countIsDone / this.props.checklist.todos.length) * 100).toFixed(0);
    }

    calculateProgBarBgc = () => {
        const width = this.calculateProgBarWidth();
        if (width === '100') return '#61bd4f'
        return '#0079bf'
    }

    onRemoveChecklist = (checklist) => {
        const newCard = { ...this.props.card }

        newCard.checklists = newCard.checklists.filter(currChecklist => currChecklist.id !== checklist.id)
        newCard.activities.unshift({
            id: makeId(), txt: `removed checklist ${checklist.title} from the card`,
            createdAt: Date.now(), byMember: this.props.loggedInUser
        })

        this.props.saveCard(newCard)
    }

    onSaveTodo = (ev, checklistId, todo, click) => {
        ev.preventDefault();
        const value = ev.target.value
        const { newTodo } = this.state
        const newCard = { ...this.props.card }
        const checklist = newCard.checklists.find(currChecklist => currChecklist.id === checklistId)
        if (!todo) {
            newTodo.id = makeId();
            checklist.todos.unshift(newTodo)
            this.setState({ newTodo: { title: '', isDone: false } })
            this.props.saveCard(newCard)
        } else {
            const foundTodo = checklist.todos.find(currTodo => currTodo.id === todo.id)

            if (click) {
                foundTodo.isDone = !foundTodo.isDone
                return this.props.saveCard(newCard)
            }
            this.setState(prevState => ({
                checklist: {
                    ...prevState.checklist,
                    todos: prevState.checklist.todos.map(currTodo => {

                        if (currTodo.id === todo.id) currTodo.title = value
                        return currTodo
                    })
                }
            }))
        }
    }

    onRemoveTodo = (checklistId, todo) => {
        const newCard = { ...this.props.card }
        newCard.checklists.map(checklist => {
            if (checklist.id === checklistId) {
                checklist.todos = checklist.todos.filter(currTodo => currTodo.id !== todo.id)
            }
            return checklist
        })
        newCard.activities.unshift({
            id: makeId(), txt: `removed todo ${todo.title} from the card`,
            createdAt: Date.now(), byMember: this.props.loggedInUser
        })
        this.props.saveCard(newCard)
    }

    render() {
        const { todos, id } = this.props.checklist
        const { card } = this.props
        const width = this.calculateProgBarWidth();
        const bgc = this.calculateProgBarBgc();

        return (
            <div className="card-checklist-container">
                <div className="card-checklist-title flex align-center space-between">
                    <div className="checklist-title flex align-center">
                        <img src="/assets/img/todos.png" />
                        <input type="text" name="title" className="checklist-title" autoComplete="off"
                            onChange={this.onEditChecklistTitle}
                            onBlur={() => this.onSaveChecklistTitle(id)} value={this.state.checklist.title} />
                    </div>
                    <button className="btn btn-delete" onClick={() => this.onRemoveChecklist(this.props.checklist)}>Delete</button>
                </div>
                <div className="checklist-main">
                    <div className="checklist-progress-bar-container"><span>{`${width}%`}</span>
                        <div className="checklist-progress-bar">
                            <div className="progress-bar" style={{ width: `${width}%`, backgroundColor: `${bgc}` }}>
                            </div>
                        </div>
                    </div>
                    <div className="checklist-todos-container">
                        {todos.map(todo => <div className="flex align-center todo-item space-between" key={todo.id}>
                            <div className="todo-check-container flex align-center">
                                <div className={todo.isDone ? "checkbox done" : "checkbox"} onClick={(event) => this.onSaveTodo(event, id, todo, true)}>
                                </div>
                                <input name="title" autoComplete="off" className={`checklist-title todo-title ${todo.isDone ? 'done-decoration' : 'd'}`}
                                    value={todo.title} onChange={(event) => this.onSaveTodo(event, id, todo)} onBlur={() => this.props.saveCard(card)} />
                            </div>
                            <div className="todo-delete-btn-container"><img className="todo-delete-btn" src="/assets/img/close.png" onClick={() => this.onRemoveTodo(id, todo)} /></div>
                        </div>
                        )}
                        <form onSubmit={(event) => this.onSaveTodo(event, id)}>
                            <input type="text" name="title" className="checklist-title todo-title add-todo" onChange={this.handleChange} placeholder="Add New Todo" autoComplete="off" value={this.state.newTodo.title} />
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}

const mapDispatchToProps = {
    saveCard
}

export default connect(null, mapDispatchToProps)(CardChecklist);