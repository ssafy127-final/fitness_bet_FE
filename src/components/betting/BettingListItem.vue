<template>
  <div class="container">
    <div>룰루</div>
    <button class="detail">상세보기</button>
  </div>
</template>

<script setup>
const props = defineProps({
  betting: Object,
});
</script>

<style scoped>
.container {
  border: 2px solid #82d4d9;
  background-color: white;
  border-radius: 10px;
  padding: 7px;
  display: grid;
  grid-template-columns: 1fr 60px;
}
.detail {
  border-radius: 5px;
  padding: 20px 0;
  background-color: #82d4d9;
  color: white;
  border: none;
}
</style>
