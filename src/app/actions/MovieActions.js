import dispatcher from "../dispatcher";

export function addMovie(movie) {
    console.log("MovieActions add");
    dispatcher.dispatch({
        type: "MOVIE_ADD",
        movie,
    });
}

export function deleteMovie(id) {
    console.log("MovieActions delete", id);
    dispatcher.dispatch({
        type: "MOVIE_DELETE",
        id,
    });
}

export function searchCollection(searchString) {
    console.log("MovieActions search collection");
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