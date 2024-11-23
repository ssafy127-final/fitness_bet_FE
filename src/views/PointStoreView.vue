<template>
  <div>
    <div v-show="modalOn" class="modal">
      <AddProduct @closeModal="closeModal" :REST_API_URL="REST_API_URL" @getItemList="getItemList" />
    </div>
    <div v-show="modifyModalOn" class="modal">
      <ModifyProduct
        @closeModal="closeModal"
        :REST_API_URL="REST_API_URL"
        :modifyItem="modifyItem"
        @getItemList="getItemList"
      />
    </div>
    <div class="container" :class="{ modalOnContainer: modalOn || modifyModalOn }">
      <div class="side" :class="{ change: counter }">
        <p>포</p>
        <p>인</p>
        <p>트</p>
      </div>
      <div class="content">
        <h4 class="myPoint">☆★ 보유 포인트 : {{ userStore.loginUser.currentPoint }} Point ★☆</h4>
        <div class="admin-btn" v-if="userStore.loginUser.id === 'admin'">
          <button @click="addProduct">상품 추가</button>
        </div>
        <StoreItem
          v-for="item in storeItem"
          :item="item"
          :key="item.id"
          @openModifyModal="openModifyModal"
          :REST_API_URL="REST_API_URL"
          @getItemList="getItemList"
        />
      </div>
      <div class="side" :class="{ change: counter }">
        <p>교</p>
        <p>환</p>
        <p>소</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import StoreItem from "@/components/point/StoreItem.vue";
import AddProduct from "@/components/product/AddProduct.vue";
import ModifyProduct from "@/components/product/ModifyProduct.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { onMounted, onUnmounted, ref, watch } from "vue";

const userStore = useUserStore();
const REST_API_URL = `http://localhost:1219/product`;
const modalOn = ref(false);
const modifyModalOn = ref(false);
const counter = ref(false);
const storeItem = ref([]);
const modifyItem = ref({
  id: null,
  name: "",
  price: null,
  img: "",
  point: null,
});
let intervalId = null;
const addProduct = () => {
  modalOn.value = true;
};
const closeModal = () => {
  modalOn.value = false;
  modifyModalOn.value = false;
};
const openModifyModal = (id) => {
  modifyItem.value = storeItem.value.find((item) => item.id === id);
  modifyModalOn.value = true;
};

onMounted(() => {
  getItemList();
  intervalId = setInterval(() => {
    counter.value = !counter.value;
  }, 100);
});

const getItemList = () => {
  axios
    .get(REST_API_URL)
    .then((res) => {
      storeItem.value = res.data;
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};
onUnmounted(() => {
  clearInterval(intervalId);
});

watch(() => storeItem.value);
watch(() => userStore.loginUser.currentPoint);
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
.modalOnContainer {
  opacity: 0.5;
}
.modal {
  position: fixed;
  z-index: 999;
  width: 35%;
  left: 50%;
  top: 15%;
  transform: translate(-50%, 0);
  opacity: 1;
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
.admin-btn {
  position: absolute;
  top: 1rem;
  right: 30%;
}
.admin-btn button {
  padding: 5px 8px;
}
.myPoint {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 24px;
}
</style>
