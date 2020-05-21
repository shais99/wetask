import React, { Component } from 'react'


export default class LabelsPicker extends Component {
    state = {
        labels: []
    }

    render() {
        const { addLabel } = this.props
        return <div>
            <div onClick={() => addLabel('small')}>Small</div>
            <div onClick={() => addLabel('error')}>Error</div>
            <div onClick={() => addLabel('design')}>Design</div>
            <div onClick={() => addLabel('feature')}>Feature</div>
            <div onClick={() => addLabel('bug')}>Bug</div>
            <div onClick={() => addLabel('warning')}>Warning</div>
        </div>
    }
}