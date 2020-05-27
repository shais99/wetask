import React from 'react'

export default class CardMove extends React.Component {

    state = {
        selectIsShown: false
    }

    onToggleSelect = () => {
        this.setState(prevState => ({ selectIsShown: !prevState.selectIsShown }))
    }

    render() {
        const { card, board } = this.props
        const { selectIsShown } = this.state
        return (
            <div className="card-move-container">
                <h4>SELECT DESTINATION</h4>
                <div className="select-stack" onClick={this.onToggleSelect}>Select list</div>
                {selectIsShown && <div className="selection-container">
                    {board.stacks.map((stack, idx) => {
                        if(stack.cards.find(currCard => currCard.id === card.id)) return null;
                        return <div key={idx} className="option-stack-name" onClick={() => this.props.moveCardToStack(stack)}>{stack.title}</div>
                    })}
                </div>}
            </div>

        )
    }

}

