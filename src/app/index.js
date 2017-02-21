import React from "react";
import { render } from "react-dom";

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Search } from "./components/Search";
import { Result } from "./components/Result";
import { Collection } from "./components/Collection";
import { CollectionSearch } from "./components/CollectionSearch";
import { UpdateModal } from "./components/UpdateModal";

const imdb = require('imdb-api');
var _ = require('lodash');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            movieObject: null,
            movieName: "",
            movieList: [],
            openModal: false,
            selectedMovie: null
        };
    }

    onSearchMovieName(newName) {
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

    onSearchCollection(newName) {
        let movie = null;
        console.log("onSearchCollection!!");
    }

    onClearSearch() {
        console.log("onClearSearch!!");
    }

    onSaveMovie(movie) {
        var collection = this.state.movieList.slice(0);
        collection.push(movie);
        console.log("onSaveMovie in index.js", movie);
        this.setState({
           movieList: collection
        });
    }

    onDeleteMovie(id) {
        var collection = this.state.movieList.slice(0);
        _.remove(collection, function(movie) {
            return movie.imdbid == id;
        });
        this.setState({
           movieList: collection
        });
    }

    onUpdateMovie(id) {
        console.log("onUpdateMovie!!", id);
        // var selectedMovieCopy = this.state.selectedMovie.slice(0);
        var m = _.find(this.state.movieList, function(movie) {
            return movie.imdbid == id;
        });
        this.setState({
            openModal: true,
            selectedMovie: m
        });

        console.log("found?", this.state);
    }

    render() {
        //search result
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
                Search for a movie and add it to your collection!
            </div>;
        }
        //modal
        let modalWindow = "";
        if(this.state.openModal) {
            console.log("open?");
            modalWindow = <div>
                <UpdateModal
                    openModal={this.state.openModal}
                    selectedMovie={this.state.selectedMovie}
                />
            </div>
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
                                searchMovieName={this.onSearchMovieName.bind(this)}
                            />
                            {searchResult}
                        </div>
                    </div>
                </div>
                <hr />
                <div>
                    {modalWindow}
                    <CollectionSearch
                        movieName={this.state.movieName}
                        movieCollection={this.state.movieList}
                        searchCollection={this.onSearchCollection.bind(this)}
                        clearSearch={this.onClearSearch.bind(this)}
                    />
                    <Collection
                        movieCollection={this.state.movieList}
                        deleteMovie={this.onDeleteMovie.bind(this)}
                        updateMovie={this.onUpdateMovie.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

render(<App/>, window.document.getElementById("app"));