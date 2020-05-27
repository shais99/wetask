import React from 'react'

import { save, loadBoard } from '../store/actions/boardActions'
import { connect } from 'react-redux'
import { StatisticsPie } from '../cmps/StatisticsPie';
import { StatisticsBar } from '../cmps/StatisticsBar';
import moment from 'moment'

class BoardStatistics extends React.Component {

    constructor() {
        super();
        this.elStats = React.createRef();
        this.statsTimeOut = null;
        this.boardStats = null;
    }

    state = {
        board: {},
        currView: 'byUsers',
        cardCount: -1, 
        boardStats: null
    }

    componentDidMount() {

        if (this.props.currBoard) {
            this.statsTimeOut = setTimeout(() => {
                const boardStats = this.getBoardStats(this.props.currBoard);
                this.setState({ board: this.props.currBoard, boardStats }, () => {
                });
            }, 250)
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.currBoard !== prevProps.currBoard) {
            const boardStats = this.getBoardStats(this.props.currBoard);
            this.setState({ board: this.props.currBoard, boardStats });
        }


    }

    componentWillUnmount() {
        if (this.statsTimeOut) clearTimeout(this.statsTimeOut);
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState(prevState => ({ card: { ...prevState.card, [field]: value } }))
    }

    getStatsByLabels = (board) => {

        let labels = {};

        board.stacks.forEach((stack) => {
            stack.cards.forEach((card) => {
                card.labels.forEach((label) => {
                    if (labels[label.title]) {
                        labels[label.title].count += 1;
                    } else {
                        labels[label.title] = { count: 1, color: label.color };
                    }
                })

            })
        })
        let labelStatsData = Object.keys(labels).map((labelTitle) => {
            const labelInfo = labels[labelTitle];
            return ({
                id: labelTitle,
                label: labelTitle,
                value: labelInfo.count,
                color: labelInfo.color
            });
        })

        return labelStatsData;
    }

    getStatsByUsers = (board) => {

        let users = {};

        board.stacks.forEach((stack) => {
            stack.cards.forEach((card) => {
                if (card.byMember) {
                    if (!users[card.byMember.username]) users[card.byMember.username] = { tasks: 0, doneTasks: 0 };

                    let isDone = card.labels.some((label) => {
                        return label.title === 'done';
                    })

                    users[card.byMember.username][(isDone) ? 'doneTasks' : 'tasks'] += 1;
                }
            })
        })
        let userStatsData = Object.keys(users).map((username) => {
            const userInfo = users[username];
            return ({
                member: username,
                Tasks: userInfo.tasks - userInfo.doneTasks,
                'Done Tasks': userInfo.doneTasks,
            });
        })
        return userStatsData;
    }

    getStatsByDueDates = (board) => {

        let workload = { 'On Schedule': 0, Delayed: 0 };
        let cardCount = 0;
        board.stacks.forEach((stack) => {
            cardCount += stack.cards.length;

            stack.cards.forEach((card) => {
                if (card.dueDate !== '') {
                    if (+moment(card.dueDate).format('x') > Date.now()) workload['On Schedule'] += 1;
                    else workload.Delayed += 1;
                }

            })
        })

        if (!cardCount) return null;

        if (this.state.cardCount !== cardCount) {
            this.setState({ cardCount });
        }


        let dueDatesStatsData = Object.keys(workload).map((type) => {

            return ({
                id: type,
                label: type,
                value: workload[type],
                color: (type === 'Delayed') ? 'tomato' : 'lightgreen'
            });
        })

        return dueDatesStatsData;
    }

    getBoardStats = (board) => {

        if (!board.stacks) return null;

        let stats;

        let byLabels = this.getStatsByLabels(board);
        let byUsers = this.getStatsByUsers(board);
        let byDueDate = this.getStatsByDueDates(board);

        if (byDueDate === null) this.setState({ isNoCardsBoard: true })
        else {
            if (this.state.isNoCardsBoard) this.setState({ isNoCardsBoard: false })
        }
        stats = { byLabels, byUsers, byDueDate };

        console.log(stats);
        return stats;
    }

    toggleStatView = (byType) => {
        if (this.state.currView === byType) return;
        this.setState({ currView: byType });
    }


    render() {

        const { board, currView, cardCount, boardStats } = this.state;
        const { isShowingStatistics } = this.props;
        // let boardStats = null;
        // if (board) {
        //     boardStats = this.getBoardStats(board);
        // }

        return ((!board) ? '' :

            <>
                <div className="stats flex align-center justify-center">

                    <section className={`board-statistics modal-container flex column ${(isShowingStatistics) ? '' : 'board-statistics-closed'}`} onMouseDown={(ev) => ev.stopPropagation()}
                        ref={this.elStats}>
                        <header className="board-statistics-header-span flex align-center justify-center">
                            <p className="board-statistics-header">' {board.title} '</p>
                            {/* <p className="secondary">stats</p> */}
                        </header>
                        <small className="board-statistics-info flex align-center space-evenly">
                            {(board.createdBy) ?
                                <span className="stat-created-at-span flex align-center">
                                    <p className="secondary">created:</p>
                                    <p className="statistics-info-p">{`${moment(board.createdAt).format('MMM Do YYYY')} [${board.createdBy.username}]`}</p></span>
                                : null
                            }
                            {(board.members) ?
                                <span className="stat-members-count flex align-center">
                                    <p className="secondary">members:</p>
                                    <p className="statistics-info-p">{board.members.length}</p></span>
                                : null
                            }
                            {(board.stacks) ?
                                <span className="stat-stacks-count flex align-center">
                                    <p className="secondary">lists:</p>
                                    <p className="statistics-info-p">{board.stacks.length}</p></span>
                                : null
                            }
                            {(board.stacks && cardCount) ?
                                <span className="stat-stacks-count flex align-center">
                                    <p className="secondary">tasks:</p>
                                    <p className="statistics-info-p">{cardCount}</p></span>
                                : null
                            }
                            {(board.activities) ?
                                <span className="stat-activities-count flex align-center">
                                    <p className="secondary">activities:</p>
                                    <p className="statistics-info-p">{board.activities.length}</p></span>
                                : null
                            }


                        </small>
                        {(boardStats) ?
                            <section className="board-statistics-content flex">
                                <aside className="statistics-controllers flex column align-center space-around">
                                    <button className={`btn btn-primary stat-button ${(currView === 'byLabels') ? 'active-stat-btn' : ''}`}
                                        onClick={() => this.toggleStatView('byLabels')}>By Labels</button>
                                    <button className={`btn btn-primary stat-button ${(currView === 'byUsers') ? 'active-stat-btn' : ''}`}
                                        onClick={() => this.toggleStatView('byUsers')}>By Members</button>
                                    <button className={`btn btn-primary stat-button ${(currView === 'byDueDate') ? 'active-stat-btn' : ''}`}
                                        onClick={() => this.toggleStatView('byDueDate')}>By Schedule</button>
                                </aside>

                                <div className="statistics-charts">

                                    {(boardStats.byLabels && currView === 'byLabels') ?
                                        < div className="stat-item flex column justify-center align-center">
                                            <p className="board-stats-title">Most Popular Labels</p>
                                            <StatisticsPie data={boardStats.byLabels} type="labels" />

                                        </div>
                                        : null
                                    }
                                    {(boardStats.byUsers && currView === 'byUsers') ?
                                        < div className="stat-item flex column justify-center align-center">
                                            <p className="board-stats-title">Weekly Members Workload</p>
                                            <StatisticsBar data={boardStats.byUsers} />

                                        </div>
                                        : null
                                    }
                                    {(boardStats.byDueDate && currView === 'byDueDate') ?
                                        < div className="stat-item flex column justify-center align-center">
                                            <p className="board-stats-title">On-Time/Delayed Work</p>
                                            <StatisticsPie data={boardStats.byDueDate} type="dueDate" />

                                        </div>
                                        : null
                                    }

                                </div>


                            </section>
                            : null

                        }

                    </section>

                </div>
            </>
        )
    }
}


const mapDispatchToProps = {
    save,
    loadBoard
}
const mapStateToProps = (state) => {
    return {
        currBoard: state.board.currBoard,
        loggedInUser: state.user.loggedInUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardStatistics);