import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

export class StatisticsBar extends React.Component {

    constructor() {
        super();
        this.statsTimeOut = null;
    }

    state = {
        data: [{ member: '', Tasks: 0, 'Done Tasks': 0 }],
        width: 1000
    }

    componentDidMount() {

        window.addEventListener('resize', this.updateDimensions);
        this.statsTimeOut = setTimeout(() => {

            this.setState({ data: this.props.data, maxTasks: this.props.maxTasks });

        }, 250)
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({ data: this.props.data, maxTasks: this.props.maxTasks });
        }
    }

    componentWillUnmount() {
        if (this.statsTimeOut) clearTimeout(this.statsTimeOut);

        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth });
    };

    render() {

        const getUserColor = user => (user.id === 'Done Tasks') ? '#a8a8a8' : '#3867d6';

        const { data, maxTasks, width } = this.state;
        return (

            <ResponsiveBar
                data={data}
                keys={['Tasks', 'Done Tasks']}
                indexBy="member"
                margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={getUserColor}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    format: value => `${(width < 550) ? value.slice(0, 3) : value.slice(0, 8)}`,
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: (width < 700) ? '' : 'Users',
                    legendPosition: 'middle',
                    legendOffset: 40,
                }}
                axisLeft={{
                    tickValues: maxTasks,
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Tasks',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                theme={{
                    axis: {
                        legend: {
                            text: {
                                fontFamily: 'openSansBold',
                                fontSize: 14
                            }
                        },
                        ticks: {
                            text: {
                                fontFamily: 'openSans',
                                fontSize: (width < 550) ? 8 : (width < 700) ? 12 : 14,
                            }
                        }
                    },
                    labels: {
                        text: {
                            fontFamily: 'openSans',
                            fontSize: 14,
                            stroke: '#fff',
                            fill: '#fff',
                            strokeWidth: 1.5,
                        },

                    },
                    legends: {
                        text: {
                            fontFamily: 'openSansBold',
                            fontSize: 14
                        }

                    }

                }}
            />


        )
    }
};