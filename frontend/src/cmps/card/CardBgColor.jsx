import React from 'react'

export default function CardBgColor(props) {


    function onChangeBgColor(bgColor) {
        const newCard = { ...props.card }
        newCard.bgColor = bgColor
        props.saveCard(newCard)
        props.onToggleAction('bgColor')
    }


    const bgColors = ['#fd9644', '#fc5c65', '#fed330', '#26de81', '#2bcbba', '#45aaf2', '#4b7bec', '#a55eea', '#122961', '#fff', '#000', '#f8a5c2']
    return (
        <div className="card-bg-container flex wrap justify-center">
            {bgColors.map((color, idx) => <div key={idx} className="card-bg" onClick={() => onChangeBgColor(color)} style={{ backgroundColor: color }}></div>)}
        </div>
    )
}
