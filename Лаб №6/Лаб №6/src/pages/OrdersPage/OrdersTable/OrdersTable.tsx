import {Response} from "../../../Types";
import {TableInstance, useTable, usePagination} from "react-table"
import React, {useEffect, useMemo} from "react";
import "./OrdersTable.sass"
import axios from "axios";
import {STATUSES} from "/src/Consts";
import {useToken} from "../../../hooks/useToken";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useOrders} from "../../../hooks/useOrders";
import {useQuery} from "react-query";
import {FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight} from "react-icons/fa6";

export const OrdersTable = () => {

	const COLUMNS = [
		{
			Header: "№",
			accessor: "id"
		},
		{
			Header: "Статус",
			accessor: "status",
			Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
		},
		{
			Header: "Авиазапчасти",
			accessor: "spares",
			Cell: ({ value }) => { return value.map(spare => spare.name).join(', ') }
		},
		{
			Header: "Дата формирования",
			accessor: "date_of_formation",
			Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
		}
	]

	const {access_token} = useToken()



	const {queryPageIndex, queryPageSize, totalCount, setOrdersPage, setOrdersPageSize, setOrdersPageTotalCount} = useOrders()

	const fetchOrdersData = async (page, pageSize) => {

		const offset = page * pageSize

		const response: Response = await axios(`http://localhost:8000/api/orders?offset=${offset}&limit=${pageSize}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				'authorization': `${access_token}`
			}
		})

		return response.data

	}

	const { isLoading, error, data, isSuccess } = useQuery(
		['orders', queryPageIndex, queryPageSize],
		() => fetchOrdersData(queryPageIndex, queryPageSize),
		{
			keepPreviousData: true,
		}
	);

	const tableColumns = useMemo(() => COLUMNS, [])

	const tableInstance = useTable<TableInstance>({
		columns:tableColumns,
		data: isSuccess ? data["orders"] : [],
		initialState: {
			pageIndex: queryPageIndex,
			pageSize: queryPageSize
		},
		manualPagination: true,
		pageCount: isSuccess ? Math.ceil(totalCount / queryPageSize) : null,
	}, usePagination)


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
		state: { pageIndex, pageSize },
		prepareRow,
	} = tableInstance


	useEffect(() => {
		setOrdersPage(pageIndex);
	}, [pageIndex]);

	useEffect(() => {
		setOrdersPageSize(pageSize);
		gotoPage(pageCount - 1);
	}, [pageSize, gotoPage]);

	useEffect(() => {

		if (data != undefined)
		{
			setOrdersPageTotalCount(data["totalCount"])
		}

	}, [data]);


	if (error) {
		return <p>Error</p>;
	}

	if (isLoading) {
		return <p>Loading...</p>;
	}


	return (
		<div className="table-wrapper">

			<table {...getTableProps()} className="orders-table">
				<thead>
				{
					headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map( (column: any) => (
								<th {...column.getHeaderProps()}>
									{column.render('Header')}
								</th>
							))}
						</tr>
					))
				}
				</thead>
				<tbody {...getTableBodyProps()}>
				{
					page.map(row => {
						prepareRow(row)
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map(cell => {
									return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
								})}
							</tr>
						)
					})
				}
				</tbody>
			</table>

			<div className="pagination-wrapper">

				<div className="pagination-container">
					<button className="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
						<FaAnglesLeft />
					</button>

					<button className="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
						<FaAngleLeft />
					</button>

					<div className="links-container">

						{pageIndex >= 3 &&
							<button className="button" onClick={() => gotoPage(0)}>
								{1}
							</button>
						}

						{pageIndex >= 3 &&
							<span>...</span>
						}

						{pageIndex >= 1 &&
                            <button className="button" onClick={() => gotoPage(pageIndex - 1)}>
								{ pageIndex }
                            </button>
						}

						<button className="button selected" onClick={() => gotoPage(pageIndex)}>
							{ pageIndex + 1 }
						</button>

						{pageIndex < pageCount - 1 &&
                            <button className="button" onClick={() => gotoPage(pageIndex + 1)}>
								{ pageIndex + 2 }
                            </button>
						}

						{ pageIndex <= pageCount - 3 &&
							<span>...</span>
						}

						{ pageIndex <= pageCount - 3 &&
							<button className="button" onClick={() => gotoPage(pageCount - 1)}>
								{ pageCount }
							</button>
						}

					</div>

					<button className="button" onClick={() => nextPage()} disabled={!canNextPage}>
						<FaAngleRight />
					</button>

					<button className="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
						<FaAnglesRight />
					</button>

				</div>

			</div>

		</div>
	)
}