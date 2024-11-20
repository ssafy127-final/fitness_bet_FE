<template>
  <div class="container">
    <div class="side" :class="{ change: counter }">
      <p>포</p>
      <p>인</p>
      <p>트</p>
    </div>
    <div class="content">
      <StoreItem v-for="item in storeItem" :item="item" :key="item.id" />
    </div>
    <div class="side" :class="{ change: counter }">
      <p>교</p>
      <p>환</p>
      <p>소</p>
    </div>
  </div>
</template>

<script setup>
import StoreItem from "@/components/point/StoreItem.vue";
import { onMounted, onUnmounted, ref } from "vue";

const counter = ref(false);
let intervalId = null;

onMounted(() => {
  getItemList();
  intervalId = setInterval(() => {
    counter.value = !counter.value;
  }, 100);
});

const storeItem = ref([]);
const getItemList = () => {
  // axios
  let id = 0;
  storeItem.value = [
    {
      id: id++,
      name: "바나 아아",
      price: 1800,
      img: "https://www.banapresso.com/from_open_storage?ws=fprocess&file=banapresso/menu/img_aa618eecef95.png",
      delYn: 0,
      point: 1000,
    },
    {
      id: id++,
      name: "바나 라떼",
      price: 2300,
      img: "https://www.banapresso.com/from_open_storage?ws=fprocess&file=banapresso/menu/img_0a2935abe540.png",
      delYn: 0,
      point: 2000,
    },
    {
      id: id++,
      name: "바나 초코쉐이크",
      price: 4500,
      img: "https://www.banapresso.com/from_open_storage?ws=fprocess&file=banapresso/menu/img_0f4de72e3327.png",
      delYn: 0,
      point: 4000,
    },
  ];
};
onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.container {
  background-image: url("/src/assets/img/store_background_color.jpg");
  /* background-image: url("/src/assets/img/store_background_black.jpg"); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-position-y: -40px;
  height: calc(100vh - 130px);
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
.side {
  display: flex;
  flex-direction: column;
  gap: 5.5rem;
  font-weight: 800;
  font-size: 3rem;
  color: red;
}
.change {
  color: black;
}
.container::after {
  content: "";
  position: absolute;
  background: white;
  z-index: -1;
  inset: 0;
  opacity: 0.7;
}
.content {
  height: 100%;
  width: 70%;
  padding: 2.5rem 4rem;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: 1.5rem;
}
</style>
