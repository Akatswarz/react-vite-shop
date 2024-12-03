import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ItemProduct from "./ItemProduct.jsx";
import { getAPI } from "../Components/API.jsx";

function Shop() {
    const { cat } = useParams();
    const [data, setData] = useState({ products: [], isLoading: true });
    const [skip, setSkip] = useState()
    let itemsPage = 6
    let url = `https://dummyjson.com/products/category/${cat}`

    useEffect(() => {
        setSkip(0)
        fetch(url)
            .then(res => res.json())
            .then(kq => setData({ products: kq.products, isLoading: false }))
            .catch(e => console.error(e))
    }, [cat])

    const totalItems = data.products.length
    const totalPages = Math.ceil(totalItems / itemsPage)

    let page = (i) => {
        setSkip(i * itemsPage)
    }

    let sort = (object, order, event) =>{
        event.preventDefault()
        getAPI({url: `${url}?sortBy=${object}&order=${order}`})
        .then(kq => setData({products: kq.products, isLoading: false}))
        .catch(e=>console.error(e))
    }

    return (
        <div>
            {/* Start Content */}
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-3">
                        <h1 className="h2 pb-4">Sort By</h1>
                        <ul className="list-unstyled templatemo-accordion">
                            <li className="pb-3">
                                <h1 className="collapsed d-flex justify-content-between h3 text-decoration-none">
                                    Name
                                </h1>
                                <ul className="collapse show list-unstyled pl-3">
                                    <li><a className="text-decoration-none" onClick={e=>sort('title', 'asc',e)}>Ascending</a></li>
                                    <li><a className="text-decoration-none" onClick={e=>sort('title', 'desc',e)}>Descending</a></li>
                                </ul>
                            </li>
                            <li className="pb-3">
                                <h1 className="collapsed d-flex justify-content-between h3 text-decoration-none">
                                    Price
                                </h1>
                                <ul className="collapse show list-unstyled pl-3">
                                    <li><a className="text-decoration-none" onClick={e=>sort('price', 'asc',e)}>Ascending</a></li>
                                    <li><a className="text-decoration-none" onClick={e=>sort('price', 'desc',e)}>Descending</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                            {data.isLoading ? <Loading /> : data.products.slice(skip, skip + itemsPage).map(v => {
                                return (
                                    <ItemProduct key={v.id} sanpham={v} />
                                )
                            })}
                        </div>
                        <div div="row">
                            <ul className="pagination pagination-lg justify-content-end">
                                {[...Array(totalPages)].map((_, i) => {
                                    return (
                                        <li onClick={() => page(i)} className="page-item disabled" key={i}>
                                            <a className="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0"  >{i + 1}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Content */}
            {/* Start Brands */}
            <section className="bg-light py-5">
                <div className="container my-4">
                    <div className="row text-center py-3">
                        <div className="col-lg-6 m-auto">
                            <h1 className="h1">Our Brands</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                Lorem ipsum dolor sit amet.
                            </p>
                        </div>
                        <div className="col-lg-9 m-auto tempaltemo-carousel">
                            <div className="row d-flex flex-row">
                                {/*Controls*/}
                                <div className="col-1 align-self-center">
                                    <a className="h1" href="#multi-item-example" role="button" data-bs-slide="prev">
                                        <i className="text-light fas fa-chevron-left" />
                                    </a>
                                </div>
                                {/*End Controls*/}
                                {/*Carousel Wrapper*/}
                                <div className="col">
                                    <div className="carousel slide carousel-multi-item pt-2 pt-md-0" id="multi-item-example" data-bs-ride="carousel">
                                        {/*Slides*/}
                                        <div className="carousel-inner product-links-wap" role="listbox">
                                            {/*First slide*/}
                                            <div className="carousel-item active">
                                                <div className="row">
                                                    <div className="col-3 p-md-5">
                                                        <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_01.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_02.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_03.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_04.png" alt="Brand Logo" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*End First slide*/}
                                            {/*Second slide*/}
                                            <div className="carousel-item">
                                                <div className="row">
                                                    <div className="col-3 p-md-5">
                                                        <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_01.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_02.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_03.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_04.png" alt="Brand Logo" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*End Second slide*/}
                                            {/*Third slide*/}
                                            <div className="carousel-item">
                                                <div className="row">
                                                    <div className="col-3 p-md-5">
                                                        <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_01.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_02.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_03.png" alt="Brand Logo" /></a>
                                                    </div>
                                                    <div className="col-3 p-md-5">
                                                        <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_04.png" alt="Brand Logo" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*End Third slide*/}
                                        </div>
                                        {/*End Slides*/}
                                    </div>
                                </div>
                                {/*End Carousel Wrapper*/}
                                {/*Controls*/}
                                <div className="col-1 align-self-center">
                                    <a className="h1" href="#multi-item-example" role="button" data-bs-slide="next">
                                        <i className="text-light fas fa-chevron-right" />
                                    </a>
                                </div>
                                {/*End Controls*/}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*End Brands*/}
        </div>
    )

}
export default Shop

function Loading() {
    return (
        <div className="d-flex justify-content-center">
            <h1>Loading...</h1>
        </div>
    )
}