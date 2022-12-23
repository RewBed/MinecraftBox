<template>
  <div class="main">
    <div class="header">
      <div class="header_logo">MinecraftBox</div>
      <div class="header_connection" :class="{'header_connection--connection': isConnection}">
        <i class="fa fa-wifi" aria-hidden="true"></i>
      </div>
    </div>
    <div>
      <Cubes />
      <!-- <router-view></router-view> -->
    </div>
<!--    <button style="position: absolute; bottom: 10px; right: 10px" @click="$router.push('/stepper')">stepper</button>
    <button style="position: absolute; bottom: 10px; left: 10px" @click="$router.push('/')">Flashlight</button>-->
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import Cubes from "../Cubes/Cubes.vue";

export default defineComponent({
  name: "MainPage",
  inject: ['$socket'],
  components: {Cubes},
  data() {
    return {
      isConnection: false
    }
  },
  mounted() {
    this.$socket.event.addEventListener('open', () => {
      this.isConnection = true;
    });

    this.$socket.event.addEventListener('close', () => {
      this.isConnection = false;
    });
  },
  methods: {
    start() {
      console.log('start');
    }
  }
});
</script>

<style lang="scss" scoped>
  .main {
    background-image: url(../../assets/bg.jpg);
    height: 100%;
    padding: 10px;
    background-size: contain;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &_connection {
      color: red;
      font-size: 20px;
      &--connection {
        color: green;
      }
    }
    &_logo {
      font-size: 20px;
      margin-bottom: 10px;
      font-family: "Arial Black", serif;
      color: #fff;
    }
  }
</style>