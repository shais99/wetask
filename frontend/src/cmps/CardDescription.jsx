import React from 'react'
import { Link } from 'react-router-dom'

export default function CardDescription(props) {
    return (
        <div className="card-desc-container">
            <div className="card-mini-title"><label htmlFor="cardDesc">Description:</label></div>
            <form onSubmit={props.onSaveDesc}>
                <textarea name="description" value={props.description} onChange={props.handleChange} onFocus={() => props.isShown(true)} className="card-desc" id="cardDesc">
                </textarea>
                {props.isSubmitShown && <div className="desc-btns-container">
                    <button>Save Changes</button>
                    <Link to="#" className="cancel-changes" onClick={() => props.isShown(false, true)}>X</Link>
                </div>}
            </form>
        </div>
    )
}