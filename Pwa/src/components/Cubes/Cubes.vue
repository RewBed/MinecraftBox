<script lang="ts">
    import Cube from "./Cube.vue";
    import {defineComponent} from "vue";

    export default defineComponent({
        name: 'App',
        inject: ['$socket'],
        components: {Cube},
        data() {
            return {
                colors: ["#ff0000", "#5fedf8", "#f2ec65", "#3ee873", "#3836f5"],
                activeColor: ""
            }
        },
        methods: {
            active(color: string) : void {
                this.activeColor = color;
                // console.log(this.activeColor);

                let buffer = new ArrayBuffer(16);
                let changeColor = new Uint8Array(buffer);
                changeColor[0] = 3;
                changeColor[1] = 158;
                changeColor[2] = 255;
                changeColor[3] = 96;

                console.log(changeColor)

                this.$socket.socket.send(changeColor);
            },
            isActive(color: string): boolean {
                return this.activeColor == color;
            }
        }
    });
</script>

<template>
    <div class="cubes">
        <Cube v-for="(color, colorIndex) in colors" @click="active(color)" :active="isActive(color)" :background="color" :key="colorIndex" />
    </div>
</template>

<style scoped>
    .cubes {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 10px;
        row-gap: 10px;
        max-width: 720px;
        margin: auto;
    }
</style>