import React, { Component } from 'react'
import { connect } from 'react-redux'
import FilterCardList from './FilterCardsList'

class BoardFilter extends Component {

    state = {
        filterBy: '',
        cards: []
    }

    onSetFilterBy = ({ target }) => {
        if (!target.value) return this.clearFilter()
        this.setState({ filterBy: target.value }, () => this.filterBy(this.state.filterBy))
    }

    filterBy = () => {
        const { filterBy } = this.state
        const { currBoard } = this.props
        const filterCards = currBoard.stacks.map(stack => {
            return stack.cards.filter(card => {
                return card.title.toLowerCase().includes(filterBy.toLowerCase())
                    || card.description.toLowerCase().includes(filterBy.toLowerCase())
            })
        })
        this.setState({ cards: [].concat(...filterCards) })
    }

    clearFilter = () => {
        setTimeout(() => {
            this.setState({ cards: [], filterBy: '' })
        }, 100);
    }

    render() {
        const { currBoard, history } = this.props
        const { cards, filterBy } = this.state

        return (
            <>
                <input className={`search-container flex align-center`} autoComplete="off" name="filterBy" value={filterBy} onBlur={this.clearFilter} onChange={this.onSetFilterBy} />
                {cards.length > 0 && <FilterCardList cards={cards} history={history} boardId={currBoard._id} />}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currBoard: state.board.currBoard
    }
}

export default connect(mapStateToProps)(BoardFilter);