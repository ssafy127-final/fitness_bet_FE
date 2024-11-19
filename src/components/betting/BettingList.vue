<template>
  <div>
    <div class="modal" v-show="modalOn">
      <BettingCreate @modal="changeModal" />
    </div>
    <header :class="{ blur: modalOn }">
      <div class="headerL">
        <h3>진행중 배팅</h3>
        <button class="createBtn" @click="createBtn">생성하기</button>
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
    <div class="content" :class="{ blur: modalOn }">
      <BettingListItem v-for="item in filterBettingList" :key="item.id" :betting="item" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import BettingListItem from "./BettingListItem.vue";
import { useBettingStore } from "@/stores/betting";
import BettingCreate from "./modal/BettingCreate.vue";

const selected = ref("total");
const filterBettingList = ref([]);
const modalOn = ref(false);

const createBtn = () => {
  modalOn.value = true;
};

const store = useBettingStore();
const select = (id) => {
  selected.value = id;
  if (id === "total") {
    filterBettingList.value = store.bettingList; // 전체 보기
  } else if (id === "canJoin") {
    filterBettingList.value = store.bettingList.filter((item) => !item.history || item.history === null); // 참여 가능 보기
  } else if (id === "alreadyJoin") {
    filterBettingList.value = store.bettingList.filter((item) => item.history != null); // 참여한 리스트 보기
  }
};
onMounted(() => {
  console.log(store.bettingList);
  //   store.getList();
  select("total");
});

const changeModal = () => {
  modalOn.value = false;
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  width: 65%;
  left: 50%;
  transform: translate(-50%, 5%);
}
.blur {
  opacity: 0.5;
}
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
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 450px;
  overflow-y: auto;
}
</style>
