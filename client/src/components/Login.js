import React, {Component} from 'react';
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: ''
        };
    }


    handleSubmit(event){
        event.preventDefault();
        axios({
            method: 'POST',
            url: '/login',
            headers: {'Content-Type': 'application/json'},
            data: {
                email: this.state.email,
                password: this.state.password
            }
        }).then(res => {
            this.props.history.push("/");
            console.log(res);
        }).catch(err =>{
            console.log("Error from fetch login: " + err);
        })
    }

    render() {
        return (
            <form ref="form" onSubmit={this.handleSubmit.bind(this)}>
                <label>
                    Email
                    <input
                        name="email"
                        type="text"
                        value={this.state.email}
                        onChange={event => {this.setState({email: event.target.value })}} />
                </label>
                <label>
                    Password
                    <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={event => {this.setState({password: event.target.value })}} />
                </label>
                <button type="submit">Login</button>
            </form>
        );
    }
}

export default Login;