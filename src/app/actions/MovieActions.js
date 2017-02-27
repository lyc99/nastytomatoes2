import dispatcher from "../dispatcher";

export function searchMovie(movieName) {
    dispatcher.dispatch({
       type: "MOVIE_SEARCH",
        movieName,
    });
}

export function addMovie(movie) {
    dispatcher.dispatch({
        type: "MOVIE_ADD",
        movie,
    });
}

export function deleteMovie(id) {
    dispatcher.dispatch({
        type: "MOVIE_DELETE",
        id,
    });
}

export function updateMovie(data) {
    dispatcher.dispatch({
        type: "MOVIE_UPDATE",
        data,
    });
}

export function searchCollection(searchString) {
    dispatcher.dispatch({
        type: "COLLECTION_SEARCH",
        searchString,
    });
}

export function clearSearch() {
    dispatcher.dispatch({
        type: "CLEAR_SEARCH",
    });
}