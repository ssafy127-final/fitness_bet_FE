<template>
  <div class="modalContainer">
    <h3>결과를 선택해주세요</h3>
    <div class="choice-box">
      <div class="mission" :class="{ selectedSuccess: choice == 1, success: choice != 1 }" @click="selectSuccess">
        미션 성공
      </div>
      <div class="mission" :class="{ selectedFail: choice == -1, fail: choice != -1 }" @click="selectFail">
        미션 실패
      </div>
    </div>
    <div class="btn-group">
      <button @click="submitResult">등록</button>
      <button @click="$emit('closeResultModal')">취소</button>
    </div>
  </div>
</template>

<script setup>
import { useBettingStore } from "@/stores/betting";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
const store = useBettingStore();
const userStore = useUserStore();
const choice = ref(0);
const route = useRoute();
const selectSuccess = () => {
  choice.value = 1;
};
const selectFail = () => {
  choice.value = -1;
};
const emit = defineEmits(["closeResultModal"]);
const submitResult = () => {
  if (choice.value == 0) {
    alert("결과를 선택해주세요.");
  } else {
    if (confirm("결과를 등록하시겠습니까?")) {
      axios
        .put(`${store.REST_API_URL}/${route.params.id}/finish`, { result: choice.value })
        .then((res) => {
          if (res.status == 200) {
            store.getDetailFromBack(route.params.id);
            store.getList(userStore.loginUser.id);
            store.getFinishedList(userStore.loginUser.id);
          }
        })
        .then(() => emit("closeResultModal"));
    }
  }
};
</script>

<style scoped>
.modalContainer {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 0;
  border: 2px solid #82d4d9;
  background-color: white;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  gap: 10px;
  text-align: center;
}
h3 {
  font-size: 1.5rem;
}
.choice-box {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 2rem;
}
.mission {
  padding: 2rem 3rem;
  border: 2px solid #e2e2e2;
  color: #a6a6a6;
  border-radius: 10px;
  cursor: pointer;
}
.success:hover {
  color: #99a7ff;
  border: 2px solid #99a7ff;
}
.selectedSuccess {
  background-color: #99a7ff;
  color: white;
}
.fail:hover {
  color: #fd9ed3;
  border: 2px solid #fd9ed3;
}
.selectedFail {
  background-color: #fd9ed3;
  color: white;
}
.btn-group {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  gap: 1rem;
}
.btn-group button {
  padding: 0.7rem 1.5rem;
}
</style>
