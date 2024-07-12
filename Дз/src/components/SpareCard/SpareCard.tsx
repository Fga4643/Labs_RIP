import "./SpareCard.sass"
import {Link} from "react-router-dom";
import {Spare} from "../../Types";
import {useAuth} from "../../hooks/users/useAuth";
import {useOrder} from "../../hooks/orders/useOrder";


const SpareCard = ({ spare }: {spare:Spare }) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {is_draft, addSpareToOrder, deleteSpareFromOrder} = useOrder()


    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={spare.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {spare.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/spares/${spare.id}`}>
                        Подробнее
                    </Link>

                    {is_authenticated && !is_moderator && location.pathname.includes("spares") && <button onClick={(e) => addSpareToOrder(spare)}>Добавить</button> }
                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("orders") && <button onClick={(e) => deleteSpareFromOrder(spare)}>Удалить</button> }

                </div>

            </div>

        </div>
    )
}

export default SpareCard;