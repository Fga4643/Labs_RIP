import {useEffect} from "react";
import {useOrder} from "../../hooks/orders/useOrder";
import {useNavigate, useParams} from "react-router-dom"
import SpareCard from "../../components/SpareCard/SpareCard";
import "./OrderPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES} from "../../Consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import {plural, pluralDeliveryDate} from "../../utils/plural";

const OrderPage = () => {

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {order, fetchOrder, sendOrder, deleteOrder, setOrder} = useOrder()

    useEffect(() => {
        if (id != undefined) {
            fetchOrder(id)
        }

        return () => {
            setOrder(undefined)
        };
    }, [])

    if (id == undefined || order == undefined)
    {
        return (
            <div className="order-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendOrder = async() => {
        await sendOrder()
        navigate("/orders")
    }

    const onDeleteOrder = async () => {
        await deleteOrder()
        navigate("/spares")
    }

    const cards = order?.spares.map(spare  => (
        <SpareCard spare={spare} key={spare.id} />
    ))

    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <button className="order-button" onClick={onSendOrder}>Заказать</button>

                <button className="delete-button" onClick={onDeleteOrder}>Удалить</button>

            </div>
        )
    }

    const is_draft = order.status == 1

    const completed = [3, 4].includes(order.status)

    return (
        <div className="order-page-wrapper">

            <div className="spares-wrapper">
                <div className="top">
                    <h3>Заказ №{order.id}</h3>
                </div>

                <div className="order-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == order.status).name}</span>
                    <span>Дата создания: {moment(order.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(order.status) && <span>Дата формирования: {moment(order.date_of_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(order.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                    {is_moderator && <span>Покупатель: {order.owner.name}</span> }
                    {is_moderator && <span>Модератор: {order.moderator.name}</span>}
                    {completed && <span>Дата доставки: {order.delivery_date > 0 ? pluralDeliveryDate(order.delivery_date) : "Нет"}</span>}
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default OrderPage