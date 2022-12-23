import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import 'font-awesome/css/font-awesome.min.css';
import Router from "./Router";
import Socket from "./plugins/Socket/Socket";

import SocketApi from "./plugins/Socket/SocketApi";

// const pinia = createPinia()

createApp(App)
    // .use(pinia)
    .use(Router)
    // .use(Socket, "ws://94.19.77.238:8081")
    .use(Socket, "ws://192.168.0.114:81")
    .mount('#app');

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $socket: SocketApi;
    }
}