import React from 'react';

export function CardPreview(props) {

    const { innerRef, provided, style } = props;
    return (
        <div className="card-preview flex space-around" ref={innerRef} style={style}
            {...provided.draggableProps} {...provided.dragHandleProps} >
            {props.title}
        </div>
        
    )

}