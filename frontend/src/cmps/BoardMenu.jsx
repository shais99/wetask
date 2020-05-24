import React, { Component } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom'
import BoardStyling from '../cmps/BoardStyling'
import BoardActivities from '../cmps/BoardActivities'

export default class BoardMenu extends Component {

    state = {
        isStylingShown: false
    }

    onToggleStyling = () => this.setState(prevState => ({ isStylingShown: !prevState.isStylingShown }))

    render() {
        const { onClose, onSetBg, board } = this.props
        const { isStylingShown } = this.state
        return (
            <OutsideClickHandler onOutsideClick={() => onClose()} display={'contents'}>
                <div className="board-menu-container">
                    <div className="board-menu-title flex space-between align-center">
                        Board Managment
                    <img src="/assets/img/close-white.png" className="close-icon" onClick={() => onClose()} alt="" />
                    </div>

                    {!isStylingShown && <ul className="board-menu-list clean-list">
                        <Link to="#" onClick={this.onToggleStyling}><li><img src="/assets/img/style.png" className="small-icon" alt="" />Board Styling</li></Link>
                        <li><img src="/assets/img/stats.png" className="small-icon" alt="" />Show Board Statistics</li>
                        <li className="remove-board"><img src="/assets/img/trash.png" className="small-icon" alt="" />Remove Board</li>
                    </ul>}

                    {!isStylingShown && <BoardActivities board={board} />}

                    {isStylingShown && <BoardStyling onSetBg={onSetBg} onToggleStyling={this.onToggleStyling} />}
                </div>
            </OutsideClickHandler>
        )
    }
}