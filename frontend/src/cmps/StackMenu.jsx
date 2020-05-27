import React from 'react'
import ReomveCard from '../cmps/RemoveCard'

export default class StackMenu extends React.Component {

    state = {
        isOpenModalRemove: false
    };

    onToggleRemoveCard = () => {
        this.setState(prevState => ({ isOpenModalRemove: !prevState.isOpenModalRemove }))
    }

    onRemoveStack = () => {
        this.props.onStackRemove(this.props.stackId)
    }

    render() {

        const { isOpenModalRemove } = this.state;

        return (
            <>
            <ul className="stack-menu-list">
                <li className="stack-menu-item"><div className="stack-menu-move">Move List</div></li>
                <li className="stack-menu-item" onClick={this.onToggleRemoveCard}><div className="stack-menu-remove" >Remove List</div></li>
            </ul>
            {isOpenModalRemove && <ReomveCard type="stack" onToggleRemoveCard={this.onToggleRemoveCard} onRemoveStack={this.onRemoveStack} />}
            </>
        )
    }
};