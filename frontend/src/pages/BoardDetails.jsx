import React from 'react';

import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { loadBoard, save, setBoard } from '../store/actions/boardActions';
import AddContent from '../cmps/AddContent';
import { Route } from 'react-router-dom';
import { CardPreview } from '../cmps/CardPreview.jsx';
import { Stack } from '../cmps/Stack.jsx';
import CardDetails from '../pages/CardDetails.jsx';
import BoardOptions from '../cmps/BoardOptions'
import socketService from '../services/socketService'
import BoardStatistics from '../pages/BoardStatistics'
import { makeId } from '../services/utilService';
import { reorder, move } from '../services/boardDetailsUtils';
import ScrollContainer from 'react-indiana-drag-scroll'

class BoardDetails extends React.Component {

    constructor() {
        super();
        this.stackTitleFocus = [];
    }

    state = {
        areLabelsOpen: false
    }

    componentDidMount() {
        if (!this.props.loggedInUser) return this.props.history.push('/boards')
        const { boardId } = this.props.match.params;

        socketService.setup();
        socketService.emit('setBoard', boardId);
        socketService.on('loadBoard', this.setBoard)
        document.body.style.backgroundSize = 'cover'

        this.props.loadBoard(boardId);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.currBoard !== this.props.currBoard) {
            // this.setState({ currBoard: this.props.currBoard });
            document.body.style.backgroundImage = `url(/${this.props.currBoard.bg})`;
            document.body.style.backgroundColor = this.props.currBoard.bg;
        }
    }

    componentWillUnmount() {
        if (!this.props.loggedInUser) return
        document.body.style = '';
        socketService.off('loadBoard', this.setBoard)
        socketService.terminate()
    }

    setBoard = (currBoard) => this.props.setBoard(currBoard)

    onToggleLabels = () => {

        this.setState(({ areLabelsOpen }) => ({ areLabelsOpen: !areLabelsOpen }));
    }

    onEditTitle = ({ target }) => {

        let currBoard = { ...this.props.currBoard };
        currBoard.stacks[target.dataset.idx].title = target.value;
        this.props.save(currBoard);
    }

    getItemStyle = (isDragging, draggableStyle) => {

        return ({
            // some basic styles to make the items look a bit nicer
            ...draggableStyle,
            // change background colour if dragging
            background: isDragging ? 'rgb(219, 219, 219)' : '#ebecf0',
        });
    }

    onStackAdd = (newStackTitle) => {

        let currBoard = { ...this.props.currBoard };

        currBoard.stacks.push({
            bgColor: "#fefefe",
            cards: [],
            id: makeId(),
            title: newStackTitle,
        });

        this.props.save(currBoard);
    }

    onCardAdd = (newCardTitle, stackId) => {

        let currBoard = { ...this.props.currBoard };
        let stackIdx = currBoard.stacks.findIndex((stack) => {
            return stackId === stack.id;
        });
        currBoard.stacks[stackIdx].cards.push({
            id: makeId(),
            title: newCardTitle,
            description: "",
            comments: [],
            checklists: [],
            members: [],
            labels: [],
            activities: [],
            byMember: this.props.loggedInUser,
            createdAt: Date.now(),
            dueDate: ''
        });

        this.props.save(this.props.currBoard);
    }

    onDragEnd = (result) => {

        const { loggedInUser, currBoard } = this.props
        const { source, destination } = result;

        // Dropped outside the list
        if (!destination) {
            return;
        }

        let stacks = [...currBoard.stacks];
        const newState = { ...currBoard };

        // Changed Stacks order
        if ((source.droppableId === destination.droppableId) && source.droppableId === 'board') {
            const items = reorder(stacks, source.index, destination.index);
            newState.stacks = items;

            const stackSourceTitle = currBoard.stacks[source.index].title;
            const stackPlace = destination.index + 1
            currBoard.activities.unshift({ id: makeId(), txt: `moved stack ${stackSourceTitle} to place number ${stackPlace}`, createdAt: Date.now(), byMember: loggedInUser })


            // Changed Cards order
        } else {
            const sIndex = +source.droppableId;
            const dIndex = +destination.droppableId;

            // Changed Card index in current Stack
            if (sIndex === dIndex) {
                const items = reorder(stacks[sIndex].cards, source.index, destination.index);
                newState.stacks[sIndex].cards = items;

                // Changed Card between Stacks
            } else {
                const sourceTitle = currBoard.stacks[+source.droppableId].title
                const destTitle = currBoard.stacks[+destination.droppableId].title
                const cardMovedTitle = currBoard.stacks[+source.droppableId].cards[source.index].title
                currBoard.activities.unshift({ id: makeId(), txt: `moved card ${cardMovedTitle} from ${sourceTitle} to ${destTitle}`, createdAt: Date.now(), byMember: loggedInUser })

                const result = move(stacks[sIndex].cards, stacks[dIndex].cards, source, destination);
                newState.stacks[sIndex].cards = result[sIndex];
                newState.stacks[dIndex].cards = result[dIndex];
            }
        }
        this.props.save(newState)
    }

    onStackTitleFocus = (index) => {

        this.stackTitleFocus[index].focus();
    }

    stacks = (areLabelsOpen) => {
        const board = this.props.currBoard;

        return (
            <span className="stacks-section flex">
                <DragDropContext
                    onDragEnd={this.onDragEnd}
                >
                    <Droppable droppableId="board" isCombineEnabled={false} type="STACK" direction='horizontal'>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="stacks-content flex"
                            >

                                {(board.stacks.length) ? board.stacks.map((stack, index) => (
                                    <Draggable key={stack.id}
                                        draggableId={stack.id} disableInteractiveElementBlocking index={index} type="STACK" >

                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    style={{
                                                        ...this.getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style,
                                                        ),
                                                        width: 250,

                                                    }}
                                                    className="stack-content flex column"
                                                >
                                                    <div className="stack-header flex space-between" {...provided.dragHandleProps}>
                                                        <input type="text" name="title" className="stack-title-input" data-idx={index} onChange={this.onEditTitle}
                                                            value={stack.title} onClick={() => this.onStackTitleFocus(index)} ref={input => this.stackTitleFocus[index] = input} />
                                                        <button className="stack-header-menu">. . .</button>
                                                    </div>

                                                    {/* <p className="stack-title flex align-center"  ></p> */}

                                                    <Droppable key={index}
                                                        droppableId={`${index}`} isCombineEnabled={false}
                                                        type="CARD">
                                                        {(provided, snapshot) => (
                                                            <Stack
                                                                innerRef={provided.innerRef}
                                                                provided={provided}
                                                            >

                                                                {stack.cards.map((card, index) => (
                                                                    <Draggable
                                                                        key={card.id}
                                                                        draggableId={card.id}
                                                                        index={index}
                                                                        type="CARD"
                                                                    >
                                                                        {(provided, snapshot) => (

                                                                            <span>
                                                                                <CardPreview
                                                                                    title={card.title}
                                                                                    innerRef={provided.innerRef}
                                                                                    provided={provided}
                                                                                    card={card}
                                                                                    labelsOpen={areLabelsOpen}
                                                                                    onToggleLabels={this.onToggleLabels}
                                                                                    link={`/boards/${board._id}/card/${card.id}`}
                                                                                    style={this.getItemStyle(
                                                                                        snapshot.isDragging,
                                                                                        provided.draggableProps.style,
                                                                                    )}
                                                                                    history={this.props.history}
                                                                                >
                                                                                </CardPreview>
                                                                            </span>

                                                                        )}
                                                                    </Draggable>
                                                                ))}
                                                                {provided.placeholder}
                                                            </Stack>
                                                        )}
                                                    </Droppable>
                                                    <AddContent type="card" onCardAdd={this.onCardAdd} itemId={stack.id} />
                                                </div>
                                            )
                                        }}
                                    </Draggable>
                                )) : null}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <div className="add-stack-container">
                        <AddContent type="stack" onStackAdd={this.onStackAdd} />
                    </div>
                </DragDropContext>
            </span>
        )
    }

    onSetBg = (bg, type) => {
        if (type === 'img') {
            const bgUrl = bg.slice(1, bg.length + 1)
            document.body.style.backgroundImage = `url(/${bgUrl})`
            document.body.style.backgroundPosition = 'center'
            document.body.style.backgroundColor = ''
            this.props.currBoard.bg = bgUrl
        } else {
            document.body.style.backgroundImage = ''
            document.body.style.backgroundColor = bg
            this.props.currBoard.bg = bg
        }
        const { loggedInUser } = this.props
        // @TODO: ACTIONS - ADD ACTIVITY!
        this.props.currBoard.activities.unshift({ id: makeId(), txt: `has changed the board background`, createdAt: Date.now(), byMember: loggedInUser })
        this.props.save(this.props.currBoard)
    }

    render() {
        const { history } = this.props
        const { currBoard } = this.props;
        const { areLabelsOpen } = this.state

        if (!currBoard) return 'Loading...'

        return (
            <>
                <BoardOptions history={history} board={currBoard} onSetBg={this.onSetBg} />
                <Route component={CardDetails} path="/boards/:boardId/card/:cardId" />
                <Route component={BoardStatistics} path="/boards/:boardId/statistics" />
                {/* <ScrollContainer horizontal={true} className="scroll-container"> */}
                    <section className="board-content flex column align-start space-between">

                        {(currBoard) ? this.stacks(areLabelsOpen) : null}

                    </section>
                {/* </ScrollContainer> */}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currBoard: state.board.currBoard,
        loggedInUser: state.user.loggedInUser
    }
}

const mapDispatchToProps = {
    loadBoard,
    save,
    setBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardDetails)
