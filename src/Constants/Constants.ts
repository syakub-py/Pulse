import {ItemType} from "react-native-dropdown-picker";

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


export const DOCUMENT_TYPES: ItemType<string>[] = [
	{ label: "Driver's License", value: "Driver's License" },
	{ label: "Passport", value: "Passport" },
	{ label: "National Identity Card", value: "National Identity Card" },
	{ label: "Social Security Card", value: "Social Security Card" },
	{ label: "Birth Certificate", value: "Birth Certificate" },
	{ label: "State ID Card", value: "State ID Card" },
	{ label: "Voter Registration Card", value: "Voter Registration Card" },
	{ label: "Military ID", value: "Military ID" },
	{ label: "Permanent Resident Card (Green Card)", value: "Permanent Resident Card (Green Card)" },
];


export const ANALYTICS_TABS = [
	{ key: "income", title: "Income" },
	{ key: "expense", title: "Expense" },
];


export const PROPERTY_TYPES: ItemType<string>[] = [
	{ label: "Single Family Home", value: "Home" },
	{ label: "Vacation Home", value: "Vacation Home" },
	{ label: "Condominium", value: "Condo" },
	{ label: "Multi-Family", value: "Multi-Family" },
	{ label: "Commercial Building", value: "Commercial Building" },
];
