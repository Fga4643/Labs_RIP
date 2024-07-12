import "./OrderPage.sass"
import SpareCard from "../SparesListPage/SpareCard/SpareCard";
import {useDraftOrder} from "../../hooks/useDraftOrder";
import axios from "axios";
import {useToken} from "../../hooks/useToken";
import {useNavigate } from "react-router-dom";

const OrderPage = () => {

    const navigate = useNavigate()

    const {order, setOrder} = useDraftOrder()

    const cards = order?.spares.map(spare  => (
        <SpareCard spare={spare} key={spare.id} />
    ))

    const {access_token} = useToken()

    const sendOrder = async () => {

        const response: Response = await axios(`http://localhost:8000/api/orders/${order.id}/update_status_user/`, {
            method: "PUT",
            headers: {
			
                "Content-type": "application/json; charset=UTF-8",
                'authorization': access_token
            }
        })

        if (response.status == 200)
        {
            setOrder(undefined)

            navigate("/orders")
        }
    }

    const deleteOrder = async () => {

        const response: Response = await axios(`http://localhost:8000/api/orders/${order.id}/delete/`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'authorization': access_token
            }
        })

        if (response.status == 200)
        {
            setOrder(undefined)

            navigate("/spares")
        }

    }


    if (order == undefined)
    {
        return (
            <div className="order-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    return (
        <div className="order-page-wrapper">

            <div className="spares-wrapper">
                <div className="top">
                    <h3>Заказанные авиазапчасти</h3>
                </div>

                <div className="bottom">
                    {cards}
                </div>
            </div>

            <div className="buttons-wrapper">

                <button className="order-button" onClick={sendOrder}>Заказать</button>

                <button className="delete-button" onClick={deleteOrder}>Удалить</button>

            </div>


        </div>
    )
}

export default OrderPage;