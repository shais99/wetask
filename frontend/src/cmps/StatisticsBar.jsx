import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { getRandomColor } from '../services/utilService';

export function StatisticsBar(props) {

    const colors = { 'Tasks': getRandomColor(), 'Done Tasks': '#3f3f3f' };
    const getUserColor = user => colors[user.id];

    const keys = ['Tasks', 'Done Tasks'];
    const baseKeys = ['tasks', 'doneTasks'];
    console.log(props.data);
    return (

        <ResponsiveBar
            data={props.data}
            keys={['Tasks', 'Done Tasks']}
            indexBy="member"
            margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={getUserColor}
            defs={[
                {
                    id: 'admin',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'admin'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Users',
                legendPosition: 'middle',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Tasks',
                legendPosition: 'middle',
                legendOffset: -35
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: { getUserColor }, modifiers: [['darker', 1.6]] }}
            legends={[
                {
                    dataFrom: "keys",
                    // data: keys.map((id, index) => ({
                    //     color: colors[index],
                    //     id,
                    //         label: id === "tasks" ? 'Tasks' : 'Done Tasks'
                    //   })),
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
        />


    )
};