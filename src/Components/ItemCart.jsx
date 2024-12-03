import { useDispatch } from "react-redux"
import { addUpdateItem, removeItem } from "./Reduce/CartSlice.js"

function ItemCart({ data }){

    const dispatch = useDispatch()

    let thayDoiSoLuong = (event) => {
        event.preventDefault();
        let value = event.target.value - data.quantity;
        dispatch(addUpdateItem({ id: data.id, price: data.price, quantity: value }));
    }

    let xoaSanPham = (event) => {
        event.preventDefault();
        dispatch(removeItem({ id: data.id }))
    }
    

    return (
        <>
            <hr className="my-4" />
            <div className="row mb-4 d-flex justify-content-between align-items-center">
                <div className="col-md-2 col-lg-2 col-xl-2">
                    <img src={data.image} className="img-fluid rounded-3" alt="Cotton T-shirt" />
                </div>
                <div className="col-md-3 col-lg-3 col-xl-4">
                    <h6 className="text-muted">{data.name}</h6>
                    <h6 className="mb-0">Cotton T-shirt</h6>
                </div>
                <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <input id="form1" min={1} name="quantity" type="number" className="form-control form-control-sm" value={data.quantity} onChange={thayDoiSoLuong}/>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <h6 className="mb-0">€ {data.itemTotal.toFixed(2)}</h6>
                </div>
                <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                    <a href="#" className="text-muted" onClick={(e)=> { if (window.confirm('Bán có chắc muốn xóa sản phẩm?')) xoaSanPham(e) }}><i className="fas fa-times" /></a>
                </div>
                
            </div>
        </>
    )
}

export default ItemCart