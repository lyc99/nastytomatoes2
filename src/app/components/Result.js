import React from "react";

export class Result extends React.Component {
    constructor(props) {
        super();
        this.state = {

        };
    }

    onSaveMovie() {
        this.props.saveMovie(this.props.movieObject);
    }

    render() {
        return (
            <div className="search-result">
                {/*{this.props.movieObject.plot}*/}
                <img className="poster" src={this.props.movieObject.poster} />
                <div className="search-result-desc">
                    <div className="desc">Title: {this.props.movieObject.title}</div>
                    <div className="desc">Director: {this.props.movieObject.director}</div>
                    <div className="desc">Rated: {this.props.movieObject.rated}</div>
                    <div className="desc">Genre: {this.props.movieObject.genres}</div>
                    <div className="desc">Year: {this.props.movieObject.year}</div>
                    <div className="desc">Actors: {this.props.movieObject.actors}</div>
                    <button onClick={this.onSaveMovie.bind(this)} className="btn btn-primary">Save Movie</button>
                </div>
            </div>
        );
    }
}