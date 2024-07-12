import "./SparesList.sass"
import SearchBar from "./SearchBar/SearchBar";
import {useEffect} from "react";
import SpareCard from "./SpareCard/SpareCard";
import {useSparesFilters} from "../../hooks/useSparesFilters";
import {Response} from "../../Types";
import axios from "axios";

const SparesList = () => {

    const { spares, setSpares, query } = useSparesFilters();

    const searchSpares = async () => {

        const response:Response = await axios(`http://localhost:8000/api/spares/search?&name=${query}`, {
            method: "GET"
        })

        setSpares(response.data)

    }

    useEffect(() => {
        searchSpares()
    }, [query])

    const cards = spares.map(spare  => (
        <SpareCard spare={spare} key={spare.id} />
    ))

    return (
        <div className="cards-list-wrapper">

            <div className="top">

                <h2>Поиск авизапчастей</h2>

                <SearchBar />

            </div>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default SparesList;