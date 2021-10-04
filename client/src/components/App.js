import React, {useState} from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client';
import {Switch, Route} from "react-router-dom";
import UserInfo from "./UserInfo";
import Login from "./Login";


const link = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin'
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
});

export default function App (){
    return (
        <ApolloProvider client={client}>
            <Switch>
                <Route exact path="/">
                    <p>Home</p>
                </Route>
                <Route exact path="/user">
                    <UserInfo/>
                </Route>
                <Route exact path="/login">
                    <Login/>
                </Route>
            </Switch>
        </ApolloProvider>
    )
}