import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router";

class UserInfo extends Component{
    state = {
        user:{},
        graphqlError:[],
        isLoading: false,
        forbidden: false,
        error: null
    }
    componentDidMount() {
        axios({
            method: 'POST',
            url:'/graphql',
            headers: { 'Content-Type': 'application/json' },
            mode: "cors",
            data: JSON.stringify({ query: `
                query {
                  user(id: "users/449-A") {
                    ... on User {
                      id
                      message
                    }
                    ... on Error {
                      errorType
                      message
                    }
                  }
                }`
            }),
        })
        .then(res => {
            this.setState({
                user: res.data.data.user
            })
            console.log(this.state)
        }).catch((error) => {
            this.setState({
                error: error
            })

            console.log(this.state.error);
        })
    }

    renderCharacters(){
        if(this.state.isLoading){
            return (
                <li className="collection-item">
                    No Characters Found
                </li>
            )
        }
        if(this.state.user.id) {
            return (
                <li className="collection-item">
                    id: {this.state.user.id}, iLvl: {this.state.user.message}
                </li>
            )
        }
        return (
            <li className="collection-item">
                No User Found
            </li>
        )
    }

    render() {
        if(this.state.error){
            return (
                <div>
                    <Link to='/login' > Login</Link>
                </div>
            )
        }
        return (
            <div>
                <p>
                    User: <span>{this.state.user.id}</span>
                </p>
                <p>
                    Message: <span>{this.state.user.message}</span>
                </p>
            </div>
        )
    }
}

export default UserInfo;