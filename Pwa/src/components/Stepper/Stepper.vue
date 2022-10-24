<template>
  <div>
    <button @mousedown="leftPressed" @touchend="leave" @touchstart="leftPressed" @mouseleave="leave" @mouseup="leave"></button>
    <button @mousedown="rightPressed" @touchend="leave" @touchstart="rightPressed" @mouseleave="leave" @mouseup="leave"></button>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent( {
  name: "Stepper",
  data() {
    return {
      moveInterval: 0
    }
  },
  methods: {
    leftPressed: function (): void {
      this.moveInterval = setInterval(() => {
        console.log('pressed');
        this.$socket.socket.send('left');
      }, 100);
    },
    rightPressed() : void {
      this.moveInterval = setInterval(() => {
        console.log('pressed');
        this.$socket.socket.send('right');
      }, 100);
    },
    leave() : void {
      clearInterval(this.moveInterval);
      this.$socket.socket.send('stop');
    }
  }
})
</script>

<style scoped>
  button {
    width: 50%;
    height: 150px;
  }
</style>