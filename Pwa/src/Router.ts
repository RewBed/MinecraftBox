import { createRouter, createWebHistory } from "vue-router"
import Flashlight from "./components/Flashlight/Flashlight.vue";
import Cubes from "./components/Cubes/Cubes.vue";
import Stepper from "./components/Stepper/Stepper.vue";

const routeInfos = [
    {
        path : "/",
        component : Flashlight
    },
    {
        path : "/cubes",
        component : Cubes
    },
    {
        path : "/stepper",
        component : Stepper
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes : routeInfos
})

export default router;