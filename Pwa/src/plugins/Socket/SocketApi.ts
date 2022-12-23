export default class SocketApi {
    public socket: WebSocket;
    private pingTimer: number = 0;
    private pongTimer: number = 0;

    private pingInterval: number = 2000;
    private pongInterval: number = 2500;

    private maxPongInterval: number = 3000;
    private lastPongTime: number = 0;
    private lastPingTime: number = 0;
    private pongCode: string = '__pong__';
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

            console.log('open');

            // записываем последний pong от сервера
            this.socket.addEventListener('message', (event: MessageEvent) => {
                if(event.data == this.pongCode) {
                    this.lastPongTime = this.getCurrentTime();
                }
                else {
                    this.event.dispatchEvent(new CustomEvent('message', event));
                }
            });

            // ping каждые две секунды
            this.pingTimer = setInterval(() => {
                this.socket.send(this.pingCode);
                this.lastPingTime = this.getCurrentTime();
            }, this.pingInterval);

            this.pongTimer = setInterval(() => {
                if(this.lastPingTime - this.lastPongTime >= this.maxPongInterval)
                    this.socket.close();

            }, this.pongInterval);
        });

        this.socket.addEventListener('close', () => {

            this.event.dispatchEvent(new CustomEvent('close'));

            this.lastPongTime = 0;

            clearInterval(this.pingTimer);
            clearInterval(this.pongTimer);
            this.newConnect();
        });

        this.socket.addEventListener('error', () => {
            this.onError();
        });
    }

    /**
     * Текущие время в секундах
     *
     * @private
     */
    private getCurrentTime(): number {
        return new Date().getTime();
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