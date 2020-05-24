import React from 'react';

export function CardPreview(props) {

    const { card, innerRef, provided, style } = props;
    const showInfo = (card.comments.length || card.description !== '');
    return (
        <>
            <div className="card-preview" ref={innerRef} style={style}
                {...provided.draggableProps} {...provided.dragHandleProps} >
                <p className="card-preview-title">{props.title}</p>
        
                {(showInfo)
                    ?
                    <div className="card-preview-info flex align-center space-start">
                        {(card.description !== '')
                            ?
                            <span className="preview-info-span flex align-center">
                                <img className="preview-info-img" src="/assets/img/description.png" />
                            </span>
                            :
                            null
                        }
                        {(card.comments.length)
                            ?
                            <span className="preview-info-span flex align-center">
                                <img className="preview-info-img" src="/assets/img/comment.png" />
                                <p className="preview-info-count">{card.comments.length}</p>
                            </span>
                            :
                            null
                        }
                        {(card.checklists && card.checklists.length)
                            ?
                            <span className="preview-info-span flex align-center">
                                <img className="preview-info-img" src="/assets/img/todos.png" />
                                <p className="preview-info-count">{card.checklists.length}</p>
                            </span>
                            :
                            null
                        }
                    </div>
                    : null}
            </div>


        </>
    )

}