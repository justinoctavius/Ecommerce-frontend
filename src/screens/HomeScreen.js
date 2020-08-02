import React, {useEffect, useMemo} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import '../styles/home.css'
 function HomeScreen(props) {
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
    }, []);

    return (
        loading? <div>Loading...</div>:
        error ? <div className="error">{error}</div> :
        <div>
            <ul className="products">
                {
                    products.map(product => 
                        <li key={product._id}>
                            <div className="product text-center">
                                <Link to={'/product/' + product._id}>
                                    <img className="product-image" src={product.image} alt="product"/>
                                </Link>
                                <div className="product-name">
                            <Link to={'/product/' + product._id} className="link">{product.name}</Link>
                                </div>
                                <div className="product-brand">{product.brand}</div>
                                <div className="product-price success">
                                    {
                                        product.countInStock === 0 ? <b className="error">Unavailable <i className="fas fa-sad-tear"></i></b> : <div>${product.price}  <i className="fas fa-money-bill-wave"></i></div>
                                    }
                                    </div>
                            </div>
                        </li>)
                }
            </ul>
        </div>
    )
}
export default HomeScreen