import React from 'react'

export class Stack extends React.Component {


    state = {

    };

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    render() {
        // console.log(this.props);
        const { innerRef, provided, style, children } = this.props;
        // console.log(provided);
        return (
            <div className="stack flex column align-center space-start" ref={innerRef} style={style}
                {...provided.droppableProps} >
                {children}
            </div>

        )
    }
};