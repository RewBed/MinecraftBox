<template>
    <div class="flashlight" @click="toggleItem" :class="{'flashlight--active': active}">
        <img src="./flashlight.webp" alt="flashlight" title="flashlight">
    </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import Socket from "../../modules/Socket";

const flashLightOn = "flashLight-on";
const flashLightOff = "flashLight-off";

export default defineComponent({
    name: "Flashlight",
    data() {
        return {
            active: false
        }
    },
    methods: {
        toggleItem(): void {
            this.active = !this.active;
            if (this.active)
                Socket.socket.send(flashLightOn);
            else
                Socket.socket.send(flashLightOff);
        }
    },
    mounted() {

        Socket.init();
        Socket.socket.onmessage = (event) => {
            if (event.data === flashLightOn) {
                this.active = true;
            }
            else if (event.data === flashLightOff) {
                this.active = false;
            }

        }
    }
})
</script>

<style lang="scss" scoped>
    .flashlight {
        max-width: 400px;
        margin: auto;
        text-align: center;
        filter: grayscale(1);
        &--active {
            filter: grayscale(0);
        }
    }
</style>