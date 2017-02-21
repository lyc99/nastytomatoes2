import React from "react";

export class UpdateModal extends React.Component {
    constructor(props) {
        super();
        this.state = {

        };
    }

    render() {
        return (
            <div >
                Update Modal
                {this.props.openModal}
                {this.props.selectedMovie.title}
            </div>
        );
    }
}