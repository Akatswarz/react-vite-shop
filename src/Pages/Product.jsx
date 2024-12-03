import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import Loading from './Loading';

const Product = () => {
    //React-Slider
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    //Slider

    const [data, setData] = useState({ item: [], isLoading: true })
    const [mainImage, setMainImage] = useState(null);
    const [related, setRelated] = useState([])
    let { id, cat } = useParams()

    useEffect(() => {
        setMainImage(null)
        setData({isLoading: true})
        fetch(`https://dummyjson.com/products/category/${cat}`)
            .then(res => res.json())
            .then(kq => {
                setData({ item: kq.products.filter(p => p.id === parseInt(id)), isLoading: false })
                setRelated(kq.products.filter(p => p.id !== parseInt(id)))
            })
            .catch(e => console.error(e))
    }, [id])

    let mainImg = (i) => {
        setMainImage(data.item[0].images[i]);
    }
    
    return (
        <div>
            {/* Open Content */}
            <section className="bg-light">
                <div className="container pb-5">
                    <div className="row">
                        {data.isLoading ? <Loading /> :
                            <>
                                <div className="col-lg-5 mt-5">
                                    <div className="card mb-3">
                                        <img className="card-img img-fluid" src={mainImage ?? data.item[0].thumbnail} alt="Card image cap" id="product-detail" />
                                    </div>
                                    <div className="row">
                                        {/*Start Carousel Wrapper*/}
                                        <div id="multi-item-example" className="col-10 carousel slide carousel-multi-item" data-bs-ride="carousel">
                                            {/*Start Slides*/}
                                            <div className="carousel-inner product-links-wap" role="listbox">
                                                <div className="carousel-item active">
                                                    <div className="row">
                                                        {data.item[0].images.map((x, i) => {
                                                            return (
                                                                <div className="col-4">
                                                                    <img className="card-img img-fluid" src={x} onClick={_ => mainImg(i)} />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            {/*End Slides*/}
                                        </div>
                                        {/*End Carousel Wrapper*/}
                                    </div>
                                </div>
                                <div className="col-lg-7 mt-5">
                                    <div className="card">
                                        <div className="card-body">
                                            <h1 className="h2">{data.item[0].title}</h1>
                                            <p className="h3 py-2">$ <span>{data.item[0].price}</span></p>
                                            <p className="py-2">
                                                <i className="fa fa-star text-warning" />
                                                <i className="fa fa-star text-warning" />
                                                <i className="fa fa-star text-warning" />
                                                <i className="fa fa-star text-warning" />
                                                <i className="fa fa-star text-secondary" />
                                                <span className="list-inline-item text-dark">Rating 4.8 | 36 Comments</span>
                                            </p>
                                            <ul className="list-inline">
                                                <li className="list-inline-item">
                                                    <h6>Brand:</h6>
                                                </li>
                                                <li className="list-inline-item">
                                                    <p className="text-muted"><strong>{data.item[0].brand}</strong></p>
                                                </li>
                                            </ul>
                                            <h6>Description:</h6>
                                            <p>{data.item[0].description}</p>
                                            <h6>Specification:</h6>
                                            <ul className="list-unstyled pb-3">
                                                <li>Lorem ipsum dolor sit</li>
                                                <li>Amet, consectetur</li>
                                                <li>Adipiscing elit,set</li>
                                                <li>Duis aute irure</li>
                                                <li>Ut enim ad minim</li>
                                                <li>Dolore magna aliqua</li>
                                                <li>Excepteur sint</li>
                                            </ul>
                                            
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </section>
            {/* Close Content */}
            {/* Start Article */}
            <section className="py-5">
                <div className="container">
                    <div className="row text-left p-2 pb-3">
                        <h4>Related Products</h4>
                    </div>
                    {/*Start Carousel Wrapper*/}
                    <div className="slider-container">
                        <Slider {...settings}>
                            {related.map((v, i) => {
                                return (
                                    <div className="p-2 pb-3" key={i}>
                                        <div className="product-wap card rounded-0">
                                            <div className="card rounded-0">
                                                <img className="card-img rounded-0 img-fluid" src={v.thumbnail} />
                                                <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                                                    <ul className="list-unstyled">
                                                        <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart" /></a></li>
                                                        <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye" /></a></li>
                                                        <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus" /></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <Link to={`/${v.category}/${v.id}`} className="h3 text-decoration-none">{v.title}</Link>
                                                <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                                                    <li className="pt-2">
                                                        <span className="product-color-dot color-dot-red float-left rounded-circle ml-1" />
                                                        <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1" />
                                                        <span className="product-color-dot color-dot-black float-left rounded-circle ml-1" />
                                                        <span className="product-color-dot color-dot-light float-left rounded-circle ml-1" />
                                                        <span className="product-color-dot color-dot-green float-left rounded-circle ml-1" />
                                                    </li>
                                                </ul>
                                                <ul className="list-unstyled d-flex justify-content-center mb-1">
                                                    <li>
                                                        <i className="text-warning fa fa-star" />
                                                        <i className="text-warning fa fa-star" />
                                                        <i className="text-warning fa fa-star" />
                                                        <i className="text-warning fa fa-star" />
                                                        <i className="text-muted fa fa-star" />
                                                    </li>
                                                </ul>
                                                <p className="text-center mb-0">$ <span>{v.price}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </section>
            {/* End Article */}
        </div>
    )

}

export default Product
