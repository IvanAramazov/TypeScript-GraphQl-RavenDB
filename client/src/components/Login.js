import React, {useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";

function Login() {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: '/login',
            headers: {'Content-Type': 'application/json'},
            data: {
                email: emailInput,
                password: passwordInput
            }
        }).then(res => {
            localStorage.setItem("userId", res.data.id)
            history.push("/");
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit.bind(this)}>
                <label>
                    Email
                </label>
                <input
                    name="email"
                    placeholder="email"
                    type="email"
                    onChange={e => setEmailInput(e.target.value)}
                />
                <label>
                    Password
                </label>
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    onChange={e => setPasswordInput(e.target.value)}
                />
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
}

export default Login;