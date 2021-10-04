import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./components/header";
import App from "./components/App";

const Root = () => {
    return (
        <Router>
            <Header/>
            <hr/>
            <App/>
        </Router>
    )
};

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
);