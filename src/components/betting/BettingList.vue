<template>
  <div>
    <div class="modal" v-show="modalOn">
      <BettingCreate @modal="changeModal" />
    </div>
    <header :class="{ blur: modalOn }">
      <div class="headerL">
        <h3 :class="{ dark: store.darkMode }">진행중 배팅</h3>
        <button class="createBtn" @click="createBtn" v-if="userStore.loginUser?.admin == 1">생성하기</button>
      </div>
      <div class="headerR" :class="{ dark: store.darkMode }">
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
      <div
        v-if="filterBettingList.length == 0"
        style="text-align: center; margin-top: 2.5rem"
        :class="{ dark: store.darkMode }"
      >
        현재 진행중인 배팅이 없습니다.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import BettingListItem from "./BettingListItem.vue";
import { useBettingStore } from "@/stores/betting";
import BettingCreate from "./modal/BettingCreate.vue";
import { useUserStore } from "@/stores/user";

const selected = ref("total");
const filterBettingList = ref([]);
const modalOn = ref(false);

const createBtn = () => {
  modalOn.value = true;
};

const store = useBettingStore();
const userStore = useUserStore();
const select = (id) => {
  if (selected.value === id) {
    // 이미 선택된 체크박스를 클릭하면 상태를 강제로 유지
    setTimeout(() => {
      const checkbox = document.getElementById(id);
      if (checkbox) checkbox.checked = true;
    }, 0);
  }
  selected.value = id;
  const list = store.bettingList;
  if (id === "total") {
    filterBettingList.value = list; // 전체 보기
  } else if (id === "canJoin") {
    filterBettingList.value = list.filter((item) => !item.history || item.history === null); // 참여 가능 보기
  } else if (id === "alreadyJoin") {
    filterBettingList.value = list.filter(
      (item) => item.history != null && item.history.player != userStore.loginUser.id
    ); // 참여한 리스트 보기
  }
};
onMounted(async () => {
  await userStore.restoreLogin();
  await store.getList(userStore.loginUser.id);
  select("total");
});

watch(
  () => store.bettingList,
  (newValue) => {
    select(selected.value); // 새 값으로 필터링
  },
  { deep: true }
);
watch(
  () => userStore.loginUser,
  (newValue) => {
    store.getList(newValue.id);
  },
  { deep: true }
);

const changeModal = () => {
  modalOn.value = false;
  select(selected.value);
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
  max-height: calc(100vh - 220px);
  overflow-y: auto;
}
.dark {
  color: white;
}
</style>
