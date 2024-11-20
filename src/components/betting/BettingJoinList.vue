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
    <table width="100%">
      <thead>
        <tr>
          <th width="8%">번호</th>
          <th width="40%">항목</th>
          <th width="10%">선택</th>
          <th width="12%">배팅 포인트</th>
          <th width="8%">결과</th>
          <th width="12%">획득 포인트</th>
        </tr>
      </thead>
      <tbody v-if="filterBettingJoinList.length != 0">
        <tr v-for="(history, idx) in filterBettingJoinList" :key="history.id">
          <td>{{ idx }}</td>
          <td>{{ history.betting.mission.content }}</td>
          <td>{{ history.choice == 1 ? "가능" : "불가능" }}</td>
          <td>{{ history.point }} Point</td>
          <td>{{ history.betting.result == history.choice ? "승" : "패" }}</td>
          <td>
            {{
              history.betting.result == history.choice
                ? (history.betting.success_point + history.betting.fail_point) /
                    (history.choice == 1 ? history.betting.success_point : history.betting.fail_point / history.point) +
                  " Point"
                : "-"
            }}
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
</template>

<script setup>
import { useBettingStore } from "@/stores/betting";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";

const selected = ref("total");
const store = useBettingStore();
const userStore = useUserStore();
const filterBettingJoinList = ref([]);

onMounted(async () => {
  await userStore.restoreLogin();
  await store.getJoinList(userStore.loginUser.id);
  select("total");
});
const select = (id) => {
  selected.value = id;
  if (id === "total") {
    filterBettingJoinList.value = [...store.bettingJoinList]; // 전체 보기
  } else if (id === "success") {
    filterBettingJoinList.value = store.bettingJoinList.filter((item) => item.betting.result == choice); // 성공배팅
  } else if (id === "fail") {
    filterBettingJoinList.value = store.bettingJoinList.filter((item) => item.betting.result != choice); // 실패배팅
  }
};
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
}
table {
  border-collapse: collapse;
}
tr,
td,
th {
  border-bottom: 1.5px solid #7b7a7a;
  padding: 0.5rem 0;
}
.no-data {
  text-align: center;
}
</style>
