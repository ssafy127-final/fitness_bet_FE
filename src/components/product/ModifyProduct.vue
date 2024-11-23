<template>
  <div class="modal-container">
    <h3>상품 수정</h3>
    <div class="content">
      <label for="name">상품명</label>
      <input type="text" id="name" v-model="product.name" />
      <label for="name">구매가격</label>
      <input type="number" id="name" v-model="product.price" />
      <label for="name">상품 이미지 주소</label>
      <input type="text" id="name" v-model="product.img" />
      <label for="name">교환 포인트</label>
      <input type="number" id="name" v-model="product.point" />
    </div>
    <div class="btn-group">
      <button class="btn" @click="regist">수정하기</button>
      <button class="btn" @click="cancel">취소하기</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref, watch } from "vue";
const props = defineProps({
  REST_API_URL: String,
  modifyItem: Object,
});
const product = ref({
  id: props.modifyItem.id,
  name: props.modifyItem.name,
  price: props.modifyItem.price,
  img: props.modifyItem.img,
  point: props.modifyItem.point,
});

const emit = defineEmits(["closeModal", "getItemList"]);
const regist = () => {
  if (!product.value.name.trim() || !product.value.price || !product.value.point || !product.value.img) {
    alert("항목 값을 입력해주세요.");
  } else {
    axios
      .put(props.REST_API_URL, product.value)
      .then((res) => {
        if (res.status == 200) {
          alert("수정되었습니다.");
        }
      })
      .then(() => emit("getItemList"))
      .catch((err) => console.log(err));
    emit("closeModal");
    product.value = {
      name: "",
      price: null,
      img: "",
      point: null,
    };
  }
};
const cancel = () => {
  emit("closeModal");
};
onMounted(() => {
  product.value = {
    id: props.modifyItem.id,
    name: props.modifyItem.name,
    price: props.modifyItem.price,
    img: props.modifyItem.img,
    point: props.modifyItem.point,
  };
});
watch(
  () => props.modifyItem,
  (newItem) => {
    if (newItem) {
      product.value = {
        id: newItem.id,
        name: newItem.name,
        price: newItem.price,
        img: newItem.img,
        point: newItem.point,
      };
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #82d4d9;
  background-color: white;
  width: 100%;
  border-radius: 10px;
  padding-bottom: 6rem;
}

h3 {
  font-size: 1.5rem;
  font-weight: bolder;
  margin: 2rem;
}
.content {
  display: grid;
  grid-template-columns: 9rem 15rem;
  grid-template-rows: repeat(1fr, 4);
  row-gap: 1rem;
}
input {
  padding: 5px;
  outline-color: #82d4d9;
  border: 2px solid #ccc;
  border-radius: 5px;
}
.btn-group {
  position: absolute;
  bottom: 10px;
  right: 10px;
  margin: 10px;
  display: flex;
  gap: 1rem;
}
.btn-group button {
  padding: 8px 10px;
  /* margin: 5px; */
}
.btn-group button:hover {
  background-color: #487679;
}
</style>
