import React from "react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";

export class UpdateModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isShowingModal: false,
            title: props.movieInfo.title,
            rated: props.movieInfo.rated,
            director: props.movieInfo.director,
            actors: props.movieInfo.actors,
            plot: props.movieInfo.plot
        };
    }
    onUpdateMovie() {
        console.log("onUpdateMovie UpdateModal.js");
        this.props.updateMovie(this.props.movieId);
    }
    onHandleChange(event) {
        switch(event.target.id) {
            case "title":
                this.setState({title: event.target.value});
                break;
            case "rated":
                this.setState({rated: event.target.value});
                break;
            case "director":
                this.setState({director: event.target.value});
                break;
            case "actors":
                this.setState({actors: event.target.value});
                break;
        }

    }

    handleClick = () => this.setState({isShowingModal: true});
    handleClose = () => this.setState({isShowingModal: false});

    render() {
        return <button onClick={this.handleClick} className="btn btn-primary">
            Update
            {
                this.state.isShowingModal &&
                <ModalContainer onClose={this.handleClose}>
                    <ModalDialog onClose={this.handleClose}>
                        <h5>Title:</h5>
                        <input className="update-input" id="title" type="text" value={this.state.title}
                               onChange={(event) => this.onHandleChange(event)} />
                        <h5>Rated:</h5>
                        <input className="update-input" id="rated" type="text" value={this.state.rated}
                               onChange={(event) => this.onHandleChange(event)} />
                        <h5>Director:</h5>
                        <input className="update-input" id="director" type="text" value={this.state.director}
                               onChange={(event) => this.onHandleChange(event)} />
                        <h5>Actors:</h5>
                        <input className="update-input" id="actors" type="text" value={this.state.actors}
                               onChange={(event) => this.onHandleChange(event)} />
                        <h5>Plot:</h5>
                        <textarea className="plot-text-area">{this.state.plot}</textarea>
                        <button className="btn btn-primary search-button" onClick={this.onUpdateMovie.bind(this)}>Update</button>
                        <button className="btn btn-primary" onClick={this.handleClose}>Close</button>
                    </ModalDialog>
                </ModalContainer>
            }
        </button>;
    }

    // render() {
    //     return (
    //         <div id="modal-window">
    //             Update Modal
    //             {this.props.openModal}
    //             {this.props.selectedMovie.title}
    //         </div>
    //     );
    // }
}