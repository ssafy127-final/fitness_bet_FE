<template>
  <div class="container">
    <article></article>
    <div class="content">
      <RouterView />
    </div>
    <article></article>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1.5fr 7fr 1.5fr;
}
</style>
