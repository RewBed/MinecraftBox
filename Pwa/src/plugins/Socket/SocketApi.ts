export default class SocketApi {
    public socket: WebSocket;

    constructor(url: string) {
        this.connect(url);
    }

    /**
     * Создания подключения
     *
     * @param url
     * @private
     */
    private connect(url: string) : void {
        this.socket = new WebSocket(url);

        this.socket.addEventListener('open', () => {
            this.onOpen();
        });

        this.socket.addEventListener('close', () => {
            this.onClose();
            this.newConnect();
        });

        this.socket.addEventListener('error', () => {
            this.onError();
        });
    }

    /**
     * Переподключиться
     *
     * @private
     */
    private newConnect() : void {
        console.log('new connect');
        setTimeout(() => {
            this.connect(this.socket.url)
        }, 3000);
    }

    onError() : void {
        console.log('error');
    }

    onOpen() : void {
        console.log('onOpen');
    }

    onClose() : void {
        console.log('onClose');
    }
}