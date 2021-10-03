import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
// import { ApolloProvider } from 'react-apollo';
import UserInfo from "./components/UserInfo";
import App from "./components/App";
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import Login from "./components/Login";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <div>
                WoW App Apollo Provider Development
            </div>
            <Router history={hashHistory}>
                <Route path="/user" component={App}>
                    <IndexRoute component={UserInfo}/>
                </Route>
                <Route path="/login" component={App}>
                    <IndexRoute component={Login}/>
                </Route>
            </Router>
        </ApolloProvider>
    )
};

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
);