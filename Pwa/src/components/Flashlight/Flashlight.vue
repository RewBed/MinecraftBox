<template>
    <div class="flashlight" @click="toggleItem" :class="{'flashlight--active': active}">
        <img src="./flashlight.webp" alt="flashlight" title="flashlight">
    </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";

const flashLightOn = "flashLight-on";
const flashLightOff = "flashLight-off";

export default defineComponent({
    name: "Flashlight",
    inject: ['$socket'],
    data() {
        return {
            active: false,
            isToggle: false,
            buttonPressAudio: new Audio('https://minecraft-box.zip-ec.ru/audio/Stone_button_press.ogg'),
            buttonUnpressAudio: new Audio('https://minecraft-box.zip-ec.ru/audio/Stone_button_unpress.ogg')
        }
    },
    methods: {
        toggleItem(): void {
            if(this.isToggle) {
                this.isToggle = false;
                if(this.active)
                  this.$socket.socket.send(flashLightOff);
                else
                  this.$socket.socket.send(flashLightOn);
            }
        }
    },
    mounted() {
        this.$socket.socket.onmessage = (event: MessageEvent) => {
            console.log(event.data);
            if (event.data === flashLightOn) {
                this.active = true;
                this.isToggle = true;
                this.buttonPressAudio.play();
            }
            else if (event.data === flashLightOff) {
                this.active = false;
                this.isToggle = true;
                this.buttonUnpressAudio.play()
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