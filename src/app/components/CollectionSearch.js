import React from "react";

export class CollectionSearch extends React.Component {
    constructor(props) {
        super();
        this.state = {
            movieName: props.movieName,
        };
    }
    onHandleChange(event) {
        this.setState({
            movieName: event.target.value
        });
        console.log("handle");
    }
    onSearchCollection() {
        this.props.searchCollection(this.state.movieName);
    }
    onClearSearch() {
        this.props.clearSearch();
    }

    render() {

        return (
            <div className="row search-box-container">
                <div className="collection-search-text">
                    Your Movie Collection
                </div>
                <input type="text" className="search-box" value={this.state.movieName}
                       placeholder="Search movie from your collection"
                       onChange={(event) => this.onHandleChange(event)} />
                <button onClick={this.onSearchCollection.bind(this)} className="btn btn-primary search-button">Search</button>
                <button onClick={this.onClearSearch.bind(this)} className="btn btn-primary">Clear Search</button>
                <hr />
            </div>
        );
    }
}