import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

var _ = require('lodash');

class MovieListStore extends EventEmitter {
    constructor() {
        super();
        this.movieList = [];
        this.movieSearchResult = [];
        this.searchString = "";
    }
    addMovie(movie) {
        if(!_.find(this.movieList, function(m) {return m.imdbid == movie.imdbid;})) {
            this.movieList.push(movie);
        }
        this.emit("change");
    }
    deleteMovie(id) {
        _.remove(this.movieList, function(movie) {
            return movie.imdbid == id;
        });
        _.remove(this.movieSearchResult, function(movie) {
            return movie.imdbid == id;
        });
        this.emit("change");
    }
    searchCollection(searchString) {
        this.searchString = searchString;
        var result = [];
        //filter
        _.forEach(this.movieList, function(movie) {
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
        this.movieSearchResult = result;
        this.emit("change");
    }
    clearSearch() {
        this.searchString = "";
        this.emit("change");
    }
    getAll() {
        return this.movieList;
    }
    getMovieSearchResult() {
        return this.movieSearchResult;
    }
    getSearchString() {
        return this.searchString;
    }
    handleActions(action) {
        console.log("store received action", action);
        switch (action.type) {
            case "MOVIE_ADD": {
                this.addMovie(action.movie);
                break;
            }
            case "MOVIE_DELETE": {
                this.deleteMovie(action.id);
                break;
            }
            case "COLLECTION_SEARCH": {
                this.searchCollection(action.searchString);
                break;
            }
            case "CLEAR_SEARCH": {
                this.clearSearch();
                break;
            }
        }
    }

}

const movieListStore = new MovieListStore;
dispatcher.register(movieListStore.handleActions.bind(movieListStore));
// window.movieListStore = movieListStore;
// window.dispatcher = dispatcher;
export default movieListStore;