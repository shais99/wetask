import React from 'react';

export function CardPreview(props) {

    const { card, innerRef, provided, style } = props;
    const showInfo = (card.comments.length || card.description !== '');
    console.log(card);
    return (
        <>
            <div className="card-preview" ref={innerRef} style={style}
                {...provided.draggableProps} {...provided.dragHandleProps} >
                {props.title}

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
                                <img className="preview-info-img" src="/assets/img/comments.png" />
                                <p className="preview-info-count">{card.comments.length}</p>
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