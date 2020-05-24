import React from 'react'

export default class CardChecklist extends React.Component {
    state = {
        checklist: {
            title: 'Checklist',
            todos: []
        },
        newTodo: {
            id: '',
            title: 'Add new todo',
            checked: ''
        },
    }
    componentDidMount() {
        const { card } = this.props
        if (card.checklist) {
            this.setState({ title: card.checklist.title })
            this.setState({ todos: card.checklist })
        }
    }

    onEditChecklist = (ev) => {
        let { name, value } = ev.target;
        this.setState(prevState => ({ checklist: { ...prevState.checklist, [name]: value } }))
    }

    handleChange = (ev) => {
        let { name, value } = ev.target;
        this.setState(prevState => ({ newTodo: { ...prevState.newTodo, [name]: value } }))
    }

    onAddTodo = (ev) => {

        this.props.addTodo(this.state.newTodo)
    }

    onUpdateTodo = (ev, todoId) => {
        let { name, value } = ev.target;
        this.setState(prevState => ({ newTodo: { ...prevState.newTodo, [name]: value } }))
        let newTodos = this.state.todos.map(todo => {
            if (todo.id === todoId) return this.state.newTodo
            return todo;
        })
        this.setState({ todos: newTodos })
    }

    render() {
        const { card } = this.props
        const { title } = this.state.checklist

        return (
            <div className="card-checklist-container">
                <div className="card-checklist-title">
                    <input type="text" name="title" className="checklist-title" onChange={this.onEditChecklist} value={title} />
                    <div className="checklist-todos-container">
                        {card.checklist.map(todo => <div key={todo.id} onClick={(event) => this.onUpdateTodo(event, todo.id)}>
                            {todo.title}
                        </div>)}
                    </div>
                    <input type="text" name="title" className="checklist-title todo-title" onChange={this.handleChange} value={this.state.newTodo.title} />
                </div>
            </div>
        )
    }
}

