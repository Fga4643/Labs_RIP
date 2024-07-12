import "./OrderConstructor.sass"
import {useOrder} from "../../hooks/orders/useOrder";
import {Link} from "react-router-dom";
import {useEffect} from "react";

const OrderConstructor = () => {

    const {order, fetchDraftOrder} = useOrder()

    useEffect(() => {
        fetchDraftOrder()
    }, [])

    if (order == undefined) {
        return (
            <div className="order-constructor-container disabled">
                <span className="title">Новый заказ</span>
            </div>
        )
    }

    return (
        <Link to={`/orders/${order.id}`} className="order-constructor-container">
            <span className="title">Новый заказ</span>
            {order.spares.length > 0 && <span className="badge">{order.spares.length}</span>}
        </Link>
    )
}

export default OrderConstructor