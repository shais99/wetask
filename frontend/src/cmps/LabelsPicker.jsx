import React, { Component } from 'react'


export default class LabelsPicker extends Component {
    state = {
        labels: [],
    }

    isLabelChecked = (labelName) => {
        const currCard = this.props.getCurrCard();
        console.log('currCard',currCard);
        if(!currCard.labels) currCard.labels = [];
        if (currCard.labels.find(label => labelName === label)) return true
        return false
    }

    render() {
        const { addLabel, onToggleAction } = this.props
        const { isLabelChecked } = this
        return <div className="labels-container">
            <div className="labels-header flex space-between">
                <h3>Labels</h3>
                <button className="close-label" onClick={()=>onToggleAction('label')}>X</button>
            </div>
            <div className="label-item" style={{ backgroundColor: "#61bd4f" }}
                onClick={() => addLabel('small')}>Small {isLabelChecked('small') ? 'hi' : ''}</div>



            <div className="label-item" style={{ backgroundColor: "#f2d600" }}
                onClick={() => addLabel('error')}>Error</div>
            <div className="label-item" style={{ backgroundColor: "#ff9f1a" }}
                onClick={() => addLabel('design')}>Design</div>
            <div className="label-item" style={{ backgroundColor: "#eb5a46" }}
                onClick={() => addLabel('feature')}>Feature</div>
            <div className="label-item" style={{ backgroundColor: "#c377e0" }}
                onClick={() => addLabel('bug')}>Bug</div>
            <div className="label-item" style={{ backgroundColor: "#0079bf" }}
                onClick={() => addLabel('warning')}>Warning</div>
        </div >
    }
}