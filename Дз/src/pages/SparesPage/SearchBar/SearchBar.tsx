import "./SearchBar.sass"
import {useSpares} from "../../../hooks/spares/useSpares";
import {Link} from "react-router-dom";
import {useAuth} from "../../../hooks/users/useAuth";

const SearchBar = () => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useSpares()

    const handleChange = (value: string) => {
        setQuery(value)
    }

    return (
        <div className="search-bar-wrapper">

            {is_moderator &&
                <Link to="/spares/create" style={{textDecoration: "none"}}>
                    <button>
                        Добавить авиазапчасть
                    </button>
                </Link>
            }

            <input
                type="text"
                placeholder="Поиск..."
                name="name"
                autoComplete="off"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />

        </div>
    )
}

export default SearchBar;