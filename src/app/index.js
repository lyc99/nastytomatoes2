import React from "react";
import { render } from "react-dom";

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Search } from "./components/Search";
import { Result } from "./components/Result";

const imdb = require('imdb-api');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            movieObject: null,
            movieName: ""
        };
    }

    onChangeMovieName(newName) {
        let movie = null;
        imdb.get(newName).then(things => {
            movie = things;

            this.setState({
                movieObject: movie,
                movieName: movie.title
            });
        }, err => {
            console.log("err", err);
            this.setState({
                movieObject: "none"
            });
        });
    }

    onSaveMovie(movie) {
        console.log("onSaveMovie in index.js", movie);
    }

    render() {
        let searchResult = "";
        if(this.state.movieObject && this.state.movieObject != "none") {
            searchResult = <div className="search-result-container">
                {/*{this.state.movieObject.plot}*/}
                    <Result movieObject={this.state.movieObject} saveMovie={this.onSaveMovie.bind(this)} />
                </div>;
        }
        else if(this.state.movieObject == "none") {
            searchResult = <div className="search-explain">
                No result found!
            </div>;
        }
        else {
            searchResult = <div className="search-explain">
                Search for a movie and add it to you're collection!
            </div>;
        }

        return (
            <div className="container">
                <div className="row text-center">
                    <div className="col-xs-10 col-xs-offset-1 title-text">
                        Nasty Tomatoes 2.0
                    </div>
                </div>
                <div style={{height: 300}}>
                    <div className="row fill-height">
                        <div className="search-box-container">
                            <Search
                                movieName={this.state.movieName}
                                changeMovieName={this.onChangeMovieName.bind(this)}
                            />
                            {searchResult}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="row">
                        <div className="col-xs-10 col-xs-offset-1">
                            Hey
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

render(<App/>, window.document.getElementById("app"));