import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { detailsProduct } from '../actions/productActions';
import '../styles/productDetails.css'
import '../styles/home.css'

export default function ProductScreen(props) {
    const [qty, setQty] = useState(1) 
    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
    }, []);

    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
    }

    return (
        <div>
            <div className="hover pointer">
                <Link to={'/'} className="link"><i className="fas fa-arrow-left"></i> Back</Link>
            </div>
            {loading? <div>Loading...</div>:
             error? <div className='danger font-5'>{error}</div>: 
             <div className="details">
                <div className="details-image">
                    <img src={product.image} alt="product"></img>
                </div>
                <div className="details-tools">
                    <div className="details-info">
                        <ul>
                            <li>
                                <h4>{product.name}</h4>
                            </li>
                            <li>
                                Price: <b>${product.price}<i className="fas fa-money-bill-wave"></i></b>
                            </li>
                            <li className='description'>
                                <b className='row'>Description:</b>
                                <div>{ product.description}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="details-action">
                        <ul>
                            <li>
                                Price:{
                                    <b>${product.price * qty}</b>
                                }
                                <i className="fas fa-wallet"></i>
                            </li>
                            <li>
                                Status: {product.countInStock > 0? <b className="success">In Stock</b>: <b className="error">Unavailable</b> }
                            </li>
                            <li>
                                Qty: {
                                product.countInStock > 0 ? <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                                    {[...Array(product.countInStock).keys()].map(x => {
                                        return <option key={x+1} value={x+1}>{x+1}</option>
                                    })}
                                </select>
                                : '0'
                                }
                            </li>
                            <li>
                                {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary">Add to Cart</button>}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            }
        </div>    
    )
}