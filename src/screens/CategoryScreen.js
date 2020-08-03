import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link } from 'react-router-dom';

function CategoryScreen(props) {
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();
    const category = props.match.params.id;
    const categoryProducts = products.filter((product) => product.category === category);
    useEffect(() => {
        dispatch(listProducts());
    }, [category]);

    return (
        loading? <div>Loading...</div>:
        error ? <div>{error}</div> :
        <div>
            <div className="hover pointer">
                <Link to={'/'} className="link"><i className="fas fa-arrow-left"></i> Back</Link>
            </div>
            <ul className="products text-center">
                {
                    categoryProducts.length === 0 ? 
                        <div className="font-5">
                            There aren't products in <b>{category}</b> category
                            <div>
                            <i className="font-10 far fa-tired"></i>
                            </div>
                        </div>
                    : categoryProducts.map((product) => {
                            return (<li key={product._id}>
                                <div className="product">
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
                    )
                }
            </ul>
        </div>
        )
}

export default CategoryScreen
