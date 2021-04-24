import { createContext, useContext } from "react";

export const GlobalContext = createContext();

export function useGlobalContext() {
    return useContext(GlobalContext);
}
