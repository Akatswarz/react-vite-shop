import { useSelector } from "react-redux";
import ItemCart from "../Components/ItemCart";
import emailjs from "emailjs-com";
import Cookies from "js-cookie";
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
    const cart = useSelector((state) => state.cart)
    let totalPrice = cart.items.reduce((kq, item) => kq += Number(item.itemTotal), 0);


    const username = Cookies.get('username')
    let sendEmail = (e) => {
        e.preventDefault();
        const order = {
            to_name: username,
            from_name: "akatswarz@gmail.com",
            message: "Cảm ơn bạn đã mua sản phẩm của chúng tôi",
        };

        emailjs
            .send(
                "service_a04c596",
                "template_1nv0k48",
                order,
                "Bz-sk5oCCOipn3TMx"
            )
            .then(
                (response) => {
                    toast.success('Gửi email thành công', {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        theme: "dark",
                        transition: Flip
                    });
                },
                (error) => {
                    console.error("Failed to send email:", error);
                }
            );
    };

    return (
        <section className="h-100 h-custom" style={{ backgroundColor: '#d2c9ff' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div className="card card-registration card-registration-2" style={{ borderRadius: 15 }}>
                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0">Shopping Cart</h1>
                                                <h6 className="mb-0 text-muted">{cart.items.length} items</h6>
                                            </div>

                                            {cart.items.map(i => <ItemCart key={i.id} data={i} />)}

                                            <hr className="my-4" />
                                            <div className="pt-5">
                                                <h6 className="mb-0"><a href="#!" className="text-body"><i className="fas fa-long-arrow-alt-left me-2" />Back to shop</a></h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 bg-body-tertiary">
                                        <div className="p-5">
                                            <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                            <hr className="my-4" />
                                            <h5 className="text-uppercase mb-3">Give code</h5>
                                            <div className="mb-5">
                                                <div data-mdb-input-init className="form-outline">
                                                    <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="form3Examplea2">Enter your code</label>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="d-flex justify-content-between mb-5">
                                                <h5 className="text-uppercase">Total price</h5>
                                                <h5>€ {totalPrice.toFixed(2)}</h5>
                                            </div>
                                            <a href="" data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-block btn-lg" data-mdb-ripple-color="dark" onClick={e => sendEmail(e)}>Checkout</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />;
        </section>

    )
}

export default Cart;