import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

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
	"td,th": {
		border: 0,
	},
	"&:hover": {
		backgroundColor: "rgba(120, 40, 200,0.1)",
		cursor: "grab",
	},
	boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
	height: "40px",
}));

export { StyledTableCell, StyledTableRow };
