import "./Breadcrumbs.sass"
import { Link, useLocation } from "react-router-dom";
import {useSpare} from "../../hooks/useSpare";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";

const Breadcrumbs = () => {

    const location = useLocation()

    let currentLink = ''

    const { spare, setSpare } = useSpare()

    const resetSelectedSpare = () => setSpare(undefined)

    const topics = {
        "spares": "Авиазапчасти",
        "draft": "Заказ",
        "orders": "Заказы",
        "home": "Главная",
        "login": "Вход",
        "register": "Регистрация",
        "profile": "Профиль",
    }

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (Object.keys(topics).find(x => x == crumb))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedSpare}>
                        { topics[crumb] }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('spares/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        {spare?.name}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

    return (
        <div className="breadcrumbs-wrapper">
            <div className="breadcrumbs">

                <div className="crumb">

                    <Link to={"/cities"}>
                        <FaHome className="home-icon" />
                    </Link>

                    <FaChevronRight className="chevron-icon" />

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;