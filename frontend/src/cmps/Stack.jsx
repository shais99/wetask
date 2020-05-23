import React from 'react'

export class Stack extends React.Component {


    state = {

    };

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    render() {
        const { innerRef, provided, style, children } = this.props;
        return (
            <div className="stack flex column space-start" ref={innerRef} style={style}
                {...provided.droppableProps} >
                {children}
            </div>

        )
    }
};