import _ from "lodash";

export default function ValidateAddUserInputs(userDetails:User, DocumentPicture:string) {
	if (!userDetails.Name) {
		alert("A Name is required");
		return false;
	}

	if(_.isEmpty(DocumentPicture)){
		alert("Please upload a document");
		return false;
	}

	if (!userDetails.AnnualIncome || isNaN(Number(userDetails.AnnualIncome))) {
		alert("Annual income is required and must be a number");
		userDetails.AnnualIncome = 0;
		return false;
	}

	if (!userDetails.PhoneNumber) {
		alert("Phone number is required");
		return false;
	} else if (!/^\d{3}-\d{3}-\d{4}$/.test(userDetails.PhoneNumber)) {
		alert("Invalid phone number format. Please use XXX-XXX-XXXX.");
		return false;
	}

	if (!userDetails.DateOfBirth) {
		alert("Date of birth is required");
		return false;
	} else if (!/^\d{4}-\d{2}-\d{2}$/.test(userDetails.DateOfBirth)) {
		alert("Invalid date format. Please use YYYY-MM-DD.");
		return false;
	}

	if (!userDetails.SocialSecurity) {
		alert("Social Security Number is required");
		return false;
	} else if (!/^\d{3}-\d{2}-\d{4}$/.test(userDetails.SocialSecurity)) {
		alert("Invalid Social Security Number format. Please use XXX-XX-XXXX.");
		return false;
	}
	return true;
}