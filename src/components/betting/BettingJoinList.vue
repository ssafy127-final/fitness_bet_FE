<template>
  <div class="containerBox">
    <header>
      <h3>참여한 배팅 기록</h3>

      <div class="headerR">
        <input type="checkbox" id="total" :checked="selected === 'total'" @change="select('total')" />
        <label for="total">전체보기</label>
        <input type="checkbox" id="success" :checked="selected === 'success'" @change="select('success')" />
        <label for="success">성공 배팅 보기</label>
        <input type="checkbox" id="fail" :checked="selected === 'fail'" @change="select('fail')" />
        <label for="fail">실패 배팅 보기</label>
      </div>
    </header>
    <div class="table-container">
      <table width="100%">
        <thead>
          <tr>
            <th width="15%">날짜</th>
            <th width="37%">항목</th>
            <th width="8%">선택</th>
            <th width="10%">배팅 포인트</th>
            <th width="10%">결과</th>
            <th width="10%">획득 포인트</th>
          </tr>
        </thead>
        <tbody v-if="filterBettingJoinList.length != 0">
          <tr v-for="(history, idx) in filterBettingJoinList" :key="history.id">
            <td>{{ history.betting.regDate }}</td>
            <td style="text-align: left">{{ history.betting.mission.content }}</td>
            <td>{{ history.choice == 1 ? "가능" : "불가능" }}</td>
            <td>{{ history.point }} Point</td>
            <td>
              {{
                history.betting.result == 0
                  ? "진행중"
                  : history.betting.result == 2
                  ? "결과입력중"
                  : history.betting.result == history.choice
                  ? "승"
                  : "패"
              }}
            </td>
            <td>
              {{ history.betting.result == history.choice ? history.prize + " Point" : "-" }}
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="no-data">
            <td colspan="6">데이터가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useBettingStore } from "@/stores/betting";
import { useUserStore } from "@/stores/user";
import { onMounted, ref, watch } from "vue";

const selected = ref("total");
const store = useBettingStore();
const userStore = useUserStore();
const filterBettingJoinList = ref([]);

onMounted(() => {
  store.getJoinList(userStore.loginUser.id); // 로그인 후 데이터 가져오기
  select("total");
});
const select = (id) => {
  if (selected.value === id) {
    // 이미 선택된 체크박스를 클릭하면 상태를 강제로 유지
    setTimeout(() => {
      const checkbox = document.getElementById(id);
      if (checkbox) checkbox.checked = true;
    }, 0);
  }
  selected.value = id;
  if (id === "total") {
    filterBettingJoinList.value = [...store.bettingJoinList]; // 전체 보기
  } else if (id === "success") {
    filterBettingJoinList.value = store.bettingJoinList.filter((item) => item.betting.result == item.choice); // 성공배팅
  } else if (id === "fail") {
    filterBettingJoinList.value = store.bettingJoinList.filter(
      (item) => item.betting.result != item.choice && (item.betting.result == 1 || item.betting.result == -1)
    ); // 실패배팅
  }
};

watch(() => select.value);
watch(
  () => userStore.loginUser,
  (newUser) => store.getJoinList(newUser.id)
);

watch(
  () => store.bettingJoinList, // 원본 데이터 감시
  (newList) => {
    select(selected.value); // 필터 갱신
  },
  { immediate: true } // 초기 실행
);
</script>

<style scoped>
.containerBox {
  background-color: white;
  border: 2px solid #82d4d9;
  height: calc(100vh - 130px - 2rem);
  margin: 1rem;
  border-radius: 10px;
  padding: 2rem;
}

h3 {
  font-size: 24px;
}
header {
  margin: 0.5rem 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.headerR {
  display: flex;
  flex-direction: row;
  font-size: 14px;
}
.headerR input {
  margin: 0 3px 0 20px;
  cursor: pointer;
}
.headerR label {
  cursor: pointer;
}
.table-container {
  overflow-y: auto;
  max-height: calc(100vh - 130px - 9rem);
}
th {
  position: sticky;
  top: 0;
  background-color: white;
}
table {
  border-collapse: collapse;
  text-align: center;
}
tr,
td,
th {
  border-bottom: 1.5px solid #7b7a7a;
  padding: 0.5rem 0;
}

td {
  padding: 1rem 0;
}
.no-data {
  text-align: center;
}
</style>
