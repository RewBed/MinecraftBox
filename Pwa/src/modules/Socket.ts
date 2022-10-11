export default class Socket {
    static socket: WebSocket;

    static init() : void {
        this.socket = new WebSocket("ws://94.19.77.238:81");

        this.socket.onopen = (e) => {
            console.log("onopen");
            setInterval(() => {
                this.socket.send('___ping___');
            }, 100000);
        };

        this.socket.onclose = (event) => {
            console.log("onclose");
            console.log(event);
        };

        /*this.socket.onerror = (error) => {
            console.log(error.message);
        };*/
    }
}