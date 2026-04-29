import IRoute from "../../router/model/IRoute";

export default interface IAppContext {
    navigate: (route:IRoute|string) => void,
    activeRoute: IRoute,
}
