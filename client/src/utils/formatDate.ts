export const formatDate = (inputDate: string) => {
	var parts = inputDate.split("-");

	// Check if the input date has the correct format
	if (parts.length !== 3) {
		return "Invalid Date Format";
	}

	// Reorder the parts to the desired format
	var day = parts[2];
	var month = parts[1];
	var year = parts[0];

	// Create the output date string in dd/mm/yyyy format
	var outputDate = day + "/" + month + "/" + year;

	return outputDate;
};
