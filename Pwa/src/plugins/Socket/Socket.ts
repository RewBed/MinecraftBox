import SocketApi from "./SocketApi";

export default {
    install: (app: any, url: string) => {
        let socket: SocketApi = new SocketApi(url);
        // app.config.globalProperties.$socket = socket;
        app.provide('$socket', socket);
    }
}