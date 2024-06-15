import { Context, createContext, useMemo, useContext } from "react";
import { action, makeAutoObservable } from "mobx"

export class AppContextClass {
    constructor() {
        makeAutoObservable(this)
    }
}


export const AppContext = createContext(new AppContextClass());
