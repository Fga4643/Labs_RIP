import "./OrderConstructor.sass"
import {useDraftOrder} from "../../hooks/useDraftOrder";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useToken} from "../../hooks/useToken";
import axios from "axios";
import {Response} from "/src/Types";

const OrderConstructor = () => {

    const {order, setOrder} = useDraftOrder()

    const {access_token} = useToken()

    const fetchDraftOrder = async () => {

        const response: Response = await axios(`http://localhost:8000/api/orders/draft/`, {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'authorization': access_token
            },
        })

        if (response.status != 404)
        {
            setOrder(response.data)
        }

    }

    useEffect(() => {
        fetchDraftOrder()
    }, [])

    return (
        <Link to="/orders/draft/" className="lesson-constructor-container">
            <span className="title">Новый заказ</span>
            {order?.spares.length > 0 && <span className="badge">{order?.spares.length}</span>}
        </Link>
    )
}

export default OrderConstructor