import React from 'react'

export default function BoardBackground(props) {

    const bgColors = ['blue', 'red', 'pink', 'black', 'yellow', '#122961', '#3867d6', '#fed330', '#eb3b5a']
    const bgImgs = ['/assets/img/bg-beach.jpg', '/assets/img/bg-flowers.jpg',
        '/assets/img/bg-sunset.jpg', '/assets/img/bg-view.jpg',
        '/assets/img/bg-view2.jpg', '/assets/img/bg-view3.jpg',
        '/assets/img/bg-view4.jpg', '/assets/img/bg-water.jpg', '/assets/img/bg-view5.jpg'];
    const { type, onSetBg } = props

    if (type === 'image') {
        return (
            <div className="backgrounds-container flex even wrap">
                {bgImgs.map((img, idx) => <div key={idx} className="background" onClick={() => onSetBg(img, 'img')} style={{ backgroundImage: `url(${img})`, backgroundSize: '100%',backgroundPosition:'center' }}></div>)}
            </div>
        )
    } else {
        return (
            <div className="backgrounds-container flex even wrap">
                {bgColors.map((color, idx) => <div key={idx} className="background" onClick={() => onSetBg(color, 'color')} style={{ backgroundColor: color }}></div>)}
            </div>
        )
    }
}