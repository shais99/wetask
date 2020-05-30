import React, { Component } from 'react'
import CardChangeLabel from './CardChangeLabel';


export default class LabelsPicker extends Component {
    state = {
        // labels: [{ id: '101', title: 'done', color: '#61bd4f' }, { id: '102', title: 'error', color: '#f2d600' },
        // { id: '103', title: 'design', color: '#ff9f1a' }, { id: '104', title: 'feature', color: '#eb5a46' },
        // { id: '105', title: 'bug', id: '106', color: '#c377e0' }, { id: '107', title: 'warning', color: '#0079bf' }],
        isChangeShown: false,
        labelSelected: ''
    }

    isLabelChecked = (labelId) => {
        const currCard = this.props.card;
        if (!currCard.labels) currCard.labels = [];
        if (currCard.labels.find(label => labelId === label.id)) return true
        return false
    }

    onEditLabel = (labelId) => {
        this.setState(prevState => ({ isChangeShown: !prevState.isChangeShown, labelSelected: labelId }));
    }

    onBackToLabels = () =>{
        this.setState(prevState => ({ isChangeShown: !prevState.isChangeShown }));
    }

    render() {
        const { addLabel, onChagneLabelColor, board } = this.props
        const { labelSelected, isChangeShown } = this.state
        return <>
            {!isChangeShown && board.boardLabels.map((label, idx) => {
                return <div key={idx} className="flex align-center space-between">
                    <div className="label-item flex align-center space-between"
                        style={{ backgroundColor: label.color }} onClick={() => addLabel(label)}>
                        {label.title.charAt(0).toUpperCase() + label.title.slice(1)}
                        {this.isLabelChecked(label.id) ? <img src="/assets/img/icon-checked-white.png" alt="" /> : ''}
                    </div>
                    <div className="edit-icon" onClick={() => this.onEditLabel(label.id)}>
                        <img src="/assets/img/edit.svg" />
                    </div>
                </div>
            })}
            {isChangeShown && labelSelected && <CardChangeLabel labelSelected={labelSelected} onChagneLabelColor={onChagneLabelColor} onBackToLabels={this.onBackToLabels}/>}
        </>
    }
}