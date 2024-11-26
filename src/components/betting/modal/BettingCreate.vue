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
      <button @click="regist">등록하기</button>
      <button @click="cancel">취소하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Slot from "./Slot.vue";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { useBettingStore } from "@/stores/betting";
const data = ref({
  nameList: [],
  missionList: [],
  numList: [],
});
const first = ref(true);
const run = ref(false);
const userStore = useUserStore();
const bettingStore = useBettingStore();
const createBetting = ref({
  missionId: "",
  missionCnt: "",
  challenger: "",
});
const generateRandomArray = (getRandomItemFn, count, additionalItems = []) => [
  ...Array.from({ length: count }, getRandomItemFn),
  ...additionalItems,
];
const missionData = ref([]);
const nameData = ref([]);
const getNum = () => {
  return Math.floor(Math.random() * 100 + 1);
};
const getMissionNum = () => {
  return missionData.value[Math.floor(Math.random() * missionData.value.length)];
};
const getNameNum = () => {
  return nameData.value[Math.floor(Math.random() * nameData.value.length)];
};

const getData = async () => {
  await axios.get(`${bettingStore.REST_API_URL}/slot`).then((res) => {
    nameData.value = res.data.users.map((item) => item.name);
    missionData.value = res.data.missions.map((item) => item.content);
  });
  await axios.get(`${bettingStore.REST_API_URL}/create`, { params: { id: userStore.loginUser.id } }).then((res) => {
    data.value.nameList = generateRandomArray(getNameNum, 20, [res.data.challengeUser.name]);
    data.value.missionList = generateRandomArray(getMissionNum, 10, [res.data.mission.content]);
    data.value.numList = generateRandomArray(getNum, 14, [res.data.missionCnt]);

    createBetting.value.missionId = res.data.mission.id;
    createBetting.value.missionCnt = res.data.missionCnt;
    createBetting.value.challenger = res.data.challengeUser.id;
  });
};
const firstRun = async () => {
  await getData();
  first.value = false;
  run.value = true;
};

const emit = defineEmits(["retry", "modal"]);

const retry = async () => {
  await getData();
  run.value = true;
};

const regist = () => {
  if (confirm("배팅을 생성하시겠습니까?")) {
    emit("modal");
    bettingStore.registBet(createBetting.value, userStore.loginUser.id);
    first.value = true;
    data.value = {
      nameList: [],
      missionList: [],
      numList: [],
    };
  }
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
