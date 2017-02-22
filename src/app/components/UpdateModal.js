import React from "react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";

export class UpdateModal extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isShowingModal: false,
            movieInfo: props.movieInfo,
            id: props.movieInfo.imdbid,
            title: props.movieInfo.title,
            year: props.movieInfo.year,
            genres: props.movieInfo.genres,
            rated: props.movieInfo.rated,
            director: props.movieInfo.director,
            actors: props.movieInfo.actors,
            plot: props.movieInfo.plot
        };
        console.log("modal construct");
    }
    onUpdateMovie() {
        this.props.updateMovie(this.state);
        this.setState({isShowingModal: false});
    }
    onHandleChange(event) {
        switch(event.target.id) {
            case "title":
                this.setState({title: event.target.value});
                break;
            case "year":
                this.setState({year: event.target.value});
                break;
            case "genres":
                this.setState({genres: event.target.value});
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
            case "plot":
                this.setState({plot: event.target.value});
                break;
        }

    }

    handleClick = () => this.setState({
            isShowingModal: true,
            id: this.props.movieInfo.imdbid,
            title: this.props.movieInfo.title,
            year: this.props.movieInfo.year,
            genres: this.props.movieInfo.genres,
            rated: this.props.movieInfo.rated,
            director: this.props.movieInfo.director,
            actors: this.props.movieInfo.actors,
            plot: this.props.movieInfo.plot
        });
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
                        <h5>Year:</h5>
                        <input className="update-input" id="year" type="text" value={this.state.year}
                               onChange={(event) => this.onHandleChange(event)} />
                        <h5>Genres:</h5>
                        <input className="update-input" id="genres" type="text" value={this.state.genres}
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
                        <textarea className="plot-text-area" id="plot" value={this.state.plot}
                                  onChange={(event) => this.onHandleChange(event)} />
                        <button className="btn btn-primary search-button" onClick={this.onUpdateMovie.bind(this)}>Update</button>
                        <button className="btn btn-primary" onClick={this.handleClose}>Close</button>
                    </ModalDialog>
                </ModalContainer>
            }
        </button>;
    }
}