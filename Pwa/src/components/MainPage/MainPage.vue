<template>
  <div class="main">
    <div class="header">
      <div class="header_logo">MinecraftBox</div>
    </div>
    <div>
      <router-view></router-view>
    </div>
    <button style="position: absolute; bottom: 10px; right: 10px" @click="$router.push('/stepper')">stepper</button>
    <button style="position: absolute; bottom: 10px; left: 10px" @click="$router.push('/')">Flashlight</button>

  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";
import Flashlight from "../Flashlight/Flashlight.vue";

export default defineComponent({
  name: "MainPage",
  components: {Flashlight},
  data() {

  },
  methods: {

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
    &_logo {
      font-size: 20px;
      margin-bottom: 10px;
      font-family: "Arial Black";
      color: #fff;
    }
  }
</style>