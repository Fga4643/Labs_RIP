import "./ProfilePage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import logo from "/src/assets/antony.png"
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {

    const navigate = useNavigate()

    const {is_moderator, user_name, user_email, logOut} = useAuth()

    const doLogOut = async () => {

        await logOut()

        navigate("/spares")
    }

    return (
        <div className="profile-wrapper">

            <img src={logo} className="user-avatar" alt=""/>

            <div className="user-info-wrapper">
                <span>Имя: {user_name}</span>
                <span>Почта: {user_email}</span>
                <span>Статус: {is_moderator ? "Модератор" : "Пользователь"}</span>

                <button onClick={doLogOut}>Выйти</button>
            </div>

        </div>
    )
}

export default ProfilePage;