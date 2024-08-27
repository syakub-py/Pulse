


export default function ValidateDateInput(dateString: string) {
	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

	if (!dateRegex.test(dateString)) {
		return false;
	}

	const [year, month, day] = dateString.split("-").map(Number);

	const date = new Date(year, month - 1, day);

	const isValidDate =
		date.getFullYear() === year &&
		date.getMonth() === month - 1 &&
		date.getDate() === day;

	if (!isValidDate) {
		return false;
	}

	const currentDate = new Date();
	const tenYearsAgo = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());
	const tenYearsFromNow = new Date(currentDate.getFullYear() + 10, currentDate.getMonth(), currentDate.getDate());

	return date >= tenYearsAgo && date <= tenYearsFromNow;
}

