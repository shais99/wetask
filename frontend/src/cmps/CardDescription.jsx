import React from 'react'
import { Link } from 'react-router-dom'

export default function CardDescription(props) {
    return (
        <div className="card-desc-container">


            <div className="card-mini-title flex align-center">
                <img src="/assets/img/description.png" alt=""></img>
                <label className="card-txt-title" htmlFor="cardDesc">Description:</label>
            </div>

            <form className="main-content-card-action" onSubmit={props.onSaveDesc}>
                <textarea name="description" value={props.description} onChange={props.handleChange}
                    onFocus={() => props.isShown(true)} className="card-desc" id="cardDesc" placeholder="Add your card description...">
                </textarea>
                {props.isSubmitShown && <div className="desc-btns-container flex align-center">
                    <button className="btn btn-primary btn-save-desc">Save Changes</button>
                    <Link to="#" className="cancel-changes" onClick={() => props.isShown(false, true)}>
                        <img className="close-btn-desc" src="/assets/img/close.png" alt="" />
                    </Link>
                </div>}
            </form>
        </div>
    )
}