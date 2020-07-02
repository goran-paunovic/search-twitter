import { useContext } from "react";
import { StoreContext } from "./Provider";

export const useStore = () => useContext(StoreContext);
