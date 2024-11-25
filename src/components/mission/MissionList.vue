<template>
  <div class="containerBox" @click.self = "closeCreateModal">
    <div class="modal" v-show="createModalOn">
      <MissionCreateModal @modal="createModalState" @reload="reloadData" />
    </div>
    <div class="modal" v-show="modifyModalOn" @click.self = "closeModifyModal">
      <MissionUpdateModal @modal="modifyModalState" />
    </div>
    <header :class="{ blur: modalOn }">
      <h3>미션 목록</h3>
      <div class="btns" v-if="loginUserAdmin == 1">
        <button class="createBtn btn" @click="createMission">미션 추가</button>
        <button class="modifyBtn btn" @click="modifyMission">미션 수정</button>
      </div>
    </header>
    <div class="table-container">
      <table width="100%" :class="{ blur: modalOn }">
        <thead>
          <!-- 첫 번째 헤더: "미션 내용", "남자", "여자" -->
          <tr>
            <th rowspan="2" width="25%">미션 내용</th>
            <th colspan="2" width="32%">남자</th>
            <th colspan="2" width="32%">여자</th>
            <th rowspan="2" width="16%" v-if="loginUserAdmin == 1">삭제</th>
          </tr>
          <!-- 두 번째 헤더: "최소 난이도", "최대 난이도" -->
          <tr>
            <th class="difficulty">최소 난이도</th>
            <th class="difficulty">최대 난이도</th>
            <th class="difficulty">최소 난이도</th>
            <th class="difficulty">최대 난이도</th>
          </tr>
        </thead>

        <tbody v-if="missionStore.missionList.length != 0">
          <tr v-for="mission in missionStore.missionList" :key="mission.id">
            <td>{{ mission.content }}</td>
            <td>{{ mission.maleMin }}</td>
            <td>{{ mission.maleMax }}</td>
            <td>{{ mission.femaleMin }}</td>
            <td>{{ mission.femaleMax }}</td>
            <td v-if="loginUserAdmin == 1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="30"
                height="30"
                viewBox="0,0,256,256"
                @click="remove(mission.id)"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="none"
                  stroke-linecap="none"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <g transform="scale(2,2)">
                    <path
                      d="M64,16c-26.50967,0 -48,21.49033 -48,48c0,26.50967 21.49033,48 48,48c26.50967,0 48,-21.49033 48,-48c0,-26.50967 -21.49033,-48 -48,-48z"
                      fill="#ffffff"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                    ></path>
                    <path
                      d="M64,25c-21.53911,0 -39,17.46089 -39,39c0,21.53911 17.46089,39 39,39c21.53911,0 39,-17.46089 39,-39c0,-21.53911 -17.46089,-39 -39,-39z"
                      fill="#f48884"
                      stroke="none"
                      stroke-width="1"
                      stroke-linecap="butt"
                    ></path>
                    <path
                      d="M44,84l40,-40M44,44l40,40"
                      fill="none"
                      stroke="#ffffff"
                      stroke-width="6"
                      stroke-linecap="round"
                    ></path>
                    <path
                      d="M64,16c-26.50967,0 -48,21.49033 -48,48c0,26.50967 21.49033,48 48,48c26.50967,0 48,-21.49033 48,-48c0,-26.50967 -21.49033,-48 -48,-48z"
                      fill="none"
                      stroke="#f48884"
                      stroke-width="6"
                      stroke-linecap="butt"
                    ></path>
                  </g>
                </g>
              </svg>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr class="no-data">
            <td colspan="5">미션 목록이 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useMissionStore } from "@/stores/mission";
import { ref } from "vue";
import { onMounted } from "vue";
import MissionCreateModal from "./modal/MissionCreateModal.vue";
import MissionUpdateModal from "./MissionUpdateModal.vue";
import axios from "axios";

const REST_API_URL = `http://localhost:1219/mission`;

const loginUserAdmin = sessionStorage.getItem("isAdmin");
const missionStore = useMissionStore();
onMounted(() => {
  reloadData();
});

const reloadData = function () {
  missionStore.getMissionList();
};

const modalOn = ref(false);
const createModalOn = ref(false);
const modifyModalOn = ref(false);

const createMission = () => {
  createModalOn.value = true;
  modalOn.value = true;
};

const modifyMission = () => {
  modifyModalOn.value = true;
  modalOn.value = true;
};

const createModalState = () => {
  modalOn.value = false;
  createModalOn.value = false;
};
const modifyModalState = () => {
  modalOn.value = false;
  modifyModalOn.value = false;
};

const closeCreateModal = () =>{
  createModalOn.value = false;
  modalOn.value = false;
}

const remove = (missionId) => {
  axios
    .delete(`${REST_API_URL}/${missionId}`)
    .then((response) => {
      console.log(response.data);
      reloadData();
    })
    .catch((error) => {
      console.error("미션 삭제 실패 : ", error);
    });
};
</script>

<style scoped>
.containerBox {
  background-color: white;
  border: 2px solid #82d4d9;
  height: calc(100vh - 130px - 2rem);
  margin: 1rem 0;
  border-radius: 10px;
  padding: 2rem;
}
.content::after {
  content: "";
}
.modal {
  position: fixed;
  z-index: 999;
  width: 35%;
  left: 50%;
  transform: translate(-50%, 0);
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

.blur {
  opacity: 0.5;
}

.btn {
  margin-right: 1rem;
  padding: 7px 10px;
}
.btns button:last-child {
  margin-right: 0;
}
.table-container {
  overflow-y: auto;
  max-height: calc(100vh - 130px - 9rem);
}
.gender-parent div {
  /* position: absolute; */
  position: sticky;
  top: 0;
  /* bottom: 2rem; */
  width: 100%;
  transform: translateX(50%);
}

thead {
  text-align: center;
  vertical-align: middle;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 8px;
  border-bottom: 1.5px solid #7b7a7a;
}
table {
  /* margin-top: 2rem; */
  border-collapse: collapse;
  text-align: center;
}

tr,
td,
th {
  border-bottom: 1.5px solid #7b7a7a;
  padding: 0.5rem 0;
}
thead tr,
th {
  font-size: 14px;
  font-weight: bold;
  border-bottom: none;
}

thead tr:nth-child(2) th.difficulty {
  font-size: 14px;
  font-weight: normal;
}
.no-data {
  text-align: center;
}

svg {
  cursor: pointer;
}
</style>
