import React from 'react'

import { save, loadBoard } from '../store/actions/boardActions'
import { connect } from 'react-redux'
import { StatisticsPie } from '../cmps/StatisticsPie';
import { StatisticsBar } from '../cmps/StatisticsBar';
import { StatisticsInfoBlock } from '../cmps/StatisticsInfoBlock';
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
        let maxTasks = 0;

        board.stacks.forEach((stack) => {
            stack.cards.forEach((card) => {

                if (card.members.length) {
                    card.members.forEach(member => {

                        if (!users[member.username]) users[member.username] = { tasks: 0, doneTasks: 0, color: member.bgColor };

                        let isDone = card.labels.some((label) => {
                            return label.title === 'done';
                        })

                        users[member.username][(isDone) ? 'doneTasks' : 'tasks'] += 1;
                        if(maxTasks < users[member.username]['tasks']) {
                            maxTasks = users[member.username]['tasks'];
                        }
                    })

                }
            })
        })

        let userStatsData = Object.keys(users).map((username) => {
            const userInfo = users[username];
            return ({
                member: username,
                Tasks: userInfo.tasks - userInfo.doneTasks,
                'Done Tasks': userInfo.doneTasks,
                color: userInfo.color
            });
        })

        return {userStatsData, maxTasks};
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
        let totalTimeEstimation = this.getTotalTimeEstimation(board);

        if (byDueDate === null) this.setState({ isNoCardsBoard: true })
        else {
            if (this.state.isNoCardsBoard) this.setState({ isNoCardsBoard: false })
        }
        stats = { byLabels, byUsers: byUsers.userStatsData, byDueDate, maxTasks: byUsers.maxTasks, totalTimeEstimation };

        console.log(stats);
        return stats;
    }

    getTotalTimeEstimation = (board) => {

        let timeEstimation = { days: 0, hours: 0, minutes: 0 };

        board.stacks.forEach(stack => {

            stack.cards.forEach(card => {
                const estimate = card.timeEstimation;
 
                if(estimate !== '') {
                    timeEstimation.days += +estimate.days;
                    timeEstimation.hours += +estimate.hours;
                    timeEstimation.minutes += +estimate.minutes;
                }
            })
        })

        if(!(timeEstimation.days + timeEstimation.hours + timeEstimation.minutes)) {
            return null;
        }
        let daysLabel = (!timeEstimation.days) ? '' : (timeEstimation.days > 1) ? timeEstimation.days + ' days,' : timeEstimation.days + ' day,';
        let hoursLabel = (!timeEstimation.hours) ? '' : (timeEstimation.hours > 1) ? timeEstimation.hours + ' hours,' : timeEstimation.hours + ' hour,';
        let minutesLabel = (!timeEstimation.minutes) ? '' : timeEstimation.minutes + ' min';

        return daysLabel + ' ' + hoursLabel + ' ' + minutesLabel;
    }


    render() {

        const { board, cardCount, boardStats } = this.state;
        const { isShowingStatistics, toggleShowStatistics } = this.props;

        return ((!board) ? '' :

            <>
                <div className="stats flex align-center justify-center">

                    <section className={`board-statistics modal-container flex column ${(isShowingStatistics) ? '' : 'board-statistics-closed'}`} onMouseDown={(ev) => ev.stopPropagation()}
                        ref={this.elStats}>
                        <header className="board-statistics-header-span flex align-center justify-center">
                            <div className="board-statistics-header-text flex align-baseline justify-center">
                                <p className="board-statistics-header">{board.title}</p>
                                <p className="secondary">statistics</p>
                            </div>
                            <img className="stats-back-btn" src="/assets/img/back.png" alt="" onClick={toggleShowStatistics} />
                        </header>
                        <small className="board-statistics-info flex align-center space-evenly wrap">
                            
                            {/* {(board.createdBy) ?
                                // <StatisticsInfoBlock info={moment(board.createdAt).format('MMM Do YYYY') + ` [${board.createdBy.username}]`} type='createdBy' />
                                <StatisticsInfoBlock info={moment(board.createdAt).format('MMM Do YYYY')} type='createdBy' />
                                : null
                            } */}
                            {(boardStats && boardStats.totalTimeEstimation) ?
                                // <StatisticsInfoBlock info={moment(board.createdAt).format('MMM Do YYYY') + ` [${board.createdBy.username}]`} type='createdBy' />
                                <StatisticsInfoBlock info={boardStats.totalTimeEstimation} type='timeEstimation' />
                                : null
                            }
                            {(board.members) ?
                                <StatisticsInfoBlock info={board.members.length} type='members' />
                                : null
                            }
                            {(board.stacks) ?
                                <StatisticsInfoBlock info={board.stacks.length} type='stacks' />
                                : null
                            }
                            {(board.stacks && cardCount) ?
                                <StatisticsInfoBlock info={cardCount} type='cards' />
                                : null
                            }
                            {(board.activities) ?
                                <StatisticsInfoBlock info={board.activities.length} type='activities' />
                                : null
                            }


                        </small>
                        {(boardStats) ?
                            <section className="board-statistics-content grid">

                                {(boardStats.byUsers) ?
                                    < div className="stat-item by-users flex column justify-center align-center">
                                        <p className="board-stats-title">Weekly Members Workload</p>
                                        <StatisticsBar data={boardStats.byUsers} maxTasks={boardStats.maxTasks} />

                                    </div>
                                    : null
                                }
                                {(boardStats.byLabels) ?
                                    < div className="stat-item by-labels flex column justify-center align-center">
                                        <p className="board-stats-title">Most Popular Labels</p>
                                        <StatisticsPie data={boardStats.byLabels} type="labels" />

                                    </div>
                                    : null
                                }
                                {(boardStats.byDueDate) ?
                                    < div className="stat-item by-due-date flex column justify-center align-center">
                                        <p className="board-stats-title">On-Time/Delayed Work</p>
                                        <StatisticsPie data={boardStats.byDueDate} type="dueDate" />

                                    </div>
                                    : null
                                }

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