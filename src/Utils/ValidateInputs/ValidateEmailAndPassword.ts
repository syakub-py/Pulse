

export default function validateEmailAndPassword(username: string, password: string, requirements: PasswordRequirement[]): boolean {
	const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

	if (!username || !password) {
		alert("Please fill out all fields.");
		return false;
	}
	if (!emailRegex.test(username)) {
		alert("Please enter a valid email address.");
		return false;
	}
	if (!requirements.every(requirement => requirement.fulfilled)) {
		alert("Make sure the password meets all requirements.");
		return false;
	}
	return true;
};
