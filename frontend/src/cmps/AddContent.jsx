import React from 'react'

export class AddContent extends React.Component {

    state = {
        isOpen: true,
        name: ''
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
        this.setState({ isOpen: false, name: '' });
    }

    handleChange = ({ target }) => {

        // let property = target.name;
        let name = target.value;

        this.setState({ name }, console.log(this.state));
    }

    toggleOpen = (event) => {
        event.preventDefault();
        if (this.state.isOpen) return;
        this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
    }

    render() {
        const { name, isOpen } = this.state;
        const { type } = this.props;

        return (
            // onClick={this.toggleOpen} 
            <form onSubmit={this.addStack} className="add-content flex column align-start">
                <span className="add-content-container flex column align-start">

                    {(isOpen)
                        ?
                        <React.Fragment>
                            <input name="name" onChange={this.handleChange} value={name} placeholder={`Enter ${type} title...`} />
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