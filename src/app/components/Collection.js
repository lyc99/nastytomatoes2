import React from "react";

export class Collection extends React.Component {
    onDeleteMovie(event) {
        console.log("delete", event.target.id);
        this.props.deleteMovie(event.target.id);
    }
    onUpdateMovie(event) {
        this.props.updateMovie(event.target.id);
    }

    render() {
        //collection
        const collection = this.props.movieCollection.map((movie, index) => {
            return (
                <li key={index} className="movie-list">
                    <div className="row">
                        <div className="col-md-5">
                            <img className="poster-big" src={movie.poster} />
                        </div>
                        <div className="col-md-7">
                            <h3>{movie.title} ({movie.year})</h3>
                            <h4>{movie.rated}</h4>
                            <h5>{movie.genres}</h5>
                            <p>Director: {movie.director}</p>
                            <p>Actors: {movie.actors}</p>
                            <p>{movie.plot}</p>
                            <button onClick={(event) => this.onDeleteMovie(event)} className="btn btn-primary search-button" id={movie.imdbid}>Delete</button>
                            <button onClick={this.onUpdateMovie.bind(this)} className="btn btn-primary" id={movie.imdbid}>Update</button>
                        </div>
                    </div>
                    <hr />
                </li>
            );
        });

        return (
            <div className="row">
                <ol>{collection}</ol>
            </div>
        );
    }
}