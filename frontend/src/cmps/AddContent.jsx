import React from 'react'

export class AddContent extends React.Component {

    state = {
        isOpen: true,
        title: ''
    };

    componentDidMount() {

    }
    componentDidUpdate() {

    }

    addStack = (event) => {
        console.log(event);
        event.preventDefault();
        const stackTitle = event.target.name.value;
        this.props.onStackAdd(stackTitle);
        this.setState({ isOpen: false, title: '' });
    }

    handleChange = ({ target }) => {

        let title = target.value;

        this.setState({ title }, console.log(this.state));
    }

    toggleOpen = (event) => {
        event.preventDefault();
        if (this.state.isOpen) return;
        this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
    }

    render() {
        const { title, isOpen } = this.state;
        const { type } = this.props;

        return (
            // onClick={this.toggleOpen} 
            <form onSubmit={this.addStack} className="add-content flex column align-start">
                <span className="add-content-container flex column align-start">

                    {(isOpen)
                        ?
                        <React.Fragment>
                            <input name="name" onChange={this.handleChange} value={title} placeholder={`Enter ${type} title...`} />
                            <span className="add-content-buttons flex space-between">
                                {/* <p onClick={this.toggleOpen}>X</p> */}
                                <button>{`Add ${type}`}</button>
                            </span>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <p className="add-content-title">{`Add ${type}`}</p>
                        </React.Fragment>
                    }

                </span>
            </form>
        )
    }
};