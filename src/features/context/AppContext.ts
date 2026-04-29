import { createContext } from "react";
import IAppContext from "./model/IAppContext";

const AppContext = createContext<IAppContext>({
    navigate: () => { throw "navigate not implemented"; },
    activeRoute: {page: "home"},
});

export default AppContext;
