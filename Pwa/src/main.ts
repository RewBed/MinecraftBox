import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'font-awesome/css/font-awesome.min.css';
import Router from "./Router";
import Socket from "./plugins/Socket/Socket";

createApp(App)
    .use(Router)
    .use(Socket, "ws://localhost:8081")
    .mount('#app');
