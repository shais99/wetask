import React, { Component } from 'react'


export default class CardChangeLabel extends Component {
    state = {
        colors: [
            { title: '#fd9644', isChecked: false }, { title: '#fc5c65', isChecked: false },
            { title: '#fed330', isChecked: false }, { title: '#26de81', isChecked: false },
            { title: '#2bcbba', isChecked: false }, { title: '#45aaf2', isChecked: false },
            { title: '#4b7bec', isChecked: false }, { title: '#a55eea', isChecked: false },
            { title: '#122961', isChecked: false }, { title: '#ec7dd5', isChecked: false },
        ],
        colorChecked: '',
        title: ''
    }


    isColorChecked = (color) => {
        this.setState(prevState => ({
            colorChecked: color,
            colors: prevState.colors.map(currColor => {
                if (currColor.title === color) currColor.isChecked = true;
                else currColor.isChecked = false;
                return currColor;
            })
        }))
    }

    changeLabel = (labelId) => {
        if (!this.state.colorChecked) return null
        this.props.onChagneLabelColor(labelId, this.state.colorChecked, this.state.title);
    }

    onChangeTitle = (ev) =>{
        let { value } = ev.target;
        this.setState(({ title: value }))
    }


    render() {
        const { labelSelected, onBackToLabels } = this.props
        return <div className="change-label-container">
            <div className="flex align-center header-container">
                <div onClick={onBackToLabels}><img src="/assets/img/back.png" alt="" /></div>
                <h4>EDIT LABEL</h4>
            </div>
            <div>
                <input type="text" class="input label-title" autocomplete="off" placeholder="Change title"
                value={this.state.title} onChange={this.onChangeTitle}/>
            </div>
            <div className="flex wrap align-center justify-center">
                {this.state.colors.map((color, idx) => {
                    return <div key={idx} className="label-color-item flex align-center justify-center"
                        onClick={() => this.isColorChecked(color.title)}
                        style={{ backgroundColor: color.title }} >
                        {color.isChecked && <img src="/assets/img/icon-checked-white.png" alt="" />}
                    </div>
                })}
            </div>
            <div className="btns-container flex space-between">
                <button className="btn btn-primary btn-save" onClick={() => {
                    this.changeLabel(labelSelected);
                    onBackToLabels();
                }}>Save</button>
            </div>
        </div>
    }
}