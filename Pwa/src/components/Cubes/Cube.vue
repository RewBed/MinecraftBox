<template>
    <div class="cube" :style="{background: background}">
        <img src="./cube.png" alt="cube" title="cube" />
        <div v-if="!active" class="cube--not-active"></div>
    </div>
</template>

<script setup lang="ts">
    defineProps<{ background: string, active: boolean }>()

</script>

<style scoped lang="scss">
    .cube {
        background: red;
        cursor: pointer;
        position: relative;
        img {
            width: 100%;
            height: 100%;
        }
        &--not-active {
            background: #ddd;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 100;
            top: 0;
            opacity: 0.6;
        }
    }
</style>