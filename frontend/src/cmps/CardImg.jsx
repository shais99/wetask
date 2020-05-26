import React from 'react'

export default function CardImg(props) {
    return (
        <div className="card-img-container">
            <div className="card-mini-title flex align-center space-between">
                <div>
                    <img src="/assets/img/style.png"></img>
                    <label className="card-txt-title">Image:</label>
                </div>
                <button className="btn btn-delete" onClick={() => props.onRemoveImg()}>Delete</button>
            </div>
            <div className="card-img">
                {props.isUploadImg ? <div className="loading">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div> : <img src={`${props.card.imgUrl}`} />}

            </div>

        </div>
    )
}