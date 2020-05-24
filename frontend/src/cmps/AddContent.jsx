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
        console.log(event.target.value);
        event.preventDefault();

        if (!event.target) return;
        if (event.target.name.value === '' || event.target.name.value === undefined) return;

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

        this.setState({ title });
    }

    toggleOpen = (event) => {
        event.preventDefault();

        this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
    }

    render() {
        const { title, isOpen } = this.state;
        const { type } = this.props;

        return (

            <div className={`add-content-container flex align-start add-${type}`} style={{

                padding: (type === 'stack') ? '10px 20px' : '7.5px 15px',
                fontSize: (type === 'stack') ? 18 : 14,
                color: (type === 'stack') ? '#ffffff' : '#888888',
                // background: (type === 'stack') ? 'lightgreen' : 'cornflowerblue',
                width: (type === 'stack') ? 250 : '100%',
                borderTopLeftRadius: (type === 'stack') ? 3 : 0,
                borderTopRightRadius: (type === 'stack') ? 3 : 0

            }}>
                {(isOpen)
                    ?
                    <>
                        <form onSubmit={this.addItem} className="add-content flex column align-start">
                            <input name="name" autoComplete="off" onChange={this.handleChange}
                                value={title} placeholder={`Enter ${type} title...`}
                                className={`input ${(type === 'stack') ? 'stack-input' : 'card-input'}`} autoFocus={true} />
                            <span className="add-content-buttons flex space-between">
                                <button className={`btn btn-${(type === 'stack') ? 'primary' : 'success'} btn-small`}>{`Add ${type}`}</button>
                                <img src="/assets/img/close.png" onClick={this.toggleOpen} className="close-add-icon" />
                            </span>
                        </form>
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