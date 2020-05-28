import React, { Component } from 'react'


export default class CardChangeLabel extends Component {
    state = {
        colors: [
            { title: '#61bd4f', isChecked: false }, { title: '#f2d600', isChecked: false },
            { title: '#ff9f1a', isChecked: false }, { title: '#eb5a46', isChecked: false },
            { title: '#c377e0', isChecked: false }, { title: '#0079bf', isChecked: false },
            { title: '#61bd4f', isChecked: false }, { title: '#f2d600', isChecked: false },
            { title: '#ff9f1a', isChecked: false }, { title: '#eb5a46', isChecked: false },
            { title: '#c377e0', isChecked: false }, { title: '#0079bf', isChecked: false }
        ],
        colorChecked: ''
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
        this.props.onChagneLabelColor(labelId,this.state.colorChecked);
    }


    render() {
        const { labelId, onToggleAction } = this.props
        return <>
            <div className="flex wrap align-center justify-center">
                {this.state.colors.map((color, idx) => {
                    return <div key={idx} className="label-color-item flex align-center justify-center" onClick={() => this.isColorChecked(color.title)}
                        style={{ backgroundColor: color.title }} >
                        {color.isChecked && <img src="/assets/img/icon-checked-white.png" alt="" />}
                    </div>
                })}
            </div>
            <div className="btns-container flex space-between">
                <button className="btn btn-primary" onClick={() => {
                    this.changeLabel(labelId);
                }}>Save</button>
                <button className="btn btn-danger" onClick={() => {
                    this.changeLabel('');
                }}>Remove</button>
            </div>
        </>
    }
}