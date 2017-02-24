import React from "react";

import * as MovieActions from "../actions/MovieActions";

export class Search extends React.Component {
    constructor(props) {
        super();
        this.state = {
            movieName: props.movieName,
        };
    }

    onSearchMovieName() {
        this.props.searchMovieName(this.state.movieName);
    }

    onHandleChange(event) {
        this.setState({
            movieName: event.target.value
        });
    }

    render() {
        return (
            <div>
                <p>{this.props.name}</p>
                <input type="text" className="search-box" value={this.state.movieName}
                       onChange={(event) => this.onHandleChange(event)} />
                <button onClick={this.onSearchMovieName.bind(this)} className="btn btn-primary search-button">Search</button>
            </div>
        );
    }
}