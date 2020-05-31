import React from 'react'
import { connect } from 'react-redux'
import { saveCard } from '../store/actions/boardActions'


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
        this.setState({ checklist: { title: this.props.checklist.title, todos: this.props.checklist.todos } })
    }

    onEditChecklistTitle = (ev) => {
        let { value } = ev.target;
        this.setState({ checklist: { title: value } })
    }

    onSaveChecklistTitle = () => {
        this.props.onEditChecklistTitle(this.props.checklist.id, this.state.checklist.title)
    }

    handleChange = (ev) => {
        let { name, value } = ev.target;
        this.setState(prevState => ({ newTodo: { ...prevState.newTodo, [name]: value } }))
    }

    onAddTodo = (ev) => {
        ev.preventDefault();
        this.props.addTodo(this.props.checklist.id, this.state.newTodo)
        this.setState({ newTodo: { title: '', isDone: false } })
    }

    updateTodo = (ev, todo) => {
        let { name, value } = ev.target;
        console.log('todo', todo);

        const newTodo = { ...todo, [name]: value }
        this.setState(prevState => ({
            checklist: {
                ...prevState.checklist, todos: prevState.checklist.todos.map(currTodo => {
                    if (currTodo.id === todo.id) return newTodo
                    return currTodo
                })
            }
        }), () => console.log(this.state.checklist.todos)
        )
        // this.props.addTodo(this.props.checklist.id, this.state.newTodo)
    }

    onUpdateTodo = (ev, todo, click = false) => {
        let { name, value } = ev.target;
        if (click) todo.isDone = !todo.isDone;
        const newTodo = { ...todo, [name]: value }
        this.props.addTodo(this.props.checklist.id, newTodo)
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

    render() {
        const { card } = this.props
        const { title, todos, id, } = this.props.checklist
        const width = this.calculateProgBarWidth();
        const bgc = this.calculateProgBarBgc();
        return (
            <div className="card-checklist-container">
                <div className="card-checklist-title flex align-center space-between">
                    <div className="checklist-title flex align-center">
                        <img src="/assets/img/todos.png" />
                        <input type="text" name="title" className="checklist-title" autoComplete="off"
                            onChange={this.onEditChecklistTitle}
                            onBlur={this.onSaveChecklistTitle} value={this.state.checklist.title} />
                    </div>
                    <button className="btn btn-delete" onClick={() => this.props.onRemoveChecklist(this.props.checklist)}>Delete</button>
                </div>
                <div className="checklist-main">
                    <div className="checklist-progress-bar-container"><span>{`${width}%`}</span>
                        <div className="checklist-progress-bar">
                            <div className="progress-bar" style={{ width: `${width}%`, backgroundColor: `${bgc}` }}>
                            </div>
                        </div>
                    </div>
                    <div className="checklist-todos-container">
                        {todos.map((todo) => <div className="flex align-center todo-item space-between" key={todo.id}>
                            <div className="todo-check-container flex align-center">
                                <div className={todo.isDone ? "checkbox done" : "checkbox"} onClick={(ev) => this.onUpdateTodo(ev, todo, true)}>
                                </div>
                                <input name="title" className={`checklist-title todo-title ${todo.isDone ? 'done-decoration' : 'd'}`}
                                    value={todo.title} onChange={(ev) => this.onUpdateTodo(ev, todo)} onBlur={(ev) => this.onUpdateTodo(ev, todo)} />
                            </div>
                            <div className="todo-delete-btn-container"><img className="todo-delete-btn" src="/assets/img/close.png" onClick={() => this.props.onRemoveTodo(id, todo)} /></div>
                        </div>
                        )}
                        <form onSubmit={this.onAddTodo}>
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