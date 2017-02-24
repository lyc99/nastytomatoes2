import React from "react";
import { Link } from "react-router";

export const Header = (props) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <ul className="nav navbar-nav">
                        <Link to="/" className="search-button">{props.homeLink}</Link>
                        <Link to="tv" className="search-button">{props.tvLink}</Link>
                        <Link to="games" className="search-button">Games</Link>
                    </ul>
                </div>
            </div>
        </nav>
    );
};