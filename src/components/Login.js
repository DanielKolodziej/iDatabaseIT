import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const divStyle = {
    marginLeft: '12%',
    marginRight: '12%'
};


const Login = () => {
    const initialState = {username: '', password: ''};
    const [user, setUser] = useState(initialState);

    const handleInputChange = e => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        setUser(initialState);
    }
    return (
        <div style={divStyle}>
            <form className="ui form" onSubmit={onSubmit}>
                <h3 className="ui dividing header">Login</h3> 
                <div className="field">
                    <label>Username:</label>
                    <input type="text"
                           name="username"
                           value={user.username}
                           onChange={handleInputChange}/>
                </div>
                <div className="field">
                    <label>Password:</label>
                    <input type="password"
                           name="password"
                           value={user.password}
                           onChange={handleInputChange}/>
                </div>
                <div className="field">
                    <input
                        type="submit"
                        className="ui primary button"
                        value="Login"/>
                    <Link to={`/`}><button className="ui basic button">Cancel</button></Link>
            </div>
            </form>
        </div>
    )
}

export default Login;