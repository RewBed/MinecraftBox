export default class SocketApi {
    public socket: WebSocket;
    private pingTimer: number = 0;

    private pingInterval: number = 2000;
    private pingCode: string = '__ping__';

    public event: HTMLDivElement;

    constructor(url: string) {
        this.socket = new WebSocket(url);
        this.connect(url);
        this.event = document.createElement('div');
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
            this.event.dispatchEvent(new CustomEvent('open'));
            this.pingTimer = setInterval(() => this.socket.send(this.pingCode), this.pingInterval);
        });

        this.socket.addEventListener('close', () => {

            this.event.dispatchEvent(new CustomEvent('close'));

            clearInterval(this.pingTimer);
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
}