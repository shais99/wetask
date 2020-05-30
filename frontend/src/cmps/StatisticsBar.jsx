import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { getRandomColor } from '../services/utilService';

export class StatisticsBar extends React.Component {

    constructor() {
        super();
        this.statsTimeOut = null;
    }

    state = {
        data: [{ member: '', Tasks: 0, 'Done Tasks': 0 }]
    }

    componentDidMount() {
        this.statsTimeOut = setTimeout(() => {

            this.setState({ data: this.props.data });

        }, 250)
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({ data: this.props.data });
        }
    }

    componentWillUnmount() {
        if (this.statsTimeOut) clearTimeout(this.statsTimeOut);
    }

    render() {

        const getUserColor = user => {
            // console.log(user);
            return (user.id === 'Done Tasks') ? '#525252' : (user.color) ? user.color : '#fed330';
        }

        const { data } = this.state;
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
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Users',
                    legendPosition: 'middle',
                    legendOffset: 40
                }}
                axisLeft={{
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
                                fontSize: 14
                            }
                        }
                    },
                    labels: {
                        text: {
                            fontFamily: 'openSansBold',
                            fontSize: 14,
                            color: '#fff'
                        },
                        
                    },
                    legends: {
                        text: {
                            fontFamily: 'openSans',
                            fontSize: 14
                        }

                    }

                }}
            />


        )
    }
};