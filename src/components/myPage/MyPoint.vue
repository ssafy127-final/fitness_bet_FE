<template>
  <div class="containerBox">
    <header>
      <h3>포인트 내역 기록</h3>

      <div class="headerR">
        <input type="checkbox" id="total" :checked="selected === 'total'" @click="() => select('total')" />
        <label for="total">전체보기</label>
        <input type="checkbox" id="add" :checked="selected === 'add'" @click="() => select('add')" />
        <label for="add">적립 내역 보기</label>
        <input type="checkbox" id="minus" :checked="selected === 'minus'" @click="() => select('minus')" />
        <label for="minus">사용 내역 보기</label>
      </div>
    </header>
    <div class="table-container">
      <table width="100%">
        <thead>
          <tr>
            <th width="10%">구분</th>
            <th width="45%">내용</th>
            <th width="15%">적립</th>
            <th width="15%">사용</th>
            <th width="15%">날짜</th>
          </tr>
        </thead>
        <tbody v-if="filterList.length != 0">
          <tr v-for="(history, idx) in filterList" :key="history.id">
            <td v-if="history.category == 0"><span class="label daily">출석</span></td>
            <td v-if="history.category == 0" class="desc">출석 체크 포인트 획득</td>
            <td v-if="history.category == 3"><span class="label product">상품</span></td>
            <td v-if="history.category == 3" class="desc">상품 교환으로 인한 포인트 사용</td>
            <td v-if="history.category == 1"><span class="label betting">배팅</span></td>
            <td v-if="history.category == 1" class="desc">배팅 성공으로 인한 포인트 획득</td>
            <td v-if="history.category == 2"><span class="label betting">배팅</span></td>
            <td v-if="history.category == 2" class="desc">배팅 참여 포인트 사용</td>
            <td>{{ history.point > 0 ? history.point + " Point" : "-" }}</td>
            <td>{{ history.point < 0 ? history.point + " Point" : "-" }}</td>
            <td>{{ history.recordDate }}</td>
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
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { onBeforeMount, onMounted, ref, watch } from "vue";
const userStore = useUserStore();
const selected = ref("");
const filterList = ref([]);
const allList = ref([]);
const getPointList = (id) => {
  axios
    .get(`${userStore.REST_API_URL}/point/history`, {
      params: { userId: id },
    })
    .then((res) => {
      allList.value = res.data;
      select("total"); // 데이터를 가져온 후 즉시 필터링
    });
};

onMounted(() => {
  if (userStore.loginUser?.id) {
    getPointList(userStore.loginUser.id);
    select("total");
  } else {
    console.warn("loginUser가 로드되지 않았습니다.");
  }
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
    filterList.value = [...allList.value]; // 전체 보기
  } else if (id === "add") {
    filterList.value = allList.value.filter((item) => item.point > 0);
  } else if (id === "minus") {
    filterList.value = allList.value.filter((item) => item.point < 0);
  }
};

watch(() => allList.value);
watch(() => filterList.value);
watch(
  () => userStore.loginUser?.id, // 안전하게 참조
  (newId) => {
    if (newId) {
      getPointList(newId);
    } else {
      console.warn("유효하지 않은 loginUser.id");
    }
  }
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
td,
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
  padding: 1rem 0;
}
.no-data {
  text-align: center;
}
.label {
  border: #7b7a7a;
  padding: 5px 8px;
  border-radius: 20px;
  font-size: 0.8rem;
}
.daily {
  background-color: #c7ed98;
}
.betting {
  background-color: #ed98e6;
}
.product {
  background-color: #98d2ed;
}
.desc {
  text-align: left;
  padding-left: 10px;
}
</style>
