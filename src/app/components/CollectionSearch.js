import React from "react";

export class CollectionSearch extends React.Component {
    constructor(props) {
        super();
        this.state = {
            searchString: props.searchString,
        };
    }
    onHandleChange(event) {
        this.setState({
            searchString: event.target.value
        });
        // console.log("handle", this.state.searchString);
    }
    onSearchCollection() {
        console.log("onSearch", this.state.searchString);
        this.props.searchCollection(this.state.searchString);
    }
    onClearSearch() {
        this.setState({
            searchString: ""
        });
        this.props.clearSearch(this.state.searchString);
    }

    render() {

        return (
            <div className="row search-box-container">
                <div className="collection-search-text">
                    Your Movie Collection
                </div>
                <input type="text" className="search-box" value={this.state.searchString}
                       placeholder="Search movie from your collection"
                       onChange={(event) => this.onHandleChange(event)} />
                <button onClick={this.onSearchCollection.bind(this)} className="btn btn-primary search-button">Search</button>
                <button onClick={this.onClearSearch.bind(this)} className="btn btn-primary">Clear Search</button>
                <hr />
            </div>
        );
    }
}