import "./OrdersPage.sass"
import {OrdersTable} from "./OrdersTable/OrdersTable";
import OrdersFilters from "./OrdersFilters/OrdersFilters";

const OrdersPage = () => {

    return (
        <div className="orders-page-wrapper">
            <OrdersFilters />
            <OrdersTable />
        </div>
    )
}

export default OrdersPage;