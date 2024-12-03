import { useEffect, useState } from "react"
import ItemProduct from "./ItemProduct";
import { Link } from 'react-router-dom';


function Home() {

    const [data, setData] = useState({ products: [], isLoading: true })

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(kQ => setData({ products: kQ.products, isLoading: false }))
            .catch(e => console.error(e));
        
    }, [])

    return (
        <div>
            {/* Start Banner Hero */}
            <div id="template-mo-zay-hero-carousel" className="carousel slide" data-bs-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to={0} className="active" />
                    <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to={1} />
                    <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to={2} />
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="container">
                            <div className="row p-5">
                                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                                    <img className="img-fluid" src="./assets/img/banner_img_01.jpg" />
                                </div>
                                <div className="col-lg-6 mb-0 d-flex align-items-center">
                                    <div className="text-align-left align-self-center">
                                        <h1 className="h1 text-success"><b>Zay</b> eCommerce</h1>
                                        <h3 className="h2">Tiny and Perfect eCommerce Template</h3>
                                        <p>
                                            Zay Shop is an eCommerce HTML5 CSS template with latest version of Bootstrap 5 (beta 1).
                                            This template is 100% free provided by <a rel="sponsored" className="text-success" href="https://templatemo.com" target="_blank">TemplateMo</a> website.
                                            Image credits go to <a rel="sponsored" className="text-success" href="https://stories.freepik.com/" target="_blank">Freepik Stories</a>,
                                            <a rel="sponsored" className="text-success" href="https://unsplash.com/" target="_blank">Unsplash</a> and
                                            <a rel="sponsored" className="text-success" href="https://icons8.com/" target="_blank">Icons 8</a>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="container">
                            <div className="row p-5">
                                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                                    <img className="img-fluid" src="./assets/img/banner_img_02.jpg" />
                                </div>
                                <div className="col-lg-6 mb-0 d-flex align-items-center">
                                    <div className="text-align-left">
                                        <h1 className="h1">Proident occaecat</h1>
                                        <h3 className="h2">Aliquip ex ea commodo consequat</h3>
                                        <p>
                                            You are permitted to use this Zay CSS template for your commercial websites.
                                            You are <strong>not permitted</strong> to re-distribute the template ZIP file in any kind of template collection websites.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="container">
                            <div className="row p-5">
                                <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
                                    <img className="img-fluid" src="./assets/img/banner_img_03.jpg" />
                                </div>
                                <div className="col-lg-6 mb-0 d-flex align-items-center">
                                    <div className="text-align-left">
                                        <h1 className="h1">Repr in voluptate</h1>
                                        <h3 className="h2">Ullamco laboris nisi ut </h3>
                                        <p>
                                            We bring you 100% free CSS templates for your websites.
                                            If you wish to support TemplateMo, please make a small contribution via PayPal or tell your friends about our website. Thank you.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="prev">
                    <i className="fas fa-chevron-left" />
                </a>
                <a className="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel" role="button" data-bs-slide="next">
                    <i className="fas fa-chevron-right" />
                </a>
            </div>
            {/* End Banner Hero */}
            {/* Start Categories of The Month */}
            <section className="container py-5">
                <div className="row text-center pt-3">
                    <div className="col-lg-6 m-auto">
                        <h1 className="h1">Categories of The Month</h1>
                        <p>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
                <div className="row">
                    {data.products.slice(1,4).map((product,i) => {
                        return (
                            <div className="col-12 col-md-4 p-5 mt-3" key={i}>
                                <Link to={`/${product.category}`}><img src={product.thumbnail} className="rounded-circle img-fluid border" /></Link>
                                <h5 className="text-center mt-3 mb-3">{product.title}</h5>
                                <p className="text-center"><Link to={`/${product.category}`} className="btn btn-success">Go Shop</Link></p>
                            </div>
                        )
                    })}

                </div>
            </section>
            {/* End Categories of The Month */}
            {/* Start Featured Product */}
            <section className="bg-light">
                <div className="container py-5">
                    <div className="row text-center py-3">
                        <div className="col-lg-6 m-auto">
                            <h1 className="h1">Products</h1>
                            <p>
                                Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident.
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        {data.isLoading ? <Loading/>:data.products.slice(0,9).map(v => {
                            return <ItemProduct key={v.id} sanpham={v} />
                        })}
                    </div>
                </div>
            </section>
            {/* End Featured Product */}
        </div>

    )
}

export default Home

function Loading() {
    return (
        <div className="d-flex justify-content-center">
            <h1>Loading...</h1>
        </div>
    )
}

