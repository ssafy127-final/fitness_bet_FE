<template>
  <div class="modal-container">
    <h3 class="random">
      <Slot :text="data.nameList" size="150px" :run="run" @changeRunState="run = false" class="slot" />님이 &nbsp;<Slot
        :text="data.missionList"
        :run="run"
        @changeRunState="run = false"
        size="300px"
        class="slot"
      />를(을) &nbsp;
      <Slot :text="data.numList" size="50px" :run="run" @changeRunState="run = false" class="slot" />회(초 안에)
    </h3>
    <h3>할 수 있다?! 없다?!</h3>
    <div class="btn-group">
      <button @click="firstRun" v-if="first">돌리기</button>
      <button @click="retry" v-if="!first">다시 돌리기</button>
      <button @click="$emit('modal')">등록하기</button>
      <button @click="cancel">취소하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Slot from "./Slot.vue";
import axios from "axios";
import { useUserStore } from "@/stores/user";
const data = ref({
  nameList: [],
  missionList: [],
  numList: [],
});
const first = ref(true);
const run = ref(false);
const REST_API_URL = `http://localhost:1219/betting`;
const userStore = useUserStore();
const getData = () => {
  axios.get(`${REST_API_URL}/slot`).then((res) => console.log(res.data));
};
const firstRun = () => {
  getData();
  // axios로 데이터 가져오기
  data.value = {
    nameList: [
      "신땡땡",
      "이땡땡",
      "최땡땡",
      "김땡땡",
      "박땡땡",
      "김땡땡",
      "최땡땡",
      "신땡땡",
      "이땡땡",
      "최땡땡",
      "김땡땡",
      "박땡땡",
      "김땡땡",
      "최땡땡",
      "신땡땡",
      "이땡땡",
      "최땡땡",
      "김땡땡",
      "박땡땡",
      "김땡땡",
      "최땡땡",
    ],
    missionList: [
      "ㅌㅌㅌㅌㅌㅌㅌ",
      "ㅋㅋㅋㅋㅋ",
      "~~~~~",
      "!!!!!",
      "?????",
      "ㅌㅌㅌㅌㅌㅌㅌ",
      "ㅋㅋㅋㅋㅋ",
      "~~~~~",
      "!!!!!",
      "?????",
    ],
    numList: [2, 5, 23, 6, 8, 1, 9, 2, 5, 23, 6, 8, 1, 9],
  };
  first.value = false;
  run.value = true;
};

const emit = defineEmits(["retry", "modal"]);
const retry = () => {
  getData();
  // axios로 데이터 가져오기
  data.value = {
    nameList: [
      "김땡땡",
      "이땡땡",
      "최땡땡",
      "김땡땡",
      "박땡땡",
      "김땡땡",
      "박땡땡",
      "김땡땡",
      "이땡땡",
      "최땡땡",
      "김땡땡",
      "박땡땡",
      "김땡땡",
      "박땡땡",
      "김땡땡",
      "이땡땡",
      "최땡땡",
      "김땡땡",
      "박땡땡",
      "김땡땡",
      "박땡땡",
    ],
    missionList: ["!!!!!", "ㅋㅋㅋㅋㅋ", "~~~~~", "!!!!!", "......", "!!!!!", "ㅋㅋㅋㅋㅋ", "~~~~~", "!!!!!", "......"],
    numList: [2, 5, 23, 6, 8, 1, 31, 2, 5, 23, 6, 8, 1, 31],
  };
  run.value = true;
};
const cancel = () => {
  emit("modal");
  data.value = {
    nameList: [],
    missionList: [],
    numList: [],
  };
  first.value = true;
};
const props = defineProps({
  data: Object,
});
</script>

<style scoped>
h3 {
  display: flex;
  flex-direction: row;
}
.random {
  align-items: center;
}
.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #82d4d9;
  background-color: white;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  gap: 10px;
}
.btn-group {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 10px;
}
.btn-group button {
  padding: 8px 10px;
  margin: 5px;
}
.slot {
  margin: 0 3px;
}
</style>
