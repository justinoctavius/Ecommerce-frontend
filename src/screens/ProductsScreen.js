import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { saveProduct, listProducts, deleteProduct } from '../actions/productActions';
import { Link } from 'react-router-dom';
import { listCategory, saveCategory, deleteCategory } from '../actions/categoryActions';
import '../styles/productsAdmin.css'
import RegisterScreen from '../screens/RegisterScreen'
import ProductsTable from '../components/tables/productsTable/ProductsTable';
import UsersAminTable from '../components/tables/usersAdminTable/UsersAdminTable';
import { deleteAdmins, listAdmins } from '../actions/adminActions';

export default function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [adminVisible, setAdminVisible] = useState(false);
    const [showProductsModal, setShowProductsModal] = useState(true);
    const [showUsersModal, setShowUsersModal] = useState(false);

    const [newCategory, setNewCategory] = useState('');
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    
    const productList = useSelector(state => state.productList);
    const {products} = productList;
    
    const productSave = useSelector(state => state.productSave);
    const {loading: loadingSave,success: successSave, error: errorSave} = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const {success: successDelete} = productDelete;
    
    const categoryList = useSelector(state => state.categoryList);
    const {loading: loadingCategory ,category: categories} = categoryList;
    
    const categorySave = useSelector(state => state.categorySave);
    const {success: successCategorySave, error: errorCategorySave} = categorySave;
    
    const categoryDelete = useSelector(state => state.categoryDelete);
    const {success: successCategoryDelete, error: errorCategoryDelete} = categoryDelete;
    
    const adminList = useSelector(state => state.adminList);
    const {users} = adminList;
    
    const adminDelete = useSelector(state => state.adminDelete);
    const {success: successDeleteAdmin} = adminDelete;

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            if(successSave){
                setModalVisible(false);
            }
            if(successCategorySave || successCategoryDelete){
                setShowCategoryForm(false)
            }
            dispatch(listProducts());
            dispatch(listCategory());
            dispatch(listAdmins());
        }else{
            props.history.push('/')
        }
    },[successSave, successDelete, successCategorySave, successCategoryDelete, successDeleteAdmin]);
    
    const openModal = (product) => {
        setModalVisible(true);
        setAdminVisible(false);
        setShowProductsModal(false);
        setShowUsersModal(false);

        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setNewCategory(product.category)
        setCountInStock(product.countInStock);
        setDescription(product.description);
    }
    const openAdmin = () => {
        setAdminVisible(true);
        setModalVisible(false);
        setShowProductsModal(false);
        setShowUsersModal(false)
    }

    const openProductsModal = () => {
        setShowProductsModal(true);
        setAdminVisible(false);
        setModalVisible(false);
        setShowUsersModal(false);
    }
    const openUsersModal = () => {
        setShowUsersModal(true);
        setShowProductsModal(false);
        setAdminVisible(false);
        setModalVisible(false);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            _id: id,
            name,
            price,
            image, 
            brand, 
            category: newCategory, 
            countInStock, 
            description
        }));
    }
    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id))
    }
    const addCategory = () => {
        dispatch(saveCategory(newCategory));
    }
    const deleteCategoryHandler = () => {
        dispatch(deleteCategory(newCategory));
    }
    const deleteAdminHandler = (id) => {
        dispatch(deleteAdmins(id));
    }

    return (
        <div className="content content-margined">
            <div className="hover pointer">
                <Link to={'/'} className="link"><i className="fas fa-arrow-left"></i> Back</Link>
            </div>
            <div className="product-header">
                <h3 className="hover pointer" onClick={openProductsModal}>Products</h3>
                <h3 className="hover pointer" onClick={openUsersModal}>Admins</h3>
                <div>
                    <button className="button primary" onClick={() => openModal({})}>Create Product</button>
                    <button className="button secondary" onClick={() => openAdmin()}>Create Admin</button>
                </div>
            </div>
            {adminVisible &&
                <>
                    <RegisterScreen admin={true}></RegisterScreen>
                    <div className="d-flex justify-content-center">
                        <button onClick={() => {setAdminVisible(false); setShowProductsModal(true)}} type="button" className="button secondary">
                            Cancel
                        </button>
                    </div>
                </>
            }
            {modalVisible && 
                <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>{id ? 'Edit' : 'Create'} product <i className="fas fa-pencil-alt"></i></h2>
                        </li>
                        <li>
                            {loadingSave && <div>Loading...</div>}
                            {loadingCategory && <div>loadingCategory...</div>}
                            {errorSave && <div>{errorSave}</div>}
                        </li>
                        <li>
                            <label htmlFor="name">
                                Name:
                            </label>
                            <input value={name} type="text" name="name" id="name" onChange={e => setName(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="price">
                                Price
                            </label>
                            <input value={price} type="text" name="price" id="price" onChange={e => setPrice(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="image">
                                Image
                            </label>
                            <input value={image} type="text" name="image" id="image" onChange={e => setImage(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="brand">
                                Brand
                            </label>
                            <input value={brand} type="text" name="brand" id="brand" onChange={e => setBrand(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="categoryName">
                                Category <i onClick={() => setShowCategoryForm(!showCategoryForm)} className={showCategoryForm ? 'pointer hover fa fa-minus' : 'pointer hover fa fa-plus'}></i>
                            </label>
                            {
                                showCategoryForm && <div>
                                        {errorCategorySave && <p className="error text-center">{errorCategorySave}</p>}
                                        {errorCategoryDelete && <p className="error text-center">{errorCategoryDelete}</p>}
                                        <input value={newCategory} onChange={e => setNewCategory(e.target.value)} type='text' name="categoryName" placeholder="Category Name" />
                                        <i onClick={addCategory} className="hover pointer button fa fa-plus-circle"></i>
                                        <i onClick={deleteCategoryHandler} className="hover pointer button fa fa-trash-alt"></i>
                                </div>
                            }
                            <div className="row">
                                {
                                    categories ? categories.map((ctg) => 
                                        <div className="col">
                                            <label name={ctg.category}>{ctg.category}</label>
                                            <input type="radio" value={ctg.category} onChange={(e) => setNewCategory(e.target.value)} name='category' />
                                        </div>
                                    )
                                    : 'There ins\'t categories'
                                }
                            </div>
                        </li>
                        <li>
                            <label htmlFor="countInStock">
                                Count In Stock
                            </label>
                            <input value={countInStock} type="text" name="countInStock" id="countInStock" onChange={e => setCountInStock(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="description">
                                Description
                            </label>
                            <textarea value={description} name="description" id="description" onChange={e => setDescription(e.target.value)}>
                            </textarea>
                        </li>
                        <li>
                            <button type="submit" className="button primary">
                               {id? 'Update': 'Create'}
                            </button>
                            <button onClick={() => {setModalVisible(false); setShowProductsModal(true)}} type="button" className="button secondary">
                                Cancel
                            </button>
                        </li>
                    </ul>
                </form>
            </div>
            }
            {  showProductsModal &&
                <ProductsTable products={products} 
                               openModal={openModal} 
                               deleteHandler={deleteHandler}>
                </ProductsTable>
            }
            { showUsersModal && users &&
                <UsersAminTable users={users.admins}
                                deleteAdminHandler={deleteAdminHandler}>
                </UsersAminTable>
            }
        </div>
    ) 
}