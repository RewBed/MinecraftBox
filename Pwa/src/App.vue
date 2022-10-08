<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Cubes from './components/Cubes/Cubes.vue'
</script>

<template>
  <div class="main">
      <div class="header">
          <div class="header_logo">MinecraftBox</div>
      </div>
      <Cubes />
  </div>
</template>

<style lang="scss" scoped>
    .main {
        background-image: url(./assets/bg.jpg);
        height: 100%;
        padding: 10px;
        background-size: contain;
    }
    .header {
        &_logo {
            font-size: 20px;
            margin-bottom: 10px;
            font-family: "Arial Black";
            color: #fff;
        }
    }
</style>
