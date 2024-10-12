declare global {
	interface Todo{
		id?:number,
		PropertyId:number | undefined,
		Title:string,
		Status:string,
		Priority:string,
		Description:string,
		AddedBy:string,
		RecommendedProfessional?:string,
	}
	interface GoogleMapsPlaceResponse{
		name:string,
		vicinity:string,
		rating:number
	}
}

export { };
