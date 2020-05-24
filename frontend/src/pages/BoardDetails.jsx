import React from 'react';

import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { loadBoard, save } from '../store/actions/boardActions';
import { AddContent } from '../cmps/AddContent';
import { Link, Route } from 'react-router-dom';
import { CardPreview } from '../cmps/CardPreview.jsx';
import { Stack } from '../cmps/Stack.jsx';
import CardDetails from '../pages/CardDetails.jsx';
import BoardOptions from '../cmps/BoardOptions'

import { makeId } from '../services/utilService';


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
};


class BoardDetails extends React.Component {

    constructor() {
        super();
        this.boardContent = React.createRef();
    }

    state = {
        currBoard: null,
        // boardHeight: 'unset'
    }

    componentDidMount() {
        if (!this.props.loggedInUser) return this.props.history.push('/signup')
        const { boardId } = this.props.match.params;
        this.props.loadBoard(boardId);
        // this.getBoardHeight();
        // window.addEventListener('resize', this.getBoardHeight);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.currBoard !== this.props.currBoard) {
            console.log('BOARD PROPS', this.props.currBoard);
            this.setState({ currBoard: this.props.currBoard }, () => console.log('BOARD STATE', this.state.currBoard));
            console.log(this.props.currBoard.bg);
            document.body.style.backgroundImage = `url(/${this.props.currBoard.bg})`;
            document.body.style.backgroundColor = this.props.currBoard.bg;
        }

        if (this.boardContent.current &&
            (this.boardContent.current.clientHeight - 32 !== this.state.boardHeight)) {

            this.setState({ boardHeight: this.boardContent.current.clientHeight - 32 });
        }
    }

    componentWillUnmount() {
        document.body.style = '';
        // window.removeEventListener('resize', this.getBoardHeight);
    }

    getBoardHeight = () => {

        let boardHeight;
        if (this.boardContent.current) {
            console.log(this.boardContent.current.clientHeight);
            boardHeight = this.boardContent.current.clientHeight - 32;
            boardHeight = (boardHeight < 150) ? 150 : boardHeight;
            console.log(boardHeight);
        }
        this.setState({ boardHeight });
    }


    getItemStyle = (isDragging, draggableStyle) => {

        return ({
            // some basic styles to make the items look a bit nicer
            ...draggableStyle,
            height: 'fit-content',
            userSelect: 'none',
            paddingTop: 0,
            // change background colour if dragging
            background: isDragging ? 'rgb(219, 219, 219)' : '#ebecf0',
            // styles we need to apply on draggables
            borderRadius: 3,

            boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.75)'
        });
    }


    getListStyle = isDraggingOver => ({
        background: '#ebecf0',
        padding: 8,
        paddingTop: 0,

        width: 250,
        transition: 'ease-in-out 0.15s'
    });

    onStackAdd = (newStackTitle) => {

        let currBoard = this.state.currBoard;

        currBoard.stacks.push({
            bgColor: "#fefefe",
            cards: [],
            id: makeId(),
            title: newStackTitle,
        });

        this.setState({ currBoard }, () => {
            this.props.save(this.state.currBoard);
        });
    }

    onCardAdd = (newCardTitle, stackId) => {
        console.log(stackId);
        let currBoard = this.state.currBoard;
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
            byMember: this.props.loggedInUser,
            createdAt: Date.now(),
            dueDate: ''
        });

        console.log(currBoard);

        this.setState({ currBoard }, () => {
            this.props.save(this.state.currBoard);
        });
    }

    onDragEnd = (result) => {

        console.log(result);
        const { source, destination } = result;

        // Dropped outside the list
        if (!destination) {
            return;
        }

        let stacks = this.state.currBoard.stacks;

        // Changed Stacks order
        if ((source.droppableId === destination.droppableId) && source.droppableId === 'board') {
            console.log(stacks);
            const items = reorder(stacks, source.index, destination.index);
            console.log(items);
            const newState = { ...this.state.currBoard };
            newState.stacks = items;

            this.setState({ currBoard: newState }, () => {
                this.props.save(newState)
            })
        } else {
            const sIndex = +source.droppableId;
            const dIndex = +destination.droppableId;

            const newState = { ...this.state.currBoard };

            // Changed index in same Stack
            if (sIndex === dIndex) {
                const items = reorder(stacks[sIndex].cards, source.index, destination.index);
                newState.stacks[sIndex].cards = items;

                // Changed Stack
            } else {
                const result = move(stacks[sIndex].cards, stacks[dIndex].cards, source, destination);
                newState.stacks[sIndex].cards = result[sIndex];
                newState.stacks[dIndex].cards = result[dIndex];
            }
            this.setState({ currBoard: newState }, () => {
                this.props.save(this.state.currBoard);
            });
        }
    }

    stacks = (boardHeight) => {
        const board = this.state.currBoard;
        return (
            <span className="stacks-section flex">
                <DragDropContext
                    onDragEnd={this.onDragEnd}
                >
                    <Droppable droppableId="board" isCombineEnabled={false} type="STACK" direction='horizontal'>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                // style={{ backgroundColor: snapshot.isDraggingOver ? 'forestgreen' : 'transparent' }}
                                {...provided.droppableProps}
                                className="stacks-content flex "
                            >

                                {(board.stacks.length) ? board.stacks.map((stack, index) => (
                                    <Draggable key={stack.id}
                                        draggableId={stack.id} index={index} type="STACK" >

                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                style={{
                                                    ...this.getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style,
                                                    ),
                                                    // maxHeight: boardHeight,
                                                    width: 250
                                                }}
                                                className="stack-content flex column"
                                            >

                                                <p className="stack-title flex align-center" {...provided.dragHandleProps} >{stack.title}</p>

                                                <Droppable key={index}
                                                    droppableId={`${index}`} isCombineEnabled={false}
                                                    type="CARD">
                                                    {(provided, snapshot) => (
                                                        <Stack
                                                            innerRef={provided.innerRef}
                                                            style={this.getListStyle(snapshot.isDraggingOver)}
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
                                                                        <Link to={`/boards/${board._id}/card/${card.id}`}>
                                                                            <CardPreview
                                                                                title={card.title}
                                                                                innerRef={provided.innerRef}
                                                                                provided={provided}
                                                                                card={card}
                                                                                style={this.getItemStyle(
                                                                                    snapshot.isDragging,
                                                                                    provided.draggableProps.style,
                                                                                )}
                                                                            >

                                                                            </CardPreview>
                                                                        </Link>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                            {provided.placeholder}
                                                        </Stack>
                                                    )}
                                                </Droppable>
                                                <AddContent type="card" onCardAdd={this.onCardAdd} itemId={stack.id} />
                                            </div>
                                        )}
                                    </Draggable>
                                )) : null}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <AddContent type="stack" onStackAdd={this.onStackAdd} />
                </DragDropContext>
            </span>
        )
    }

    onSetBg = (bg, type) => {
        if (type === 'img') {
            const bgUrl = bg.slice(1, bg.length + 1)
            document.body.style.backgroundImage = `url(/${bgUrl})`
            document.body.style.backgroundColor = ''
            this.props.currBoard.bg = bgUrl
        } else {
            document.body.style.backgroundImage = ''
            document.body.style.backgroundColor = bg
            this.props.currBoard.bg = bg
        }
        const { loggedInUser } = this.props
        this.state.currBoard.activities.unshift({ id: makeId(), txt: `has changed the board background`, createdAt: Date.now(), byMember: loggedInUser })
        this.props.save(this.state.currBoard)
    }

    render() {
        console.log(this.state.currBoard);
        const { currBoard, boardHeight } = this.state;
        const { history } = this.props
        if (!currBoard) return 'Loading...'

        return (
            <>
                <BoardOptions history={history} board={currBoard} onSetBg={this.onSetBg} />
                <Route component={CardDetails} path="/boards/:boardId/card/:cardId" />
                <section className="board-content flex column align-start space-between"
                    ref={this.boardContent}>

                    {(currBoard) ? this.stacks(boardHeight) : null}

                </section>
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
    save
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardDetails)
