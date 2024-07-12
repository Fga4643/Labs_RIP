import "./Header.sass"
import NavMenu from "./NavMenu/NavMenu";
import logo from "/src/assets/icon.png"

const Header = () => {
    return (
        <div className="header-wrapper">

            <div className="left-container">
                <img src={logo} alt="" className="logo"/>
            </div>

            <div className="right-container">
                <NavMenu/>
            </div>

        </div>
    )
}

export default Header;