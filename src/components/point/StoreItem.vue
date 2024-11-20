<template>
  <div class="store-item">
    <img :src="props.item.img" :alt="props.item.name" />
    <h3>{{ props.item.name }}</h3>
    <p>{{ props.item.point }} Point</p>
    <button class="change-btn" @click="change">교환하기</button>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
});

const change = () => {
  if (confirm("교환하시겠습니까?")) {
  }
};
</script>

<style scoped>
.store-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
}
img {
  width: 9rem;
}
p {
  font-weight: 600;
  -webkit-text-stroke: 1.2px rgb(83, 5, 5);
}
.change-btn {
  background-color: yellow;
  color: black;
  padding: 5px 10px;
  font-weight: 600;
}
.change-btn:hover {
  background-color: black;
  color: white;
}
</style>
