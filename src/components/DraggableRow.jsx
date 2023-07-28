import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Button } from "@nextui-org/react";
import { StyledTableCell, StyledTableRow } from "../constants";
import { EditLawyerBookingStatus } from "../redux/lawyersReducer/action";
import * as RR from "react-redux";

const DraggableRow = ({ row, index }) => {
	const { lawyers } = RR.useSelector((store) => store.lawyers);
	const dispatch = RR.useDispatch();

	const handleBooking = (id) => {
		dispatch(EditLawyerBookingStatus(id, lawyers));
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
