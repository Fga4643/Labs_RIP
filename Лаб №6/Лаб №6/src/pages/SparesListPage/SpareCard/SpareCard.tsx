import "./SpareCard.sass"
import {Link} from "react-router-dom";
import {Spare, Response} from "../../../Types";
import {useAuth} from "../../../hooks/useAuth";
import {useToken} from "../../../hooks/useToken";
import {useDraftOrder} from "../../../hooks/useDraftOrder";
import axios from "axios";


const SpareCard = ({ spare }: {spare:Spare }) => {

    const {access_token} = useToken()

    const {is_authenticated} = useAuth()

    const {order, setOrder} = useDraftOrder()



    const addToOrder = async () => {

        const response: Response = await axios(`http://localhost:8000/api/spares/${spare.id}/add_to_order/`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'authorization': access_token
            },
        });

        if (response.status == 200) {
            setOrder(response.data)
        }
    }

    const deleteFromOrder = async () => {
        const response: Response = await axios(`http://localhost:8000/api/orders/${order.id}/delete_spare/${spare.id}/`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'authorization': access_token
            },
        });

        setOrder(response.data)
    }



    const img = `http://127.0.0.1:8000/api/spares/${spare.id}/image/`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={img}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {spare.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/spares/${spare.id}`}>
                        Подробнее
                    </Link>

                    {is_authenticated && location.pathname.includes("spares") && <button onClick={addToOrder}>Добавить</button> }
                    {is_authenticated && location.pathname.includes("draft") && <button onClick={deleteFromOrder}>Удалить</button> }

                </div>

            </div>

        </div>
    )
}

export default SpareCard;