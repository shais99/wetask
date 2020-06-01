import React, { Component } from 'react'
import { connect } from 'react-redux'
import { save } from '../../store/actions/boardActions';


class ChangeStackTitle extends Component {

    state = {
        stackTitle: ''
    }

    componentDidMount() {
        this.setState({ stackTitle: this.props.stack.title })
    }


    onEditStackTitle = ({ target }) => {
        this.setState({ stackTitle: target.value });
    }

    onNewStackTitle = (ev) => {
        ev.preventDefault()
        let currBoard = { ...this.props.currBoard };
        const { stackTitle } = this.state;

        const stackIdx = currBoard.stacks.findIndex(stack => stack.id === this.props.stack.id)
        currBoard.stacks[stackIdx].title = stackTitle
        this.props.save(currBoard);
        this.props.onToggleAction('stack')
    }

    render() {
        const { stackTitle } = this.state
        return (
            <form onSubmit={this.onNewStackTitle} className="stack-title-form flex column">
                <label htmlFor="stackTitle">Change Stack Title:</label>
                <div className="flex space-between">
                    <input autoComplete="off" id="stackTitle" type="text" name="title" onChange={this.onEditStackTitle} value={stackTitle} />
                    <button className="btn btn-primary">Save</button>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currBoard: state.board.currBoard,
    }
}

const mapDispatchToProps = {
    save
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStackTitle)
