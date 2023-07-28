import React from "react";

import { tableCellClasses } from "@mui/material/TableCell";
import { TableRow, TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Draggable } from "react-beautiful-dnd";
import { Button } from "@nextui-org/react";
import { StyledTableCell, StyledTableRow } from "../constants";

const DraggableRow = ({ row, index }) => {
	const handleBooking = (id) => {
		console.log(id);
	};
	return (
		<Draggable key={row.name} draggableId={row.name} index={index}>
			{(provided) => (
				<StyledTableRow
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}>
					<StyledTableCell component='th' scope='row'>
						{row.name}
					</StyledTableCell>
					<StyledTableCell align='left'>
						{row.speciality}
					</StyledTableCell>
					<StyledTableCell align='left'>
						{row.availableTime}
					</StyledTableCell>
					<StyledTableCell align='left'>{row.firms}</StyledTableCell>
					<StyledTableCell align='left'>
						{row.phoneNumber}
					</StyledTableCell>
					<StyledTableCell align='left'>
						{row.address}
					</StyledTableCell>
					<StyledTableCell>
						{row.isBooked ? (
							<Button shadow disabled auto>
								Not Available
							</Button>
						) : (
							<Button
								shadow
								color='secondary'
								auto
								onClick={() => handleBooking(row.id)}>
								Available
							</Button>
						)}
					</StyledTableCell>
				</StyledTableRow>
			)}
		</Draggable>
	);
};

export default DraggableRow;
