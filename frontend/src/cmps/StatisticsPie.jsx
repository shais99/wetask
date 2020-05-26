import React from 'react'
import { ResponsivePie } from '@nivo/pie';


export class StatisticsPie extends React.Component {

    constructor() {
        super();
        this.statsTimeOut = null;
    }

    state = {
        data: [{ id: '', label: '', value: 0, color: '#fff' }]
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
        if(this.statsTimeOut) clearTimeout(this.statsTimeOut);
    }


    render() {

        const getSliceColor = slice => slice.color;
        const { data } = this.state;
        return (
            <ResponsivePie
                data={this.props.data}
                margin={{ top: 10, right: 80, bottom: 80, left: 80 }}
                innerRadius={Math.random() * 0.75}
                padAngle={Math.floor(Math.random() * (10 - 1)) + 1}
                cornerRadius={5}
                colors={getSliceColor}
                borderWidth={2}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor="#333333"
                radialLabelsLinkOffset={0}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                defs={[
                    {
                        id: 'error',
                        type: 'patternError',
                        background: '#f2d600',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                        // stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: 'rgba(255, 255, 255, 0.3)',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                fill={[
                    {
                        match: {
                            id: 'error'
                        },
                        id: 'error'
                    },
                    {
                        match: {
                            id: 'c'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'go'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'python'
                        },
                        id: 'dots'
                    },
                    {
                        match: {
                            id: 'scala'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'lisp'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'elixir'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'javascript'
                        },
                        id: 'lines'
                    }
                ]}
                legends={[
                    // {
                    //     anchor: 'bottom',
                    //     direction: 'row',
                    //     translateY: 56,
                    //     itemWidth: 50,
                    //     itemHeight: 18,
                    //     itemTextColor: '#999',
                    //     symbolSize: 18,
                    //     symbolShape: 'circle',
                    //     effects: [
                    //         {
                    //             on: 'hover',
                    //             style: {
                    //                 itemTextColor: '#000'
                    //             }
                    //         }
                    //     ]
                    // }
                ]}
            />
    
        )

    }

};