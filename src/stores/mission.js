import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";


const REST_API_URL = `http://localhost:1219/mission`;
export const useMissionStore = defineStore("mission", () => {

  const missionList = ref([]);

  const getMissionList = function(){
    axios.get(REST_API_URL)
    .then((response) => {
      console.log(response.data);
      missionList.value = response.data;
    })
  }

  const newMission = ref({});

  return {missionList , getMissionList};
});
