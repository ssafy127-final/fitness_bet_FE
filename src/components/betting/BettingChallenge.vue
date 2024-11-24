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
    <div class="table-container">
      <table width="100%">
        <thead>
          <tr>
            <th width="15%">날짜</th>
            <th width="50%">항목</th>
            <th width="25%">배팅비율</th>
            <th width="10%">결과</th>
          </tr>
        </thead>
        <tbody v-if="filterBettingChallengeList.length != 0">
          <tr v-for="(betting, idx) in filterBettingChallengeList" :key="betting.id">
            <td>{{ betting.regDate }}</td>
            <td style="text-align: left">
              {{ betting.challengeUser.name }}님이 {{ betting.mission.content }}을(를) {{ betting.missionCnt }}회(초
              안에) 도전
            </td>
            <td class="per">
              <p>
                가능<br />{{
                  betting.successCnt + betting.failCnt == 0
                    ? 0
                    : ((betting.successCnt / (betting.successCnt + betting.failCnt)) * 100).toFixed(0)
                }}%
              </p>
              <p>vs</p>
              <p>
                불가능<br />{{
                  betting.successCnt + betting.failCnt == 0
                    ? 0
                    : ((betting.failCnt / (betting.successCnt + betting.failCnt)) * 100).toFixed(0)
                }}%
              </p>
            </td>
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
  </div>
</template>

<script setup>
import { useBettingStore } from "@/stores/betting";
import { useUserStore } from "@/stores/user";
import { onMounted, ref, watch } from "vue";

const selected = ref("total");
const store = useBettingStore();
const userStore = useUserStore();
const filterBettingChallengeList = ref([]);

onMounted(() => {
  store.getChallengeList(userStore.loginUser.id);
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
    filterBettingChallengeList.value = [...store.bettingChallengeList]; // 전체 보기
  } else if (id === "success") {
    filterBettingChallengeList.value = store.bettingChallengeList.filter((item) => item.result == 1); // 성공배팅
  } else if (id === "fail") {
    filterBettingChallengeList.value = store.bettingChallengeList.filter((item) => item.result != -1); // 실패배팅
  }
};

watch(
  () => userStore.loginUser,
  (newUser) => store.getChallengeList(newUser.id)
);

watch(
  () => store.bettingChallengeList, // 원본 데이터 감시
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
.table-container {
  overflow-y: auto;
  max-height: calc(100vh - 130px - 9rem);
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
table {
  border-collapse: collapse;
  text-align: center;
}
tr,
th {
  border-bottom: 1.5px solid #7b7a7a;
  padding: 0.5rem 0;
}
th {
  position: sticky;
  top: 0;
  background-color: white;
}
td {
  padding: 0.5rem 0;
}
.per {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.no-data {
  text-align: center;
}
</style>
