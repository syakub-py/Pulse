import ValidateDateInput from "@src/Utils/ValidateInputs/ValidateDateInput";

export default function ValidateLeaseInputs(leaseDetails:Lease) {
	if (!leaseDetails.StartDate) {
		alert("Start date is required");
		return false;
	}

	if (!leaseDetails.EndDate) {
		alert("End date is required");
		return false;
	}

	if (!leaseDetails.MonthlyRent) {
		alert("Monthly rent is required");
		return false;
	} else if (isNaN(Number(leaseDetails.MonthlyRent))) {
		alert("Monthly rent must be a number");
		return false;
	}

	if (!ValidateDateInput(leaseDetails.EndDate) || !ValidateDateInput(leaseDetails.StartDate)) {
		alert("invalid date: ");
		return false;
	}
	return true;
}
