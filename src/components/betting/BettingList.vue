<template>
  <div>
    <header>
      <div class="headerL">
        <h3>진행중 배팅</h3>
        <button class="createBtn">생성하기</button>
      </div>
      <div class="headerR">
        <input type="checkbox" id="total" :checked="selected === 'total'" @change="select('total')" />
        <label for="total">전체보기</label>
        <input type="checkbox" id="canJoin" :checked="selected === 'canJoin'" @change="select('canJoin')" />
        <label for="canJoin">참여 가능 배팅 보기</label>
        <input type="checkbox" id="alreadyJoin" :checked="selected === 'alreadyJoin'" @change="select('alreadyJoin')" />
        <label for="alreadyJoin">참여 완료 배팅 보기</label>
      </div>
    </header>
    <!-- <BettingListItem v-for="item in store.bettingList" :key="item.id" :betting="item" /> -->
    <BettingListItem v-for="item in bettingList" :key="item.id" :betting="item" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BettingListItem from "./BettingListItem.vue";
import { useBettingStore } from "@/stores/betting";

const selected = ref("total");

const select = (id) => {
  selected.value = id;
};
const store = useBettingStore();
onMounted(() => {
  store.getList();
});

//더미
let id = 0;
const bettingList = ref([
  {
    id: id++,
    user: { name: "김땡땡" },
    mission: { content: "플랭크" },
    missionCnt: 5,
    successCnt: 3,
    failCnt: 7,
    successPoint: 300,
    failPoint: 400,
  },
]);
</script>

<style scoped>
header {
  margin: 30px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: end;
}
h3 {
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
</style>
