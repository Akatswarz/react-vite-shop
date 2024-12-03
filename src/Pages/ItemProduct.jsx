import { useDispatch } from "react-redux"
import { addUpdateItem } from "../Components/Reduce/CartSlice.js";
import { Link } from 'react-router-dom';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";


function ItemProduct({ sanpham }) {

    const dispatch = useDispatch();

    let addCart = (event) => {
        event.preventDefault();
        dispatch(addUpdateItem({ id: sanpham.id, image: sanpham.images[0], name: sanpham.title, price: sanpham.price, quantity: 1 }))
        if (!Cookies.get('username')) {
            alert('Bạn chưa đăng nhập tài khoản')
            return;
        }
        notify()
    }
    const notify = () => {
        toast.success('Thêm thành công', {
            position: "top-center",
            autoClose: 300,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            theme: "dark",
            transition: Flip
        });
    };

    return (
        <div className="col-md-4" key={sanpham.id}>
            <div className="card mb-4 product-wap rounded-0">
                <div className="card rounded-0">
                    <img className="card-img rounded-0 img-fluid" src={sanpham.thumbnail} />
                    <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                        <ul className="list-unstyled">
                            <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart" /></a></li>
                            <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye" /></a></li>
                            <li><a className="btn btn-success text-white mt-2" href="#" onClick={addCart}><i className="fas fa-cart-plus" /></a></li>
                        </ul>
                    </div>
                </div>
                <div className="card-body text-center">
                    <Link to={`/${sanpham.category}/${sanpham.id}`} className="h3 text-decoration-none">{sanpham.title}</Link>
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
                            <i className="text-muted fa fa-star" />
                            <i className="text-muted fa fa-star" />
                        </li>
                    </ul>
                    <p className="text-center mb-0">$ <span>{sanpham.price}</span></p>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ItemProduct