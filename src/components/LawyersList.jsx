import React from "react";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import {
	IconButton,
	Table,
	TableContainer,
	TableFooter,
	TablePagination,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import * as Types from "../redux/lawyersReducer/actionTypes";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
	"&:hover": {
		backgroundColor: "rgba(120, 40, 200,0.1)",
		cursor: "grab",
	},
	"flex-direction": "row",
	"justify-content": "space-between",
	"align-items": "center",
}));

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const initialRows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Cupcake", 305, 3.7, 67, 4.3),
	createData("Gingerbread", 356, 16.0, 49, 3.9),
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
];
function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label='first page'>
				{theme.direction === "rtl" ? (
					<LastPageIcon />
				) : (
					<FirstPageIcon />
				)}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label='previous page'>
				{theme.direction === "rtl" ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='next page'>
				{theme.direction === "rtl" ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label='last page'>
				{theme.direction === "rtl" ? (
					<FirstPageIcon />
				) : (
					<LastPageIcon />
				)}
			</IconButton>
		</Box>
	);
}

export default function LawyersList({ lawyersList }) {
	const [isBookedIndexs, setIsBookedIndexs] = React.useState([]);

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
		// setRows(reorderedRows);
		dispatch({ type: Types.DATA_REORDER_DRAGG, payload: reorderedRows });
	};

	const handleBooking = (id) => {
		console.log(id);
	};

	React.useEffect(() => {
		if (lawyersList) {
			const bookedIndexs = lawyersList
				.map((item) => (item.isBooked ? item.id.toString() : null))
				.filter((item) => item !== null);
			setIsBookedIndexs(bookedIndexs);
		}
	}, [lawyersList]);

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
										<Draggable
											key={row.name}
											draggableId={row.name}
											index={index}>
											{(provided) => (
												<StyledTableRow
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}>
													<StyledTableCell
														component='th'
														scope='row'>
														{row.name}
													</StyledTableCell>
													<StyledTableCell align='left'>
														{row.speciality}
													</StyledTableCell>
													<StyledTableCell align='left'>
														{row.availableTime}
													</StyledTableCell>
													<StyledTableCell align='left'>
														{row.firms}
													</StyledTableCell>
													<StyledTableCell align='left'>
														{row.phoneNumber}
													</StyledTableCell>
													<StyledTableCell align='left'>
														{row.address}
													</StyledTableCell>
													<StyledTableCell>
														{row.isBooked ? (
															<Button
																shadow
																disabled
																auto>
																Not Available
															</Button>
														) : (
															<Button
																shadow
																color='secondary'
																auto>
																Available
															</Button>
														)}
													</StyledTableCell>
												</StyledTableRow>
											)}
										</Draggable>
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
