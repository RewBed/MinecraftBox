<script lang="ts">
import MainPage from "./components/MainPage/MainPage.vue";

import {defineComponent} from "vue";

export default defineComponent({
  name: "App",
  inject: ['$socket'],
  components: {MainPage},
  mounted() {
    console.log('mounted app');

    this.$socket.event.addEventListener('open', () => {
      console.log('socket open');
    });

    this.$socket.event.addEventListener('close', () => {
      console.log('socket close');
    });

    this.$socket.event.addEventListener('message', (event) => {
      console.log(event);
    });
  }
});

</script>

<template>
  <MainPage />
</template>

<style lang="scss" scoped>

</style>
