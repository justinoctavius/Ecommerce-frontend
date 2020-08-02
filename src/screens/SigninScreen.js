import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';

export default function SigninScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const {loading, userInfo, error} = userSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split('=')[1]:'/';
    
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password))
    }

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Sign-In</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div className="error">{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input type="email" name="email" id="email" onChange={e => setEmail(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password" id="password" name="password" onChange={e => setPassword(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="button primary">
                            Signin
                        </button>
                    </li>
                    <li className="text-center">
                        New to E-commerce?
                    </li>
                    <li>
                        <Link to={redirect === '/' ? 'register': 'register?redirect=shipping'} className="button text-center secondary">
                            Create your E-commerce account
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    ) 
}