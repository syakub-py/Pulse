import { createContext } from "react";
import {  makeAutoObservable } from "mobx";

export class AppContextClass {
	constructor () {
		makeAutoObservable(this);
	}
}

export const AppContext = createContext(new AppContextClass());
