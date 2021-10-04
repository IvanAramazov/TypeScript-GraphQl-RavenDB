import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div>
            <div>
                Graphql Raven DB Development
            </div>
            <hr/>
            <nav>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <Link to="/user">User</Link>
                </div>
                <div>
                    <Link to="/login">Login</Link>
                </div>
            </nav>
        </div>
    )
}