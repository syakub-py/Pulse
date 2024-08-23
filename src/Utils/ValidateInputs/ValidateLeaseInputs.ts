

export default function ValidateLeaseInputs(leaseDetails:Lease) {
	if (!leaseDetails.StartDate) {
		alert("Start date is required");
		return false;
	} else if (!/^\d{4}-\d{2}-\d{2}$/.test(leaseDetails.StartDate)) {
		alert("Invalid date format. Please use YYYY-MM-DD.");
		return false;
	}

	if (!leaseDetails.EndDate) {
		alert("End date is required");
		return false;
	} else if (!/^\d{4}-\d{2}-\d{2}$/.test(leaseDetails.EndDate)) {
		alert("Invalid date format. Please use YYYY-MM-DD.");
		return false;
	}

	if (!leaseDetails.MonthlyRent) {
		alert("Monthly rent is required");
		return false;
	} else if (isNaN(Number(leaseDetails.MonthlyRent))) {
		alert("Monthly rent must be a number");
		return false;
	}
	return true;
}