import React from 'react'
import ReomveCard from '../card/RemoveCard'
import ChangeStackTitle from './ChangeStackTitle'

export default class StackMenu extends React.Component {

    state = {
        isOpenModalRemove: false,
    };

    onToggleRemoveStack = () => {
        this.setState(prevState => ({ isOpenModalRemove: !prevState.isOpenModalRemove }))
    }

    onRemoveStack = () => {
        this.props.onStackRemove(this.props.stack.id)
    }

    render() {
        const { isOpenModalRemove } = this.state;
        const { stack, onToggleAction } = this.props
        return (
            <>
                <ul className="stack-menu-list">
                    <ChangeStackTitle onToggleAction={onToggleAction} stack={stack} onToggleChangeTitle={this.onToggleChangeTitle} onChangeTitle={this.onChangeTitle} />
                    <li className="stack-menu-item" onClick={this.onToggleRemoveStack}><div className="stack-menu-remove" >Remove List</div></li>
                </ul>
                {isOpenModalRemove && <ReomveCard type="stack" onToggleRemoveStack={this.onToggleRemoveStack} onRemoveStack={this.onRemoveStack} />}
            </>
        )
    }
};