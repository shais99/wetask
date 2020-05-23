import React, { Component } from 'react'


export default class LabelsPicker extends Component {
    state = {
        labels: [{ title: 'small', color: '#61bd4f' }, { title: 'error', color: '#f2d600' },
        { title: 'design', color: '#ff9f1a' }, { title: 'feature', color: '#eb5a46' },
        { title: 'bug', color: '#c377e0' }, { title: 'warning', color: '#0079bf' }]
    }

    isLabelChecked = (labelName) => {
        const currCard = this.props.getCurrCard();
        if (!currCard.labels) currCard.labels = [];
        if (currCard.labels.find(label => labelName === label.title)) return true
        return false
    }

    // labelTitle(title){
    //     switch (title) {
    //         case 'small':

    //             break;

    //         default:
    //             break;
    //     }

    // }

    render() {
        const { addLabel } = this.props
        const { isLabelChecked } = this
        return <>
            {this.state.labels.map((label, idx) => {
                return <div key={idx} className="label-item flex space-between" style={{ backgroundColor: label.color }}
                    onClick={() => addLabel({ title: label.title, color: label.color })}>
                    {label.title.charAt(0).toUpperCase() + label.title.slice(1)} {isLabelChecked(label.title) ? <img src="/assets/img/icon-checked.png" /> : ''}
                </div>
            })}
        </>
    }
}