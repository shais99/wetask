import React from 'react'

export default function CardImg(props) {
    return (
        <div className="card-img-container">
            <div className="card-mini-title flex align-center">
                <img src="/assets/img/style.png"></img>
                <label className="card-txt-title">Image:</label>
            </div>
            <div className="card-img">
                {props.isUploadImg? <div className="loading">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div> : <img src={`${props.card.imgUrl}`} />}
                
            </div>

        </div>
    )
}