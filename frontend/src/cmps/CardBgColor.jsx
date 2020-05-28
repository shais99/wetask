import React from 'react'

export default function CardBgColor(props) {
    const bgColors = ['#fd9644', '#fc5c65', '#fed330', '#26de81', '#2bcbba', '#45aaf2', '#4b7bec', '#a55eea', '#122961', '#fff', '#000','#f8a5c2']
    return (
        <div className="card-bg-container flex wrap justify-center">
            {bgColors.map((color, idx) => <div key={idx} className="card-bg" onClick={() => props.onChangeBgColor(color)} style={{ backgroundColor: color }}></div>)}
        </div>
    )
}
