import React from 'react';

import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { loadBoard, save, setBoard, updateStackTitle } from '../store/actions/boardActions';
import AddContent from '../cmps/AddContent';
import { Route, Link } from 'react-router-dom';
import { CardPreview } from '../cmps/CardPreview.jsx';
import { Stack } from '../cmps/Stack.jsx';
import CardDetails from '../pages/CardDetails.jsx';
import BoardOptions from '../cmps/BoardOptions'
import socketService from '../services/socketService'
import BoardStatistics from '../pages/BoardStatistics'
import { makeId } from '../services/utilService';
import { reorder, move } from '../services/boardDetailsUtils';
import ActionContainer from '../cmps/ActionContainer';
// import ScrollContainer from 'react-indiana-drag-scroll'

class BoardDetails extends React.Component {

    constructor() {
        super();
        this.stackTitleFocus = [];
    }

    state = {
        areLabelsOpen: false,
        isShowingStatistics: false,
        stackTitles: {},
        stackMenus: {}
    }

    componentDidMount() {
        if (!this.props.loggedInUser) return this.props.history.push('/boards')
        const { boardId } = this.props.match.params;

        socketService.setup();
        socketService.emit('setBoard', boardId);
        socketService.on('loadBoard', this.setBoard)

        this.props.loadBoard(boardId);
    }

    componentDidUpdate(prevProps) {
        const { stackTitles } = this.state;

        if (prevProps.currBoard !== this.props.currBoard) {
            // this.setState({ currBoard: this.props.currBoard });
            document.body.style.backgroundImage = `url(/${this.props.currBoard.bg})`;
            document.body.style.backgroundColor = this.props.currBoard.bg;
        }

        if (this.props.currBoard && this.props.currBoard.stacks.length &&
            !Object.keys(stackTitles).length && stackTitles.constructor === Object) {
            this.populateStacksInfo(this.props.currBoard);
        }
    }

    componentWillUnmount() {
        if (!this.props.loggedInUser) return;
        document.body.style = '';
        socketService.off('loadBoard', this.setBoard);
        socketService.terminate();
    }

    populateStacksInfo = (board) => {
        let stackTitles = {};
        let stackMenus = {};
        board.stacks.forEach((stack) => {
            stackTitles[stack.id] = stack.title;
            stackMenus[stack.id] = false;
        });
        this.setState({ stackTitles, stackMenus });
    }

    setBoard = (currBoard) => this.props.setBoard(currBoard)

    onToggleLabels = () => {

        this.setState(({ areLabelsOpen }) => ({ areLabelsOpen: !areLabelsOpen }));
    }

    onEditStackTitle = ({ target }) => {
        let currBoard = { ...this.props.currBoard };
        this.setState({ stackTitles: { [currBoard.stacks[target.dataset.idx].id]: target.value } }, () => {
            console.log(this.state.stackTitles);
        });
    }

    onNewStackTitle = ({ target }) => {
        let currBoard = { ...this.props.currBoard };
        this.props.save(currBoard);
    }

    getItemStyle = (isDragging, draggableStyle) => {

        return ({
            // some basic styles to make the items look a bit nicer
            ...draggableStyle,
            // change background colour if dragging
            background: isDragging ? 'rgb(219, 219, 219)' : '#ebecf0'
        });
    }

    onStackRemove = (stackId) => {

        // console.log(stackId);
        let currBoard = { ...this.props.currBoard };
        if (currBoard.isPublic) return;
        let stackIdx = currBoard.stacks.findIndex(stack => {
            return stack.id === stackId;
        })

        currBoard.stacks.splice(stackIdx, 1);
        this.props.save(currBoard);
    }

    onStackAdd = (newStackTitle) => {

        let currBoard = { ...this.props.currBoard };
        let id = makeId();

        currBoard.stacks.push({
            bgColor: "#fefefe",
            cards: [],
            id,
            title: newStackTitle,
        });

        let stackTitles = { ...this.state.stackTitles };
        let stackMenus = { ...this.state.stackMenus };

        stackTitles[id] = newStackTitle;
        stackMenus[id] = false;
        this.setState({ stackTitles, stackMenus })
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
            dueDate: '',
            bgColor: 'white',
            timeEstimation: ''
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

    // onWheel = (e) => {
    //     e.preventDefault()
    //     var container = document.querySelector('.board-content')
    //     var containerScrollPosition = document.querySelector('.board-content').scrollLeft
    //     container.scrollTo({
    //         top: 0,
    //         left: containerScrollPosition + e.deltaY,
    //         behaviour: 'smooth' //if you want smooth scrolling
    //     })
    // }

    onStackTitleFocus = (index) => this.stackTitleFocus[index].focus();

    onToggleAction = (action) => {

        let actions = this.state.stackMenus;
        for (const key in actions) {
            if (key !== action) {
                actions[key] = false;
            }
        }
        actions[action] = !actions[action];
        this.setState({ isShown: actions });
    }

    // stacks = (areLabelsOpen, stackTitles) => {
    //     const board = this.props.currBoard;
    //     const { isShown } = this.state;
    //     return (
    //         null
    //     )
    // }

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
        // @TODO: ACTIONS - ADD ACTIVITY!
        this.props.currBoard.activities.unshift({ id: makeId(), txt: `has changed the board background`, createdAt: Date.now(), byMember: loggedInUser })
        this.props.save(this.props.currBoard)
    }

    toggleShowStatistics = () => {
        this.setState(prevState => ({ isShowingStatistics: !prevState.isShowingStatistics }));
    }

    render() {
        const { history, currBoard } = this.props;
        const { areLabelsOpen, stackTitles, isShowingStatistics, isShown } = this.state;

        if (!currBoard) return 'Loading...'
        // console.log(currBoard);
        return (
            <>
                {/* Board Options bar */}
                <BoardOptions isShowingStatistics={isShowingStatistics} history={history} board={currBoard} onSetBg={this.onSetBg} toggleShowStatistics={this.toggleShowStatistics} />
                {/* Route to Card details */}
                <Route component={CardDetails} path="/boards/:boardId/card/:cardId" />

                {/* Board content: showing stacks OR statistics */}
                <section className="board-content flex column align-start space-between">

                    {(isShowingStatistics)
                        ?
                        <BoardStatistics isShowingStatistics={isShowingStatistics} />
                        : (currBoard && stackTitles)
                            ?
                            // this.stacks(areLabelsOpen, stackTitles) 
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

                                                {(currBoard.stacks.length) ? currBoard.stacks.map((stack, index) => (
                                                    <Draggable key={stack.id}
                                                        draggableId={stack.id} index={index} type="STACK" >

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
                                                                        <input autoComplete="off" type="text" name="title" className="stack-title-input" data-idx={index} onChange={(ev) => { this.props.updateStackTitle(stack.id, ev.target.value) }}
                                                                            value={stack.title} onClick={() => this.onStackTitleFocus(index)} ref={input => this.stackTitleFocus[index] = input}
                                                                            onBlur={this.onNewStackTitle} />
                                                                        <Link title="Options" to="#" onClick={() => this.onToggleAction(stack.id)}><button className="stack-header-menu">. . .</button></Link>
                                                                        {(isShown && isShown[stack.id]) && <ActionContainer onStackRemove={this.onStackRemove} stackInfo={{ id: stack.id, title: stack.title }} isShown={{ stack: true }}
                                                                            onToggleAction={this.onToggleAction} />}
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
                                                                                                    link={`/boards/${currBoard._id}/card/${card.id}`}
                                                                                                    style={{
                                                                                                        ...this.getItemStyle(
                                                                                                            snapshot.isDragging,
                                                                                                            provided.draggableProps.style,
                                                                                                        ),
                                                                                                        background: card.bgColor,
                                
                                                                                                    }}
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
                            : null
                    }

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
    save,
    setBoard,
    updateStackTitle
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardDetails)
