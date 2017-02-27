import React from "react";
import { render } from "react-dom";

import { Router, Route, IndexRoute, hashHistory } from "react-router";

import { Games } from "./pages/Games";
import { Tv } from "./pages/Tv";

import MovieListStore from "./stores/MovieListStore";

import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { Result } from "./components/Result";
import { Collection } from "./components/Collection";
import { CollectionSearch } from "./components/CollectionSearch";

var _ = require('lodash');

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            homeLink: "Home",
            tvLink: "TV",
            movieObject: null,
            movieName: "",
            movieList: [],
            movieSearchResult: [],
            searchString: "",
        };
    }

    componentWillMount() {
        MovieListStore.on("change", () => {
            console.log("change??");
           this.setState({
               movieList: MovieListStore.getAll(),
               movieSearchResult: MovieListStore.getMovieSearchResult(),
               searchString: MovieListStore.getSearchString(),
               movieObject: MovieListStore.getMovieObject(),
               movieName: MovieListStore.getMovieName(),
           });
        });
    }

    onClearSearch() {
        this.setState({searchString: ""});
    }

    render() {
        //search result
        let searchResult = "";
        if(this.state.movieObject && this.state.movieObject != "none") {
            searchResult = <div className="search-result-container">
                    <Result movieObject={this.state.movieObject} />
                    {/*<Result movieObject={this.state.movieObject} saveMovie={this.onSaveMovie.bind(this)} />*/}
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
            />;
        }
        else {
            collectionDiv = <Collection
                movieCollection={this.state.movieSearchResult}
            />;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        <Header homeLink={this.state.homeLink} tvLink={this.state.tvLink} />
                        {this.props.children}
                    </div>
                </div>
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

                        clearSearch={this.onClearSearch.bind(this)}
                    />
                    {collectionDiv}
                </div>
            </div>
        );
    }
}

render(
    // <App/>,
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            {/*<IndexRoute component={Header}></IndexRoute>*/}
            <Route path="tv" component={Tv}></Route>
            <Route path="games" component={Games}></Route>
        </Route>
    </Router>,
    window.document.getElementById("app"));