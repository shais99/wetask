import React, { Component } from 'react'
import CardChangeLabel from './CardChangeLabel';
import { makeId } from '../../services/utilService'


export default class LabelsPicker extends Component {
    state = {
        isChangeShown: false,
        labelSelected: ''
    }

    onToggleLabel = (currLabel) => {
        const { loggedInUser, card } = this.props
        const newCard = { ...card }
        const labelIdx = newCard.labels.findIndex(label => label.id === currLabel.id);

        if (labelIdx === -1) {
            newCard.activities.unshift({
                id: makeId(), txt: `add label: ${currLabel.title} to the card`,
                createdAt: Date.now(), byMember: loggedInUser
            })
            newCard.labels.push(currLabel)
        }
        else {
            newCard.activities.unshift({
                id: makeId(), txt: `removed label: ${currLabel.title} from the card`,
                createdAt: Date.now(), byMember: loggedInUser
            })
            newCard.labels.splice(labelIdx, 1)
        }
        this.props.saveCard(newCard)
    }

    onChangeLabelColor = (labelId, color, title) => {
        const newBoard = { ...this.props.board }
        const newCard = { ...this.props.card }
        newBoard.boardLabels.find(label => {
            if (label.id === labelId) {
                if (color) label.color = color;
                if (title) label.title = title;
            }
        })
        newCard.labels.find(label => {
            if (label.id === labelId) {
                if (color) label.color = color;
                if (title) label.title = title;
            }
        })
        this.props.save(newBoard)
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

    onBackToLabels = () => {
        this.setState(prevState => ({ isChangeShown: !prevState.isChangeShown }));
    }

    render() {
        const { board } = this.props
        const { labelSelected, isChangeShown } = this.state

        return (
            <>
                {!isChangeShown && board.boardLabels.map((label, idx) => {
                    return <div key={idx} className="flex align-center space-between">
                        <div className="label-item flex align-center space-between"
                            style={{ backgroundColor: label.color }} onClick={() => this.onToggleLabel(label)}>
                            {label.title}
                            {this.isLabelChecked(label.id) ? <img src="/assets/img/icon-checked-white.png" alt="" /> : ''}
                        </div>
                        <div className="edit-icon" onClick={() => this.onEditLabel(label.id)}>
                            <img src="/assets/img/edit.svg" />
                        </div>
                    </div>
                })}
                {isChangeShown && labelSelected && <CardChangeLabel board={board} labelSelected={labelSelected} onChangeLabelColor={this.onChangeLabelColor} onBackToLabels={this.onBackToLabels} />}
            </>
        )
    }
}