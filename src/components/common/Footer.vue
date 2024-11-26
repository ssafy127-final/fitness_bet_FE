<template>
  <div class="container">
    <h4>© 2024. <span @click="bettingStore.changeMode">So Kyu T</span>. All rights reserved.</h4>
  </div>
</template>

<script setup>
import { useBettingStore } from "@/stores/betting";

const bettingStore = useBettingStore();
</script>

<style scoped>
.container {
  height: 30px;
  background-color: #607180;
  text-align: center;
  color: white;
}
h4 {
  line-height: 30px;
}
</style>
