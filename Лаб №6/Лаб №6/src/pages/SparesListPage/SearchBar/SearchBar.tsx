import "./SearchBar.sass"
import {useSparesFilters} from "../../../hooks/useSparesFilters";

const SearchBar = () => {

    const {query, setQuery} = useSparesFilters()

    const handleChange = (value: string) => {
        setQuery(value)
    }

    return (
        <form className="search-bar-wrapper" action="/api/cities/search" method="GET" onSubmit={(e) => e.preventDefault()} >

            <input
                type="text"
                placeholder="Поиск..."
                name="name"
                autoComplete="off"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />

            <button type="submit">
                Найти
            </button>

        </form>
    )
}

export default SearchBar;