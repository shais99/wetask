import React from 'react';
import moment from 'moment'

export function CardPreview(props) {

    function onLabelsPress(ev) {
        ev.stopPropagation()
        props.onToggleLabels();
    }

    function getTodosInfo() {

        let doneTodosCount = 0;

        card.checklists.forEach(checklist => {
            todosCount += checklist.todos.length;

            checklist.todos.forEach(todo => {

                if (todo.isDone) doneTodosCount += 1;
            })
        })

        return `${doneTodosCount}/${todosCount}`;
    }

    function getDueDateType() {
        const now = Date.now();
        return (Date.parse(card.dueDate) > now) ? 'future' : 'past'
    }

    const { card, innerRef, provided, style, labelsOpen } = props;

    let todosStatus = '';
    let todosCount = 0;
    if (card.checklists && card.checklists.length) {
        todosStatus = getTodosInfo();
    }

    let dueDateClass = '';
    if (card.dueDate && card.dueDate !== '') {
        dueDateClass = 'due-date-' + getDueDateType();
    }

    const showInfo = (card.comments.length || card.description !== '' || todosCount || card.dueDate !== '');

    function onCardClick() {
        props.history.push(props.link)
    }

    return (
        <>
            {/* <Link to={link}> */}
            <div className="card-preview flex column align-center justify-center" onClick={onCardClick} ref={innerRef} style={style}
                {...provided.draggableProps} {...provided.dragHandleProps} >
                <div className="card-preview-content" style={{ background: style.background }}>


                    {(card.labels.length)
                        ?
                        <div className={`card-labels flex wrap align-center`} onClick={(event) => onLabelsPress(event)}>
                            {
                                card.labels.map(label => {
                                    const foundLabel = props.board.boardLabels.find(currLabel => currLabel.id === label.id)
                                    if (foundLabel) {
                                        return (
                                            <div className={`card-label flex align-center justify-center ${(labelsOpen) ? 'label-expand' : ''}`}
                                                key={label.title + card.id} style={{
                                                    background: foundLabel.color,

                                                }}>{(labelsOpen) ? foundLabel.title : ''}</div>
                                        )
                                        }
                                    })
                            }
                        </div>
                        : null

                    }
                    {card.imgUrl && <img src={card.imgUrl} className="card-img" alt="" />}
                    <p className={`card-preview-title ${(card.labels.length) ? 'top-margin' : ''}`} >{props.title}</p>

                    {(showInfo)
                        ?
                        <div className="card-preview-info flex align-center space-start">

                            {(card.dueDate && card.dueDate !== '')
                                ?
                                <span className={`preview-info-span flex align-center due-date ${dueDateClass}`}>
                                    <img className="preview-info-img" src="/assets/img/clock.png" alt="" />
                                    <p className="preview-info-count">{moment(card.dueDate).format("MMM DD")}</p>
                                </span>
                                :
                                null
                            }
                            {(card.description !== '')
                                ?
                                <span className="preview-info-span flex align-center">
                                    <img className="preview-info-img" src="/assets/img/description.png" alt="" />
                                </span>
                                :
                                null
                            }
                            {(card.comments.length)
                                ?
                                <span className="preview-info-span flex align-center">
                                    <img className="preview-info-img" src="/assets/img/comment.png" alt="" />
                                    <p className="preview-info-count">{card.comments.length}</p>
                                </span>
                                :
                                null
                            }
                            {(card.checklists && todosCount)
                                ?
                                <span className="preview-info-span flex align-center">
                                    <img className="preview-info-img" src="/assets/img/todos.png" alt="" />
                                    <p className="preview-info-count">{todosStatus}</p>
                                </span>
                                :
                                null
                            }

                        </div>
                        : null}
                </div>
            </div>
            {/* </Link> */}

        </>
    )

}