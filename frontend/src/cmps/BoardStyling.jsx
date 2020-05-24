import React, { Component } from 'react'
import BoardBackground from '../cmps/BoardBackground'
import { save, loadBoard } from '../store/actions/boardActions'
import { connect } from 'react-redux'

class BoardStyling extends Component {

    state = {
        bgChooseShown: ''
    }

    setBgShown = (bgChooseShown) => {
        this.setState({ bgChooseShown })
    }

    render() {
        const { bgChooseShown } = this.state
        const { onSetBg } = this.props
        return (
            <div className="board-styling-container">
                <div className="board-styling-title flex align-center">
                    {bgChooseShown && <img src="/assets/img/back.png" onClick={() => this.setBgShown('')} className="back small-icon" alt="" />}Board Styling
                </div>
                {!bgChooseShown && <button onClick={() => this.setBgShown('color')} className="background-choose color-choose"><span>Background Color</span></button>}
                {!bgChooseShown && <button onClick={() => this.setBgShown('image')} className="background-choose img-choose"><span>Background Image</span></button>}
                {bgChooseShown && <BoardBackground onSetBg={onSetBg} type={bgChooseShown} />}
            </div>
        )
    }
}

const mapDispatchToProps = {
    save,
    loadBoard
}
const mapStateToProps = (state) => {
    return {
        currBoard: state.board.currBoard
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardStyling);