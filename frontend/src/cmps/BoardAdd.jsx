import React from 'react'
import { connect } from 'react-redux'
import { save } from '../store/actions/boardActions'
import { Link } from 'react-router-dom'
import BoardBg from './BoardBg'



class BoardAdd extends React.Component {
    state = {
        board: {
            title: '',
            bg: '#eb3b5a'
        },
        bgColors: ['blue', 'red', 'pink', 'black', 'yellow', '#122961', '#3867d6', '#fed330', '#eb3b5a'],
        bgImgs: ['assets/img/bg-beach.jpg', 'assets/img/bg-flowers.jpg',
            'assets/img/bg-sunset.jpg', 'assets/img/bg-view.jpg',
            'assets/img/bg-view2.jpg', 'assets/img/bg-view3.jpg',
            'assets/img/bg-view4.jpg', 'assets/img/bg-water.jpg', 'assets/img/bg-view5.jpg'],
        bgBy: 'color'
    }

    handleChange = (ev) => {
        let { name, value } = ev.target;
        this.setState(prevState => ({ board: { ...prevState.board, [name]: value } }))
    };

    onHandleSubmit = (ev) => {
        ev.preventDefault()
        const { board } = this.state
        board.members = [{ _id: '5ec5581139619913d9c4da56', name: 'abi abambi' }];
        board.stack = [];
        board.createdAt = Date.now();
        board.createdBy = { _id: '5ec5581139619913d9c4da56', name: 'abi abambi' };
        board.activities = [];
        this.props.save(board)
        this.setState({ board: '' })
    };

    changeBgColor = (bg) => {
        this.setState(prevState => ({ board: { ...prevState.board, bg } }))
    }

    onChangeBgBy(bgBy) {
        this.setState({ bgBy });
    }



    render() {
        const { board, bgColors, bgImgs, bgBy } = this.state
        const { onClose } = this.props
        return <>
            <div className="screen" onClick={onClose}>
                <div className="modal-container" onClick={(ev) => ev.stopPropagation()} style={{ backgroundColor: "unset" }}>
                    <form onSubmit={this.onHandleSubmit}>
                        <div className="main-form-container flex wrap">
                            <div className="main-form"
                                style={{ backgroundColor: board.bg, backgroundImage: `url(${board.bg})`, backgroundSize: "cover" }}>
                                <div className="main-form-header flex space-between">
                                    <h3>Create Board</h3>
                                    <button className="close-btn" onClick={onClose}>X</button>
                                </div>

                                <input name="title" className="borad-title card-title" value={board.title}
                                    placeholder="Add board title" onChange={this.handleChange} />
                                <Link className="clean-link" to="#" onClick={() => this.onChangeBgBy('color')}> Color</Link>|
                                    <Link className="clean-link" to="#" onClick={() => this.onChangeBgBy('image')}>Image</Link>

                            </div>
                            <div className="bg-color-container flex ">
                                <BoardBg bgs={bgBy === 'color' ? bgColors : bgImgs} type={bgBy} changeBgColor={this.changeBgColor} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="create-board-btn btn" > Create Board</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    }
}



const mapDispatchToProps = {
    save
}


export default connect(null, mapDispatchToProps)(BoardAdd);