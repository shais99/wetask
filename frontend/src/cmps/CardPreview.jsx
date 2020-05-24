import React from 'react';

export function CardPreview(props) {

    const { card, innerRef, provided, style } = props;
    const showInfo = (card.comments.length || card.description !== '');
    return (
        <>
            <div className="card-preview flex column align-center space-center" ref={innerRef} style={style}
                {...provided.draggableProps} {...provided.dragHandleProps} >
                {(card.labels.length)
                    ?
                    <div className="card-labels flex align-center space-center">
                        {
                            card.labels.map((label) => {
                                return (
                                    <div className="card-label" style={{
                                        background: label.color,
                                        height: 6,
                                        width: 30,
                                        borderBottomLeftRadius: 2,
                                        borderBottomRightRadius: 2
                                    }}></div>
                                )
                            })
                        }
                    </div>
                    : null

                }
                <p className={`card-preview-title ${(card.labels.length) ? 'top-margin' : ''}`}>{props.title}</p>

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