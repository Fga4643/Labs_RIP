import "./NavMenu.sass"
import {Link} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import {useEffect} from "react";

const NavMenu = () => {

    const {is_authenticated, user_name, auth} = useAuth()

    useEffect(() => {
        auth()
    }, []);

    return (
        <div className="menu-wrapper">

            <Link to="/spares" className="menu-item">
                <span>Авиазапчасти</span>
            </Link>

            {is_authenticated &&
                <Link to="/orders" className="menu-item">
                    <span>Заказы</span>
                </Link>
            }

            {is_authenticated &&
                <Link to="/profile" className="menu-item">
                    <span>Профиль</span>
                </Link>
            }

            {!is_authenticated &&
                <Link to="/login" className="menu-item">
                    <span>Вход</span>
                </Link>
            }

        </div>
    )
}

export default NavMenu;