import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

const imdb = require('imdb-api');
var _ = require('lodash');

class MovieListStore extends EventEmitter {
    constructor() {
        super();
        this.movieObject = null;
        this.movieName = "";
        this.movieList = [];
        this.movieSearchResult = [];
        this.searchString = "";
    }
    searchMovie(movieName) {
        console.log("searchMovie", movieName);
        let movie = null;
        imdb.get(movieName).then(things => {
            movie = things;
            this.movieObject = movie;
            this.movieName = movie.title;
            this.emit("change");
        }, err => {
            console.log("err", err);
            this.movieObject = movie;
            this.emit("change");
        });
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
    updateMovie(data) {
        var collection = this.movieList.slice(0);
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

        this.movieList = collection;
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
    getMovieObject() {
        return this.movieObject;
    }
    getMovieName() {
        return this.movieName;
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
            case "MOVIE_SEARCH": {
                this.searchMovie(action.movieName);
                break;
            }
            case "MOVIE_ADD": {
                this.addMovie(action.movie);
                break;
            }
            case "MOVIE_DELETE": {
                this.deleteMovie(action.id);
                break;
            }
            case "MOVIE_UPDATE": {
                this.updateMovie(action.data);
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