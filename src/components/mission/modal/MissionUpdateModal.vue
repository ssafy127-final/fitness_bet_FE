<template>
  <div class="modal-container">
    <header>미션 수정</header>
    <div class="content">
      <div class="misson">
        <input type="text" v-model="missionContent" required />
      </div>
      <div class="second">
        <div class="male">
          <p>남성</p>
          <input type="number" placeholder="최소값을 입력하세요." v-model="maleMin" required />
          <input type="number" placeholder="최대값을 입력하세요." v-model="maleMax" required />
        </div>
        <div class="female">
          <p>여성</p>
          <input type="number" placeholder="최소값을 입력하세요." v-model="femaleMin" required />
          <input type="number" placeholder="최대값을 입력하세요." v-model="femaleMax" required />
        </div>
      </div>
    </div>

    <div class="btn-group">
      <button class="modifyBtn" @click="modify(props.mission.id)">수정</button>
      <button class="cancelBtn" @click="cancel">취소</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, watch } from "vue";
axios.defaults.withCredentials = true;

const props = defineProps({
  mission: Object,
});
const REST_API_URL = `https://port-0-fitness-bet-m3wwfrufa46b114f.sel4.cloudtype.app/mission`;

const missionContent = ref(props.mission.content);
const maleMin = ref(props.mission.maleMin);
const maleMax = ref(props.mission.maleMax);
const femaleMin = ref(props.mission.femaleMin);
const femaleMax = ref(props.mission.femaleMax);

const isValidRange = ref(false);

const checkRange = function () {
  if (
    maleMin.value > 0 &&
    femaleMin.value > 0 &&
    maleMax.value >= maleMin.value &&
    femaleMax.value >= femaleMin.value
  ) {
    isValidRange.value = true;
    return;
  }
  alert("난이도 입력값을 확인하세요.");
  isValidRange.value = false;
  return;
};

const emit = defineEmits(["modal", "reload"]);

const modify = function (missionId) {
  checkRange();
  if (isValidRange) {
    axios
      .put(`${REST_API_URL}/${missionId}`, {
        content: missionContent.value,
        maleMin: maleMin.value,
        maleMax: maleMax.value,
        femaleMin: femaleMin.value,
        femaleMax: femaleMax.value,
      })
      .then((response) => {
        console.log(response.data);
        alert("수정되었습니다.");
        emit("modal");
        emit("reload");
      })
      .catch((error) => {
        console.error("미션 수정 에러 :", error);
      });
  }
};

const cancel = () => {
  emit("modal");
  missionContent.value = props.mission.content;
  maleMin.value = props.mission.maleMin;
  maleMax.value = props.mission.maleMax;
  femaleMin.value = props.mission.femaleMin;
  femaleMax.value = props.mission.femaleMax;
};

watch(
  () => props.mission,
  (newMission) => {
    if (newMission) {
      missionContent.value = newMission.content;
      maleMin.value = newMission.maleMin;
      maleMax.value = newMission.maleMax;
      femaleMin.value = newMission.femaleMin;
      femaleMax.value = newMission.femaleMax;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #82d4d9;
  background-color: white;
  width: 100%;
  padding-bottom: 6rem;
  border-radius: 6%;
}

header {
  font-size: 2rem;
  font-weight: bolder;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.btn-group {
  position: absolute;
  bottom: 10px;
  right: 10px;
  margin: 10px;
}
.btn-group button {
  padding: 8px 10px;
  margin: 5px;
}
.btn-group button:hover {
  background-color: #487679;
}
.misson {
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: center; /* 가로축 중앙 정렬 */
  width: 100%; /* 입력란을 상자 너비에 맞춤 */
  box-sizing: border-box; /* 테두리를 포함한 너비로 설정 */
  font-size: 1.2rem; /* 글자 크기 설정 */
  color: #333; /* 글자색 설정 */
}

.misson input {
  width: 94.5%; /* 입력란을 상자 너비에 맞춤 */
  padding: 0.8rem 1.2rem; /* 내부 여백 설정 */
  margin: 1rem 0; /* 외부 여백 설정 */
  border: 1px solid #ccc; /* 테두리 스타일 설정 */
  border-radius: 8px; /* 테두리 둥글게 처리 */
  background-color: #f9f9f9; /* 배경색 설정 */
  font-size: 0.85rem; /* 글자 크기 설정 */
  color: #333; /* 글자색 설정 */
}

.second {
  display: flex;
  justify-content: center; /* 가로축 중앙 정렬 */
  text-align: center;
  margin-top: 2rem;
}

.male,
.female {
  display: flex;
  flex-direction: column;
  align-items: center; /* 세로축 기준 중앙 정렬 */
  margin: 0 10px; /* 좌우 마진 추가 */
}

.male input,
.female input {
  width: 100%; /* 입력란을 부모 컨테이너 너비에 맞춤 */
  padding: 0.8rem 1.2rem;
  margin: 1rem 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 0.7rem;
  color: #333;
}
.male input:focus {
  border-color: #82d4d9; /* 포커스 됐을 때 테두리 색 변경 */
  outline: none; /* 기본 윤곽선 제거 */
}

.male input:focus,
.female input:focus {
  border-color: #82d4d9;
  outline: none;
}

.second .male p,
.second .female p {
  font-weight: 600;
}

.modifyBtn,
.cancelBtn {
  font-size: 1.5rem;
  border-radius: 15px;
}
</style>
