<template>
  <div>
    <header>
      <h3>종료된 배팅</h3>
    </header>
    <div class="content">
      <!-- <BettingListItem v-for="item in store.bettingList" :key="item.id" :betting="item" /> -->
      <BettingListItem v-for="item in bettingList" :key="item.id" :betting="item" finished="true" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BettingListItem from "./BettingListItem.vue";
import { useBettingStore } from "@/stores/betting";

const store = useBettingStore();

onMounted(() => {
  // store에서 axios로 리스트 가져오고 for 문 대상 바꾸기
  store.getFinishedList();
});

//더미
let id = 0;
const bettingList = ref([
  {
    id: id++,
    challengeUser: { name: "김땡땡" },
    mission: { content: "플랭크" },
    missionCnt: 5,
    successCnt: 3,
    failCnt: 7,
    successPoint: 300,
    failPoint: 400,
    result: 1,
    history: { id: 2, choice: 1 },
  },
  {
    id: id++,
    challengeUser: { name: "이땡땡" },
    mission: { content: "팔굽혀펴기" },
    missionCnt: 7,
    successCnt: 8,
    failCnt: 3,
    successPoint: 440,
    failPoint: 200,
    result: -1,
    history: null,
  },
]);
</script>

<style scoped>
h3 {
  margin: 30px 0 20px;
  font-size: 24px;
}
.createBtn {
  background-color: #82d4d9;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;
}
.headerL {
  display: flex;
  gap: 10px;
}
.headerR {
  display: flex;
  flex-direction: row;
  font-size: 14px;
}
.headerR input {
  margin: 0 3px 0 20px;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 450px;
  overflow-y: auto;
}
</style>
