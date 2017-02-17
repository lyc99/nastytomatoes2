import React from "react";

export class Search extends React.Component {
    constructor(props) {
        super();
        this.state = {
            movieName: props.movieName,

        };
    }

    onChangeMovieName() {
        this.props.changeMovieName(this.state.movieName);
    }

    onHandleChange(event) {
        this.setState({
            movieName: event.target.value
        });
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <p>{this.props.name}</p>
                <input type="text" className="search-box" value={this.state.movieName}
                       onChange={(event) => this.onHandleChange(event)} />
                <button onClick={this.onChangeMovieName.bind(this)} className="btn btn-primary">Search</button>
            </div>
        );
    }
}