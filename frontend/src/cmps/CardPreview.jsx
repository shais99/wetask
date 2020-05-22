import React from 'react';

export function CardPreview(props) {

    const { innerRef, provided, style } = props;
    return (
        <div className="card-preview" ref={innerRef} style={style}
            {...provided.draggableProps} {...provided.dragHandleProps} >
            {props.title}
        </div>
        
    )

}