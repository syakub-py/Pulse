export const PASSWORD_REQUIREMENTS:PasswordRequirement[] = [
	{
		label: "At least 8 characters and less than 50 characters",
		fulfilled:(password)=> password.length >= 8 && password.length <= 50,
	},
	{
		label: "Contains at least one uppercase letter",
		fulfilled:(password)=> /[A-Z]/.test(password),
	},
	{
		label: "Contains at least one lowercase letter",
		fulfilled:(password)=> /[a-z]/.test(password),
	},
	{
		label: "Contains at least one number",
		fulfilled:(password)=> /\d/.test(password),
	},
	{
		label: "Contains at least one special character",
		fulfilled:(password)=> /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password),
	},
];
