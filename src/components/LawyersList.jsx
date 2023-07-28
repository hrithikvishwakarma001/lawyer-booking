import React from "react";

import {
	Table,
	TableContainer,
	TableFooter,
	TablePagination,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	Paper,
} from "@mui/material";

import { DragDropContext,  Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import * as Types from "../redux/lawyersReducer/actionTypes";
import DraggableRow from "./DraggableRow";
import { StyledTableCell } from "../constants";
import { TablePaginationActions } from "./Pagination";

export default function LawyersList({ lawyersList }) {
	const columns = [
		{ text: "Name" },
		{ text: "Speciality" },
		{ text: "Available Time" },
		{ text: "Firms" },
		{ text: "Phone Number" },
		{ text: "Address" },
		{ text: "Is Booked" },
	];

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows =
		rowsPerPage -
		Math.min(rowsPerPage, lawyersList.length - page * rowsPerPage);

	const dispatch = useDispatch();

	const handleDragEnd = (result) => {
		if (!result.destination) return;
		const reorderedRows = Array.from(lawyersList);
		const [removed] = reorderedRows.splice(result.source.index, 1);
		reorderedRows.splice(result.destination.index, 0, removed);
		dispatch({ type: Types.DATA_REORDER_DRAGG, payload: reorderedRows });
	};


	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId='table'>
				{(provided) => (
					<TableContainer
						component={Paper}
						ref={provided.innerRef}
						{...provided.droppableProps}>
						<Table
							sx={{ minWidth: 700 }}
							aria-label='customized table'>
							<TableHead>
								<TableRow>
									{columns.map((column, index) => (
										<StyledTableCell key={index}>
											{column.text}
										</StyledTableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{lawyersList
									.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
									)
									.map((row, index) => (
										<DraggableRow row={row} index={index} />
									))}
								{provided.placeholder}
							</TableBody>
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={5} />
								</TableRow>
							)}
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[
											5,
											10,
											25,
											{ label: "All", value: -1 },
										]}
										colSpan={5}
										count={lawyersList.length}
										rowsPerPage={rowsPerPage}
										page={page}
										SelectProps={{
											inputProps: {
												"aria-label": "rows per page",
											},
											native: true,
										}}
										onPageChange={handleChangePage}
										onRowsPerPageChange={
											handleChangeRowsPerPage
										}
										ActionsComponent={
											TablePaginationActions
										}
									/>
								</TableRow>
							</TableFooter>
						</Table>
					</TableContainer>
				)}
			</Droppable>
		</DragDropContext>
	);
}
