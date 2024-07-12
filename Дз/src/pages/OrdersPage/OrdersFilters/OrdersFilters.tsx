import "./OrdersFilters.sass"
import DropdownMenu from "../../../components/DropdownMenu/DropdownMenu";
import {ADMIN_STATUSES, USER_STATUSES} from "../../../Consts";
import {useAuth} from "../../../hooks/users/useAuth";
import {useOrders} from "../../../hooks/orders/useOrders";

const OrdersFilters = () => {

    const {is_moderator} = useAuth()

    const {status, setStatus} = useOrders()

    return (
        <div className="filters-wrapper">

            <div className="top-container">

                <h3>Список заказов</h3>

            </div>

            <div className="bottom-container">

                <DropdownMenu
                    width={175}
                    options={is_moderator ? ADMIN_STATUSES : USER_STATUSES}
                    selectedOption={status}
                    setSelectedOption={(id) => {
                        setStatus(id)
                    }}
                />

            </div>

        </div>
    )
}

export default OrdersFilters