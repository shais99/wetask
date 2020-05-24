import React from 'react'
import { makeId } from '../services/utilService'

export default class CardChecklist extends React.Component {
    state = {
        newTodo: {
            title: '',
            checked: false
        }
    }

    onEditChecklistTitle = (ev) => {
        let { value } = ev.target;
        this.props.onEditChecklistTitle(this.props.checklist.id, value)
    }

    handleChange = (ev) => {
        let { name, value } = ev.target;
        this.setState(prevState => ({ newTodo: { ...prevState.newTodo, [name]: value } }))
    }

    onAddTodo = (ev) => {
        ev.preventDefault();
        this.props.addTodo(this.props.checklist.id, this.state.newTodo)
        this.setState({ newTodo: { title: '', checked: false } })
    }

    onUpdateTodo = (ev, todo) => {
        let { name, value } = ev.target;
        const newTodo = { ...todo, [name]: value }
        this.props.addTodo(this.props.checklist.id, newTodo)
    }

    render() {
        const { checklist } = this.props
        const { title, todos } = checklist

        return (
            <div className="card-checklist-container">
                <div className="card-checklist-title">
                    <input type="text" name="title" className="checklist-title" onChange={this.onEditChecklistTitle} value={title} />
                    <div className="checklist-todos-container">
                        {checklist.todos.map((todo) => <input key={todo.id} name="title"
                            className="checklist-title todo-title"
                            value={todo.title} onChange={(event) => this.onUpdateTodo(event, todo)} />)}
                        <form onSubmit={this.onAddTodo}>
                            <input type="text" name="title" className="checklist-title todo-title" onChange={this.handleChange} placeholder="Add New Todo" autoComplete="off" value={this.state.newTodo.title} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

// onChange={(event) => this.onUpdateTodo(event, todo.id)}