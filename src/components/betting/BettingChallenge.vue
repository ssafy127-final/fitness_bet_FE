<template>
  <div class="containerBox">
    <header>
      <h3>미션 수행 기록</h3>

      <div class="headerR">
        <input type="checkbox" id="total" :checked="selected === 'total'" @change="select('total')" />
        <label for="total">전체보기</label>
        <input type="checkbox" id="success" :checked="selected === 'success'" @change="select('success')" />
        <label for="success">성공 기록 보기</label>
        <input type="checkbox" id="fail" :checked="selected === 'fail'" @change="select('fail')" />
        <label for="fail">실패 기록 보기</label>
      </div>
    </header>
    <table width="100%">
      <thead>
        <tr>
          <th width="8%">번호</th>
          <th width="50%">항목</th>
          <th width="30%">배팅비율</th>
          <th width="12%">결과</th>
        </tr>
      </thead>
      <tbody v-if="filterBettingChallengeList.length != 0">
        <tr v-for="(betting, idx) in filterBettingChallengeList" :key="betting.id">
          <td>{{ idx }}</td>
          <td>
            {{ betting.challengeUser.name }}님이 {{ betting.mission.content }}을(를) {{ betting.mission_cnt }}회(초
            안에) 도전
          </td>
          <td>가능 vs 불가능</td>
          <td>{{ betting.result == 1 ? "성공" : "실패" }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr class="no-data">
          <td colspan="4">데이터가 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useBettingStore } from "@/stores/betting";
import { onMounted, ref } from "vue";

const selected = ref("total");
const store = useBettingStore();
const filterBettingChallengeList = ref([]);

onMounted(() => {
  store.getChallengeList();
  select("total");
});
const select = (id) => {
  selected.value = id;
  if (id === "total") {
    filterBettingChallengeList.value = [...store.bettingChallengeList]; // 전체 보기
  } else if (id === "success") {
    filterBettingChallengeList.value = store.bettingChallengeList.filter((item) => item.result == 1); // 성공배팅
  } else if (id === "fail") {
    filterBettingChallengeList.value = store.bettingChallengeList.filter((item) => item.result != -1); // 실패배팅
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
