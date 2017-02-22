import React from "react";
import { render } from "react-dom";

import { Search } from "./components/Search";
import { Result } from "./components/Result";
import { Collection } from "./components/Collection";
import { CollectionSearch } from "./components/CollectionSearch";

const imdb = require('imdb-api');
var _ = require('lodash');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            movieObject: null,
            movieName: "",
            movieList: [],
            movieSearchResult: [],
            searchString: "",
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

    onSearchCollection(searchString) {
        var result = [];
        var collection = this.state.movieList.slice(0);
        //filter
        _.forEach(collection, function(movie) {
            var foundString = false;
            for(var key in movie) {
                if(key == 'title' || key == 'year' || key == 'rated' || key == 'genres' || key == 'director' || key == 'actors' || key == 'plot') {
                    if(String(movie[key]).indexOf(searchString) > -1) {
                        foundString = true;
                        break;
                    }
                }
            }
            if(foundString) {
                result.push(movie);
            }
        });
        this.setState({
            searchString: searchString,
            movieSearchResult: result,
        });
    }

    onClearSearch() {
        this.setState({searchString: ""});
        console.log("onClearSearch!!");
    }

    onSaveMovie(movie) {
        var collection = this.state.movieList.slice(0);
        if(!_.find(collection, function(m) {return m.imdbid == movie.imdbid;})) {
            collection.push(movie);
        }
        this.setState({
            movieList: collection,
            searchString: "",
        });
    }

    onDeleteMovie(id) {
        console.log("real delete", id);
        var collection = this.state.movieList.slice(0);
        _.remove(collection, function(movie) {
            return movie.imdbid == id;
        });
        this.setState({
           movieList: collection
        });
    }

    onDeleteMovieFromSearchResult(id) {
        console.log("real delete from result", id);
        var collection = this.state.movieList.slice(0);
        _.remove(collection, function(movie) {
            return movie.imdbid == id;
        });
        var search_result = this.state.movieSearchResult.slice(0);
        _.remove(search_result, function(movie) {
            return movie.imdbid == id;
        });
        this.setState({
            movieList: collection,
            movieSearchResult: search_result,
        });
    }

    onUpdateMovie(data) {
        console.log("onUpdateMovie!!", data.title);
        var collection = this.state.movieList.slice(0);
        var foundMovie = false;
        while(!foundMovie) {
            var m = _.find(collection, function(movie) {
                foundMovie = true;
                return movie.imdbid == data.id;
            });
        }
        //update info
        m.title = data.title;
        m.year = data.year;
        m.rated = data.rated;
        m.genres = data.genres;
        m.director = data.director;
        m.actors = data.actors;
        m.plot = data.plot;
        console.log("collection: ", collection);

        this.setState({
            movieList: collection
        });
    }

    onUpdateMovieFromSearchResult(data) {
        console.log("onUpdateMovie!! from search result", data);
        // var collection = this.state.movieSearchResult.slice(0);
        // var foundMovie = false;
        // while(!foundMovie) {
        //     var m = _.find(collection, function(movie) {
        //         foundMovie = true;
        //         return movie.imdbid == data.id;
        //     });
        // }
        // //update info from movie list
        // m.title = data.title;
        // m.year = data.year;
        // m.rated = data.rated;
        // m.genres = data.genres;
        // m.director = data.director;
        // m.actors = data.actors;
        // m.plot = data.plot;
        // // console.log("collection: ", collection);
        // this.onUpdateMovie(data);
        //
        // this.setState({
        //     movieList: collection
        // });
    }

    render() {
        //search result
        let searchResult = "";
        if(this.state.movieObject && this.state.movieObject != "none") {
            searchResult = <div className="search-result-container">
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
        //show whole collection or search result
        let collectionDiv = "";
        if(this.state.searchString == "") {
            collectionDiv = <Collection
                movieCollection={this.state.movieList}
                deleteMovie={this.onDeleteMovie.bind(this)}
                updateMovie={this.onUpdateMovie.bind(this)}
            />;
        }
        else {
            collectionDiv = <Collection
                movieCollection={this.state.movieSearchResult}
                deleteMovie={this.onDeleteMovieFromSearchResult.bind(this)}
                updateMovie={this.onUpdateMovieFromSearchResult.bind(this)}
            />;
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
                    <CollectionSearch
                        searchString={this.state.searchString}
                        movieCollection={this.state.movieList}
                        searchCollection={this.onSearchCollection.bind(this)}
                        clearSearch={this.onClearSearch.bind(this)}
                    />
                    {collectionDiv}
                </div>
            </div>
        );
    }
}

render(<App/>, window.document.getElementById("app"));