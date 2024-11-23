<template>
  <div class="store-item">
    <img :src="props.item.img" :alt="props.item.name" />
    <h3>{{ props.item.name }}</h3>
    <p>{{ props.item.point }} Point</p>
    <button class="change-btn" @click="modify" v-if="userStore.loginUser.id === 'admin'">수정하기</button>
    <button class="delete-btn" @click="deleteItem" v-if="userStore.loginUser.id === 'admin'">삭제하기</button>
    <button class="change-btn" @click="change" v-else>교환하기</button>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import axios from "axios";

const userStore = useUserStore();
const props = defineProps({
  item: Object,
  REST_API_URL: String,
});

const change = () => {
  if (confirm("교환하시겠습니까?")) {
    if (userStore.loginUser.currentPoint < props.item.point) {
      alert("보유포인트가 부족합니다.");
    } else {
      axios
        .post(`${props.REST_API_URL}/change`, {
          userId: userStore.loginUser.id,
          productId: props.item.id,
          point: props.item.point,
        })
        .then((res) => {
          if (res.status == 200) {
            userStore.restoreLogin();
            alert("상품이 신청되었습니다.");
          }
        })
        .catch((err) => console.log(err));
    }
  }
};
const emit = defineEmits(["openModifyModal", "getItemList"]);
const modify = () => {
  emit("openModifyModal", props.item.id);
};
const deleteItem = () => {
  if (confirm("삭제하시겠습니까?")) {
    axios
      .put(props.REST_API_URL, { ...props.item, delYn: 1 })
      .then((res) => {
        if (res.status == 200) {
          emit("getItemList");
          alert("삭제되었습니다.");
        }
      })
      .catch((err) => console.log(err));
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
.delete-btn:hover {
  background-color: black;
  color: white;
}
.delete-btn {
  background-color: rgb(244, 168, 98);
  color: black;
  padding: 5px 10px;
  font-weight: 600;
}
</style>
