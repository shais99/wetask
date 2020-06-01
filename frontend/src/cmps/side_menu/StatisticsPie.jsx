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
        if (this.statsTimeOut) clearTimeout(this.statsTimeOut);
    }


    render() {

        const getSliceColor = slice => slice.color;
        const { data } = this.state;
        return (
            // <span className="pie-content">
            <ResponsivePie
                data={data}
                margin={{ top: 10, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.7}
                padAngle={0}
                cornerRadius={5}
                colors={getSliceColor}
                borderWidth={2}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                radialLabelsSkipAngle={10}
                radialLabelsTextXOffset={6}
                radialLabelsTextColor={getSliceColor}
                radialLabelsLinkOffset={-10}
                radialLabelsLinkDiagonalLength={16}
                radialLabelsLinkHorizontalLength={24}
                radialLabelsLinkStrokeWidth={1}
                radialLabelsLinkColor={{ from: 'color' }}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                theme={{

                    fontFamily: 'openSansBold',
                    fontSize: 14,
                }}
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
            /* </span> */
        )

    }

};