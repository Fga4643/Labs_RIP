import "./SparesTable.sass"
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useQuery} from "react-query";
import {useSpares} from "../../../hooks/spares/useSpares";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import {useNavigate } from "react-router-dom";

const SparesTable = () => {
    const COLUMNS = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Стоимость",
            accessor: "price",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Вес",
            accessor: "weight",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Рейтинг",
            accessor: "rating",
            Cell: ({ value }) => { return value }
        }
    ]

    const {searchSpares, query, queryPageIndex, queryPageSize, totalCount, setSparesPage, setSparesPageSize, setSparesPageTotalCount} = useSpares()

    const navigate = useNavigate()

    const fetchData = async () => {
        const data = await searchSpares()

        if (queryPageIndex * queryPageSize > data["totalCount"]) {
            gotoPage(0)
        }

        return data
    }

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["spares", searchSpares, query, queryPageIndex, queryPageSize],
        () => fetchData(),
        {
            keepPreviousData: true,
        }
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        canNextPage,
        previousPage,
        canPreviousPage,
        gotoPage,
        pageCount,
        pageIndex,
        pageSize,
        prepareRow
    } = useCustomTable(
        "spares",
        COLUMNS,
        queryPageIndex,
        queryPageSize,
        totalCount,
        isSuccess,
        data,
        setSparesPage,
        setSparesPageSize,
        setSparesPageTotalCount
    )

    const openEditSparePage = (spare_id) => {
        navigate(`/spares/${spare_id}/edit`)
    }

    return (
        <div>

            <CustomTable
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                nextPage={nextPage}
                canNextPage={canNextPage}
                previousPage={previousPage}
                canPreviousPage={canPreviousPage}
                gotoPage={gotoPage}
                pageCount={pageCount}
                pageIndex={pageIndex}
                pageSize={pageSize}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditSparePage}
            />

        </div>

    )
}

export default SparesTable