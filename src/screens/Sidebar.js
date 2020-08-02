import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listCategory } from '../actions/categoryActions';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css'

function Sidebar() {
    const categoryList = useSelector(state => state.categoryList);
    const { category, loading, error } = categoryList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listCategory());
    }, []);

    return (
        loading? <div className="secondary">Loading...</div>:
        error ? <div className="error">{error}</div> :
            <>
            <h3 className="secondary">Categories</h3>
            <ul className="items">
                {
                    category.map((category) => 
                        <li key={category.category}>
                            <Link to={'/category/' + category.category}>{category.category}</Link>
                        </li>
                    )
                }
            </ul>
            </>
        )
}

export default Sidebar
