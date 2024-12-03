import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import User from "./User";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { addUpdateItem } from "./Reduce/CartSlice";
import Cookies from 'js-cookie';

function Header() {
    const cart = useSelector((state) => state.cart)
    const [data, setData] = useState({ menu: [], isloading: true })
    const [searchresult, setSearchResult] = useState([]);
    let totalProducts = cart.items.reduce((kq, item) => kq += Number(item.quantity), 0)
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(kQ => setData({ menu: kQ, isloading: false }))
            .catch(e => console.error(e));
    }, [])

    let search = (e) => {
        e.preventDefault();
        let str = e.target.value.trim();
        fetch(`https://dummyjson.com/products/search?q=${str}`)
            .then(res => res.json())
            .then(kq => setSearchResult(kq.products))
            .catch(e => console.error(e));
    }
    
    let addCart = (v, e) => {
        e.preventDefault();
        dispatch(addUpdateItem({ id: v.id, image: v.images[0], name: v.title, price: v.price, quantity: 1 }))
        if (!Cookies.get('username')) {
            alert('Bạn chưa đăng nhập tài khoản')
            return;
        }
    }

    if (!data.isloading) {
        return (
            <div>
                {/* Start Top Nav */}
                <nav className="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block" id="templatemo_nav_top">
                    <div className="container text-light">
                        <div className="w-100 d-flex justify-content-between">
                            <div>
                                <i className="fa fa-envelope mx-2" />
                                <a className="navbar-sm-brand text-light text-decoration-none" href="mailto:info@company.com">info@company.com</a>
                                <i className="fa fa-phone mx-2" />
                                <a className="navbar-sm-brand text-light text-decoration-none" href="tel:010-020-0340">010-020-0340</a>
                            </div>
                            <div>
                                <a className="text-light" href="https://fb.com/templatemo" target="_blank" rel="sponsored"><i className="fab fa-facebook-f fa-sm fa-fw me-2" /></a>
                                <a className="text-light" href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram fa-sm fa-fw me-2" /></a>
                                <a className="text-light" href="https://twitter.com/" target="_blank"><i className="fab fa-twitter fa-sm fa-fw me-2" /></a>
                                <a className="text-light" href="https://www.linkedin.com/" target="_blank"><i className="fab fa-linkedin fa-sm fa-fw" /></a>
                            </div>
                        </div>
                    </div>
                </nav>
                {/* Close Top Nav */}
                {/* Header */}
                <nav className="navbar navbar-expand-lg navbar-light shadow">
                    <div className="container d-flex justify-content-between align-items-center">
                        <Link className="navbar-brand text-success logo h1 align-self-center" to={'/'}>
                            MinhHuy
                        </Link>
                        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                            <div className="flex-fill">
                                <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/"}>Home</Link>
                                    </li>
                                    {data.menu.slice(1, 5).map((v, i) => {
                                        return (
                                            <li key={i} className="nav-item">
                                                <Link className="nav-link" to={`/${v.slug}`}>{v.name}</Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="navbar align-self-center d-flex">
                                <div className="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                                    <div className="input-group">
                                        <input type="text" className="form-control" id="inputMobileSearch" placeholder="Search ..." />
                                        <div className="input-group-text">
                                            <i className="fa fa-fw fa-search" />
                                        </div>
                                    </div>
                                </div>
                                <a className="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal" data-bs-target="#templatemo_search">
                                    <i className="fa fa-fw fa-search text-dark mr-2" />
                                </a>
                                <Link className="nav-icon position-relative text-decoration-none" to={'/cart'}>
                                    <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1" />
                                    <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">{totalProducts}</span>
                                </Link>
                                {<User />}
                            </div>
                        </div>
                    </div>
                </nav>
                {/* Close Header */}
                {/* Modal */}
                <div className="modal fade bg-white" id="templatemo_search" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="w-100 pt-1 mb-5 text-right">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-content modal-body border-0 p-0">
                            <div className="input-group mb-2">
                                <input type="text" className="form-control" id="inputModalSearch" name="q" placeholder="Search ..." onChange={e => search(e)} />
                            </div>
                        </div>
                    </div>
                    <div classname="row justify-content-center" style={{ backgroundColor: '#eee' }} id="searchProducts">
                        <section style={{ backgroundColor: '#eee' }}>
                            {searchresult.map((v, i) => {
                                return (
                                    <div className="container pt-3">
                                        <div className="row justify-content-center">
                                            <div className="col-md-12 col-xl-10">
                                                <div className="card shadow-0 border rounded-3">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                                                <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                                                    <img src={v.thumbnail} className="w-100" />
                                                                    <a href="#!">
                                                                        <div className="hover-overlay">
                                                                            <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }} />
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-lg-6 col-xl-6">
                                                                <h5>{v.title}</h5>
                                                                <div className="d-flex flex-row">
                                                                    <div className="text-danger mb-1 me-2">
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                        <i className="fa fa-star" />
                                                                    </div>
                                                                    <span>{}</span> 
                                                                </div>
                                                                <div className="mt-1 mb-0 small">
                                                                    <p>Brand: <span>{v.brand}</span></p>
                                                                </div>
                                                                <div className="mt-1 mb-0 small">
                                                                    <p>Category: <span>{v.category}</span></p>
                                                                </div>
                                                                <div className="mt-1 mb-0 small">
                                                                    <p>Stock: <span>{v.stock}</span></p>
                                                                </div>
                                                                <p className="text-truncate mb-4">
                                                                    {v.description}
                                                                </p>
                                                            </div>
                                                            <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                                                <div className="d-flex flex-row align-items-center mb-1">
                                                                    <h4 className="mb-1 me-1">$ {v.price}</h4>
                                                                </div>
                                                                <h6 className="text-success">Free shipping</h6>
                                                                <div className="d-flex flex-column mt-4">
                                                                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary btn-sm mt-2" type="button" onClick={e=>addCart(v, e)}>
                                                                        Add to cart
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header



