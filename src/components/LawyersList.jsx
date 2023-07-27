import { Button, Table } from "@nextui-org/react";
import React from "react";

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

	React.useEffect(() => {
		if (lawyersList) {
			const bookedIndexs = lawyersList
				.map((item) =>
					item.isBooked ? item.id.toString() : null
				)
				.filter((item) => item !== null);
			setIsBookedIndexs(bookedIndexs);
		}
	}, [lawyersList]);

	return (
		<Table
			bordered
			shadow={false}
			color='secondary'
			aria-label='Example pagination  table'
			css={{
				height: "auto",
				minWidth: "100%",
			}}
			disabledKeys={isBookedIndexs}>
			<Table.Header columns={columns}>
				{(column) => (
					<Table.Column key={column.text}>{column.text}</Table.Column>
				)}
			</Table.Header>
			<Table.Body items={lawyersList}>
				{(item) => (
					<Table.Row justify='center' align='center' key={item.id}>
						<Table.Cell>{item.name}</Table.Cell>
						<Table.Cell>{item.speciality}</Table.Cell>
						<Table.Cell>{item.availableTime}</Table.Cell>
						<Table.Cell>{item.firms}</Table.Cell>
						<Table.Cell>{item.phoneNumber}</Table.Cell>
						<Table.Cell>{item.address}</Table.Cell>
						<Table.Cell css={{ padding: "15px 10px" }}>
							{item.isBooked ? (
								<Button auto color='error' rounded disabled >
									Not Available
								</Button>
							) : (
								<Button auto color='secondary' rounded shadow>
									Available
								</Button>
							)}
						</Table.Cell>
					</Table.Row>
				)}
			</Table.Body>

			<Table.Pagination
				shadow
				noMargin
				align='center'
				rowsPerPage={5}
				// onPageChange={(page) => console.log({ page })}
			/>
		</Table>
	);
}
