import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';

export default function RegisterScreen(props) {
    const [showError, setShowError] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const {loading, userInfo, error} = userRegister;
    const dispatch = useDispatch();

    let redirect;
    if(props.location){
        redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    }else{
        redirect = '';
    }               

    useEffect(() => {
        if (userInfo) {
            props.history ? props.history.push(redirect) : document.location = '/'
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password === rePassword) {
            if(props.admin){
                dispatch(register(name, email, password,props.admin));
            }else{
                dispatch(register(name, email, password));
            }
        }else{
            setShowError(true)
        }
    }

    return (
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Create an {props.admin && 'Admin'} Account</h2>
                    </li>
                    <li>
                        {loading && <div>Loading...</div>}
                        {error && <div className="error">{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name="name" id="name" onChange={e => setName(e.target.value)} />
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
                        {showError && <p className="error">The password are not the same</p>}
                        <label htmlFor="rePassword">
                            Confirm the password
                        </label>
                        <input type="password" id="rePassword" name="rePassword" onChange={e => setRePassword(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="button primary">
                            Register
                        </button>
                    </li>
                    {!props.admin &&
                        <>
                        <li className="text-center">
                            Already have an account?
                        </li>
                        <li>
                        <Link to={redirect === '/' ? 'signin': 'signin?redirect=shipping'} className="button text-center secondary">Sign-In</Link>
                        </li>
                        </>
                    }
                </ul>
            </form>
        </div>
    ) 
}