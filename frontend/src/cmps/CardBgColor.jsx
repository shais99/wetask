import React from 'react'

export default function CardBgColor(props) {
<<<<<<< HEAD
    const bgColors = ['#fd9644', '#fc5c65', '#fed330', '#26de81', '#2bcbba', '#45aaf2', '#4b7bec', '#a55eea', '#122961', '#fff', '#000','#f8a5c2']
=======
    const bgColors = ['#fd9644', '#fc5c65', '#fed330', '#26de81', '#2bcbba', '#45aaf2', '#4b7bec', '#a55eea', '#122961', '#000','#f8a5c2', '#fff']
>>>>>>> 16d4852cddbb725618e096b475b17c9f1ac9899c
    return (
        <div className="card-bg-container flex wrap justify-center">
            {bgColors.map((color, idx) => <div key={idx} className="card-bg" onClick={() => props.onChangeBgColor(color)} style={{ backgroundColor: color }}></div>)}
        </div>
    )
}
