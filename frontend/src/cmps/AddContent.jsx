import React from 'react'
import { Link } from 'react-router-dom'

export class AddContent extends React.Component {

    state = {
        isOpen: false,
        title: ''
    };

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    addItem = (event) => {
        console.log(event.target);
        event.preventDefault();

        if(!event.target) return;

        const itemTitle = event.target.name.value;

        switch (this.props.type) {
            case 'stack':
                this.props.onStackAdd(itemTitle);
                break;
            case 'card':
                const parentId = this.props.itemId;
                this.props.onCardAdd(itemTitle, parentId);
                break;
        }

        this.setState({ isOpen: false, title: '' });
    }

    handleChange = ({ target }) => {

        let title = target.value;

        this.setState({ title }, console.log(this.state));
    }

    toggleOpen = (event) => {
        event.preventDefault();

        this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
    }

    render() {
        const { title, isOpen } = this.state;
        const { type } = this.props;

        return (
            // onClick={this.toggleOpen} 
            <div className="add-content-container flex column align-start">
                {(isOpen)
                    ?
                    <>
                        <form onSubmit={this.addItem} className="add-content flex column align-start">
                            <input name="name" onChange={this.handleChange} value={title} placeholder={`Enter ${type} title...`} />
                            {/* <span className="add-content-buttons flex space-between"> */}
                            <button>{`Add ${type}`}</button>
                            {/* </span> */}
                        </form>
                        <img src="/assets/img/close.png" onClick={this.toggleOpen} className="close-add-icon" />
                    </>
                    :
                    <>
                        <Link to="#" onClick={this.toggleOpen} className="add-content-title">{`Add ${type}`}</Link>
                    </>
                }
            </div>
        )
    }
};