import "./SparesPage.sass"
import SparesFilters from "./SparesFilters/SparesFilters";
import {useAuth} from "../../hooks/users/useAuth";
import SparesTable from "./SparesTable/SparesTable";
import SparesList from "./SparesList/SparesList";

const SparesPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="cards-list-wrapper">

            <SparesFilters />

            {!is_moderator && <SparesList />}
            {is_moderator && <SparesTable />}

        </div>
    )
}

export default SparesPage;