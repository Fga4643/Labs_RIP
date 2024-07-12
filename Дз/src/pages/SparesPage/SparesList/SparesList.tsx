import {useSpares} from "../../../hooks/spares/useSpares";
import SpareCard from "../../../components/SpareCard/SpareCard";
import "./SparesList.sass"
import {useEffect, useState} from "react";

const SparesList = () => {

    const [fetching, setFetching] = useState(true)

    const { spares, query, searchSpares, setSpares, queryPageIndex, setSparesPage } = useSpares()

    const pageSize = 8

    useEffect(() => {
        if (fetching) {

            searchSpares(queryPageIndex, pageSize).then(data => {
                setSpares([...spares, ...data["spares"]])
                setSparesPage(queryPageIndex + 1)
            }).finally(() => setFetching(false))

        }
    }, [fetching])

    useEffect(() => {
        setSpares([])
        setSparesPage(0)
        setFetching(!fetching)
    }, [query])

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler)
        return function () {
            document.removeEventListener("scroll", scrollHandler)
        }
    }, [])

    const scrollHandler = async (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200) {
            setFetching(true)
        }
    }

    const cards = spares.map(spare => (
        <SpareCard spare={spare} key={spare.id}/>
    ))

    return (
        <div className="bottom">

            { cards }

        </div>
    )
}

export default SparesList