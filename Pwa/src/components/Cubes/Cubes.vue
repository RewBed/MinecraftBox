<script lang="ts">
    import Cube from "./Cube.vue";
    import {defineComponent} from "vue";

    export default defineComponent({
        name: 'App',
        inject: ['$socket'],
        components: {
            Cube
        },
        data() {
            return {
                colors: ["#ff0000", "#5fedf8", "#f2ec65", "#3ee873", "#3836f5"],
                activeColor: ""
            }
        },
        methods: {
            active(color: string) : void {
                this.activeColor = color;
                console.log(this.activeColor);
                this.$socket.socket.send('me');
            }
        }
    });
</script>

<template>
    <div class="cubes">
        <Cube v-for="(color, colorIndex) in colors" @click="active(color)" :active="color == activeColor" :background="color" :key="colorIndex" />
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