import React from 'react';

import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { loadBoard } from '../store/actions/boardActions.js';

const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    console.log('SOURCE', source, 'DEST', destination, 'dSource', droppableSource, 'dDest', droppableDestination);
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    console.log(removed);
    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};


const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: 250
});

const boardData = {
    _id: "b101",
    title: "wetask project",
    members: [{ _id: 'u101', fullName: 'Tal Tarablus', imgUrl: 'https://www.google.com' }],
    "stacks": [
        {
            id: 's101',
            title: 'Stack 1',
            cards: [
                {
                    id: 'c101',
                    title: 'Remove the images from the website',
                },
                {
                    id: 'c102',
                    title: 'Add the images from the website',
                }
            ],
            bgColor: '#fefefe'
        },
        {
            id: 's102',
            title: 'Stack 2',
            cards: [
                {
                    id: 'c103',
                    title: 'WHATTT the images from the website',
                },
                {
                    id: 'c104',
                    title: 'NO WAYYYY the images from the website',
                }
            ],
            bgColor: '#fefefe'
        }
    ]
}

class BoardDetails extends React.Component {

    constructor() {
        super();
        this.data = [getItems(10), getItems(5, 10)];
    }

    state = {
        data: [
            getItems(10),
            getItems(5, 10)
        ]
    }

    componentDidMount() {


    }

    onDragEnd = (result) => {
        console.log(result);
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;
        console.log(sInd, dInd);
        if (sInd === dInd) {
            console.log('here1');
            const items = reorder(this.state.data[sInd], source.index, destination.index);
            const newState = [...this.state.data];
            newState[sInd] = items;
            this.setState({ data: newState });
            // this.data = newState;
        } else {
            console.log('here2');
            const result = move(this.state.data[sInd], this.state.data[dInd], source, destination);
            console.log(result);
            const newState = [...this.state.data];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            this.setState({ data: newState.filter(group => group.length) }, console.log(this.state.data));
        }
    }

    stacks = (data, num) => {

        return (
            <span className="stacks-section flex">
                <DragDropContext
                    onDragEnd={this.onDragEnd}
                >
                    {this.state.data.map((stack, ind) => (

                        <Droppable key={ind} droppableId={`${ind}`}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
                                    {stack.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-around"
                                                        }}
                                                    >
                                                        {item.content}
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                    ))}
                </DragDropContext>
            </span>
        )
    }

    render() {
        console.log(this.data);
        return (
            <section className="board-content container flex column align-start space-between">
                <span>
                    <button
                        type="button"
                        onClick={() => {
                            this.setState(({ data }) => ({ data: [...data, []] }));
                        }}
                    >
                        Add new group
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            this.setState(({ data }) => ({ data: [...data, getItems(1)] }));
                        }}
                    >
                        Add new item
                    </button>
                </span>

                {this.stacks()}

            </section>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        currBoard: state.board.currBoard
    }
}

const mapDispatchToProps = {

    loadBoard
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardDetails)
